import { test, expect } from "@playwright/test";
import { QA_CONFIG } from "./qa.config.js";

const { baseURL, placeholderSignals } = QA_CONFIG;

test.use({ baseURL });

test.describe("Navigation & Template System", () => {
  test("Navbar shows Templates & Industries, links are reachable", async ({ page }) => {
    await page.goto("/");
    
    // Check navbar elements exist
    await expect(page.locator('text=Templates')).toBeVisible();
    await expect(page.locator('text=Industries')).toBeVisible();
    
    // Navigate to templates and verify
    await page.click('text=Templates');
    await expect(page).toHaveURL(/\/dashboard\/templates/);
    
    // Check for template cards or content
    await expect(page.locator('h1, h2')).toBeVisible();
    
    // Verify not empty/placeholder page
    const bodyText = await page.textContent("body");
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    expect(wordCount).toBeGreaterThan(50);
  });

  test("Templates gallery loads with actual template data", async ({ page }) => {
    await page.goto("/dashboard/templates");
    
    // Wait for content to load
    await page.waitForLoadState("networkidle");
    
    // Should have template cards or list
    const hasCards = await page.locator('[class*="card"], [data-testid*="template"]').count();
    const hasContent = await page.locator('h1, h2, h3').count();
    
    expect(hasCards + hasContent).toBeGreaterThan(0);
    
    // Verify no placeholder content
    const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
    for (const signal of placeholderSignals) {
      expect(bodyText.includes(signal)).toBeFalsy();
    }
  });

  test("Template detail pages are populated and functional", async ({ page }) => {
    await page.goto("/dashboard/templates");
    await page.waitForLoadState("networkidle");
    
    // Find first template link
    const templateLink = page.locator('a[href*="/dashboard/templates/"]:not([href="/dashboard/templates"])').first();
    
    if (await templateLink.count() > 0) {
      await templateLink.click();
      await expect(page).toHaveURL(/\/dashboard\/templates\/.+/);
      
      // Verify populated content
      const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
      const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBeGreaterThanOrEqual(60);
      
      // Check for no placeholder signals
      for (const signal of placeholderSignals) {
        expect(bodyText.includes(signal)).toBeFalsy();
      }
      
      // Should have template-specific content
      await expect(page.locator('h1, h2')).toBeVisible();
    }
  });
});

test.describe("Landing Page CTAs", () => {
  test("Main CTAs lead to populated content", async ({ page, context }) => {
    await page.goto("/");
    
    const ctaSelectors = [
      'a:has-text("See how it works")',
      'button:has-text("See how it works")',
      'a:has-text("Get started")',
      'button:has-text("Get started")',
      'a:has-text("Learn more")',
      'button:has-text("Learn more")'
    ];
    
    for (const selector of ctaSelectors) {
      const cta = page.locator(selector).first();
      
      if (await cta.count() > 0) {
        console.log(`Testing CTA: ${selector}`);
        
        const tagName = await cta.evaluate(el => el.tagName.toLowerCase());
        
        if (tagName === "a") {
          // Link CTA
          const href = await cta.getAttribute("href");
          if (href && !href.startsWith("http")) {
            await page.goto(href);
            const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
            const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
            expect(wordCount).toBeGreaterThanOrEqual(30);
          }
        } else {
          // Button CTA - might open modal or navigate
          const [newPage] = await Promise.all([
            context.waitForEvent("page", { timeout: 3000 }).catch(() => null),
            cta.click().catch(() => null),
          ]);
          
          if (newPage) {
            await newPage.waitForLoadState("domcontentloaded");
            const bodyText = (await newPage.textContent("body"))?.toLowerCase() ?? "";
            const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
            expect(wordCount).toBeGreaterThanOrEqual(30);
            await newPage.close();
          } else {
            // Check if modal or content appeared on same page
            await page.waitForTimeout(1000);
            // Modal might be present
            const modal = page.locator('[role="dialog"], .modal, [data-modal]');
            if (await modal.count() > 0) {
              const modalText = await modal.textContent();
              expect(modalText.length).toBeGreaterThan(20);
            }
          }
        }
        
        // Reset to home page for next test
        await page.goto("/");
      }
    }
  });
});

test.describe("Industry Pages", () => {
  test("Industries page renders without placeholder content", async ({ page }) => {
    await page.goto("/industries");
    
    // Should have navigation
    await expect(page.locator('nav, header')).toBeVisible();
    
    // Check content quality
    const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    expect(wordCount).toBeGreaterThan(100);
    
    // No placeholder signals
    for (const signal of placeholderSignals) {
      expect(bodyText.includes(signal)).toBeFalsy();
    }
  });

  test("Industry detail pages handle unknown industries gracefully", async ({ page }) => {
    // Test unknown industry
    const response = await page.goto("/industry/nonexistent-industry");
    
    // Should either redirect or show friendly error
    if (response.status() === 404) {
      // Check for friendly 404 page
      const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
      expect(bodyText.includes("not found") || bodyText.includes("404")).toBeTruthy();
    } else {
      // Should redirect or show fallback content
      const bodyText = (await page.textContent("body"))?.toLowerCase() ?? "";
      const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBeGreaterThan(50);
    }
  });
});

test.describe("Dashboard Access", () => {
  test("Dashboard routes require authentication", async ({ page }) => {
    // Try accessing dashboard without auth
    await page.goto("/dashboard");
    
    // Should redirect to auth or show login form
    await page.waitForLoadState("networkidle");
    const currentUrl = page.url();
    
    // Either redirected to auth or showing auth form
    const hasAuthForm = await page.locator('form, [data-testid="auth-form"], input[type="email"], input[type="password"]').count();
    const isAuthPage = currentUrl.includes("/auth") || currentUrl.includes("/login");
    
    expect(hasAuthForm > 0 || isAuthPage).toBeTruthy();
  });
});

test.describe("Error Handling", () => {
  test("404 pages have navigation and helpful content", async ({ page }) => {
    const response = await page.goto("/nonexistent-page-12345");
    
    // Should be 404 or redirect
    if (response.status() === 404 || page.url().includes("404")) {
      // Should still have navigation
      const hasNav = await page.locator('nav, header, a[href="/"]').count();
      expect(hasNav).toBeGreaterThan(0);
      
      // Should have some helpful content
      const bodyText = await page.textContent("body");
      const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
      expect(wordCount).toBeGreaterThan(20);
    }
  });
});