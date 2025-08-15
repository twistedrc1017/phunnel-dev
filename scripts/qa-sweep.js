import { chromium } from "playwright";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { QA_CONFIG } from "../qa/qa.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  baseURL, entryPaths, sameOriginOnly, maxPages, maxDepth,
  excludePatterns, placeholderSignals, minContentWords,
  ctaSelectors, reportDir,
} = QA_CONFIG;

const toAbs = (href) => {
  try { return new URL(href, baseURL).toString(); } catch { return null; }
};

const sameOrigin = (urlStr) => {
  try { 
    const u = new URL(urlStr), b = new URL(baseURL); 
    return u.origin === b.origin; 
  } catch { 
    return false; 
  }
};

const isExcluded = (pathname) => excludePatterns.some(rx => rx.test(pathname));

(async () => {
  console.log(`🔍 Starting QA audit for ${baseURL}`);
  console.log(`📋 Entry points: ${entryPaths.join(', ')}`);
  
  await fs.ensureDir(path.join(__dirname, "..", reportDir));
  const outDir = path.join(__dirname, "..", reportDir);
  
  // Clear previous reports
  const files = await fs.readdir(outDir);
  for (const file of files) {
    if (file.startsWith('fail-') || file.endsWith('.json') || file.endsWith('.md')) {
      await fs.remove(path.join(outDir, file));
    }
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ 
    baseURL,
    viewport: { width: 1280, height: 720 },
    userAgent: 'QA-Crawler/1.0'
  });
  const page = await context.newPage();

  const visited = new Set();
  const queue = entryPaths.map(p => ({ url: p, depth: 0 }));
  const results = [];

  let processed = 0;
  while (queue.length && results.length < maxPages) {
    const { url, depth } = queue.shift();
    if (visited.has(url) || depth > maxDepth) continue;
    visited.add(url);
    processed++;

    console.log(`📄 [${processed}/${Math.min(queue.length + processed, maxPages)}] Checking: ${url}`);

    let status = null, ok = true, wordCount = 0, hasH1orH2 = false;
    const placeholders = [], brokenLinks = [], ctaIssues = [], notes = [];
    let screenshotPath;

    try {
      const res = await page.goto(url, { 
        waitUntil: "domcontentloaded", 
        timeout: 30000 
      });
      status = res?.status() ?? null;
      
      if (!status || status >= 400) { 
        ok = false; 
        notes.push(`HTTP ${status ?? "null"}`); 
      }

      // Wait for potential dynamic content
      await page.waitForTimeout(1000);

      const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
      wordCount = bodyText.split(/\s+/).filter(Boolean).length;
      hasH1orH2 = !!(await page.$("h1, h2"));
      
      if (!hasH1orH2) { 
        ok = false; 
        notes.push("Missing H1/H2"); 
      }
      
      if (wordCount < minContentWords) { 
        ok = false; 
        notes.push(`Low content (${wordCount} words)`); 
      }
      
      for (const sig of placeholderSignals) {
        if (bodyText.includes(sig)) { 
          placeholders.push(sig); 
          ok = false; 
        }
      }

      // Check for error indicators
      if (bodyText.includes("error") && bodyText.includes("boundary")) {
        ok = false;
        notes.push("React error boundary detected");
      }

      // CTA checks
      for (const sel of ctaSelectors) {
        const locs = page.locator(sel);
        const count = await locs.count();
        
        for (let i = 0; i < count; i++) {
          const el = locs.nth(i);
          const tag = await el.evaluate(e => e.tagName.toLowerCase());
          
          if (tag === "a") {
            const href = await el.getAttribute("href");
            if (!href) { 
              ctaIssues.push(`CTA ${sel} missing href`); 
              ok = false; 
              continue; 
            }
            
            const abs = toAbs(href);
            if (!abs) { 
              ctaIssues.push(`CTA ${sel} invalid href: ${href}`); 
              ok = false; 
              continue; 
            }
            
            if (sameOriginOnly && !sameOrigin(abs)) continue;
            
            try {
              const r = await context.request.get(abs);
              const s = r.status();
              if (s >= 400) { 
                ctaIssues.push(`CTA ${sel} broken -> ${href} (${s})`); 
                ok = false; 
              }
            } catch (err) { 
              ctaIssues.push(`CTA ${sel} failed request -> ${href}: ${err.message}`); 
              ok = false; 
            }
          } else {
            // Button CTA - try clicking and check result
            try {
              const [newPage] = await Promise.all([
                context.waitForEvent("page", { timeout: 5000 }).catch(() => null),
                el.click({ timeout: 5000 }).catch(() => null),
              ]);
              
              const tgt = newPage || page;
              await tgt.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(()=>{});
              
              const t = (await tgt.textContent("body"))?.toLowerCase() ?? "";
              const wc = t.split(/\s+/).filter(Boolean).length;
              
              if (wc < minContentWords || placeholderSignals.some(sig => t.includes(sig))) {
                ctaIssues.push(`CTA ${sel} -> unpopulated content (${wc} words)`);
                ok = false;
              }
              
              if (newPage) await newPage.close();
            } catch (err) {
              ctaIssues.push(`CTA ${sel} click failed: ${err.message}`);
              ok = false;
            }
          }
        }
      }

      // Link integrity + crawl expansion
      const hrefs = await page.$$eval("a[href]", as => 
        as.map(a => a.getAttribute("href") || "").filter(Boolean)
      );
      
      for (const href of hrefs) {
        const abs = toAbs(href);
        if (!abs) continue;
        if (sameOriginOnly && !sameOrigin(abs)) continue;
        
        const p = new URL(abs);
        if (isExcluded(p.pathname)) continue;
        
        const queued = p.pathname + p.search + p.hash;
        if (!visited.has(queued) && depth < maxDepth) {
          queue.push({ url: queued, depth: depth + 1 });
        }

        // Check link integrity
        try {
          const r = await context.request.get(abs);
          const s = r.status();
          if (s >= 400) { 
            brokenLinks.push({ href, status: s }); 
            ok = false; 
          }
        } catch (err) { 
          brokenLinks.push({ href, status: null, error: err.message }); 
          ok = false; 
        }
      }

      // Take screenshot of failures
      if (!ok) {
        const fname = `fail-${Date.now()}-${Math.random().toString(36).slice(2)}.png`;
        screenshotPath = path.join(outDir, fname);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`❌ FAIL: ${url} (screenshot: ${fname})`);
      } else {
        console.log(`✅ PASS: ${url}`);
      }

    } catch (err) {
      ok = false; 
      notes.push(`Exception: ${err?.message || String(err)}`);
      console.log(`💥 ERROR: ${url} - ${err.message}`);
    }

    results.push({ 
      url, status, depth, wordCount, hasH1orH2, 
      placeholders, brokenLinks, ctaIssues, notes, ok, screenshotPath 
    });
  }

  // Generate summaries
  const summary = {
    baseURL,
    timestamp: new Date().toISOString(),
    totalScanned: results.length,
    totalFailures: results.filter(r => !r.ok).length,
    successRate: `${((results.filter(r => r.ok).length / results.length) * 100).toFixed(1)}%`,
    placeholdersFound: results.filter(r => r.placeholders.length).map(r => ({ 
      url: r.url, placeholders: r.placeholders 
    })),
    brokenLinks: results.flatMap(r => 
      r.brokenLinks.map(b => ({ from: r.url, ...b }))
    ),
    ctaIssues: results.flatMap(r => 
      r.ctaIssues.map(msg => ({ url: r.url, msg }))
    ),
    lowContentPages: results.filter(r => r.wordCount < minContentWords).map(r => ({
      url: r.url, wordCount: r.wordCount
    })),
  };

  // Write JSON report
  await fs.writeJSON(path.join(outDir, "link-audit.json"), { summary, results }, { spaces: 2 });

  // Write Markdown report
  const lines = [];
  lines.push(`# QA Link & Content Audit Report`);
  lines.push(`**Generated:** ${summary.timestamp}`);
  lines.push(`**Base URL:** ${baseURL}`);
  lines.push(`**Pages Scanned:** ${summary.totalScanned}`);
  lines.push(`**Failures:** ${summary.totalFailures}`);
  lines.push(`**Success Rate:** ${summary.successRate}\n`);

  if (summary.placeholdersFound.length) {
    lines.push(`## 🚨 Placeholder / Unpopulated Pages (${summary.placeholdersFound.length})`);
    for (const p of summary.placeholdersFound) {
      lines.push(`- **${p.url}** — signals: ${p.placeholders.join(", ")}`);
    }
    lines.push("");
  }

  if (summary.brokenLinks.length) {
    lines.push(`## 🔗 Broken Links (${summary.brokenLinks.length})`);
    for (const b of summary.brokenLinks) {
      lines.push(`- From **${b.from}** → \`${b.href}\` (status: ${b.status ?? "N/A"})`);
    }
    lines.push("");
  }

  if (summary.ctaIssues.length) {
    lines.push(`## 🎯 CTA Issues (${summary.ctaIssues.length})`);
    for (const c of summary.ctaIssues) {
      lines.push(`- **${c.url}:** ${c.msg}`);
    }
    lines.push("");
  }

  if (summary.lowContentPages.length) {
    lines.push(`## 📄 Low Content Pages (${summary.lowContentPages.length})`);
    for (const lc of summary.lowContentPages) {
      lines.push(`- **${lc.url}** — ${lc.wordCount} words`);
    }
    lines.push("");
  }

  lines.push(`## 🎯 Next-Step Recommendations`);
  if (summary.placeholdersFound.length > 0) {
    lines.push(`- **Fix placeholder content:** Ensure all pages have real content instead of placeholder text`);
  }
  if (summary.brokenLinks.length > 0) {
    lines.push(`- **Fix broken links:** Update or remove links that return 4xx/5xx status codes`);
  }
  if (summary.ctaIssues.length > 0) {
    lines.push(`- **Fix CTAs:** Ensure all call-to-action buttons/links lead to populated content`);
  }
  lines.push(`- **Industry fallback:** Add default industry template resolution to eliminate "industry not found"`);
  lines.push(`- **Friendly redirects:** Redirect unknown industry keys to /industries with suggested templates`);
  lines.push(`- **Template seeding:** Ensure templates are properly seeded in database on app startup`);
  lines.push(`- **404 pages:** Add branded 404/coming-soon pages with clear next steps\n`);

  await fs.writeFile(path.join(outDir, "link-audit.md"), lines.join("\n"), "utf8");

  console.log(`\n🎉 QA audit complete!`);
  console.log(`📊 Results: ${summary.successRate} success rate (${summary.totalFailures} failures)`);
  console.log(`📄 JSON: ${path.join(outDir, "link-audit.json")}`);
  console.log(`📝 Markdown: ${path.join(outDir, "link-audit.md")}`);
  if (summary.totalFailures > 0) {
    console.log(`📸 Screenshots: ${outDir}/fail-*.png`);
  }
  console.log("");

  await browser.close();
  process.exit(summary.totalFailures > 0 ? 1 : 0);
})();