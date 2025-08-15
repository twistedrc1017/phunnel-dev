# QA Crawler & Audit Suite

A comprehensive quality assurance system that automatically crawls your application to detect:

- 🚨 Placeholder/unpopulated pages
- 🔗 Broken links and navigation issues  
- 🎯 Non-functional CTAs
- 📄 Low-content pages
- 🔍 Template system integrity

## Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps

# Run full QA suite
npm run qa:all

# Run just the crawler
npm run qa:sweep

# Run just Playwright tests
npm run qa:test
```

## What Gets Tested

### 🔍 Site Crawler (`scripts/qa-sweep.js`)
- Crawls all reachable pages from entry points
- Detects placeholder content ("coming soon", "lorem ipsum", etc.)
- Validates CTA functionality and destinations
- Checks link integrity and response codes
- Takes screenshots of failing pages
- Generates comprehensive JSON + Markdown reports

### 🧪 Playwright Tests (`qa/link-audit.spec.js`)
- Navigation system verification
- Template gallery functionality
- Industry page content validation
- CTA destination testing
- Authentication flow checks
- Error page handling

## Configuration

Edit `qa/qa.config.js` to customize:

```js
export const QA_CONFIG = {
  baseURL: "http://localhost:3000",
  entryPaths: ["/", "/dashboard", "/industries", "/dashboard/templates"],
  maxPages: 300,
  maxDepth: 4,
  placeholderSignals: ["coming soon", "lorem ipsum", "todo:"],
  minContentWords: 60,
  ctaSelectors: ['a:has-text("Get started")', 'button:has-text("Learn more")']
};
```

## Reports

After running `npm run qa:all`, check:

- `qa-reports/link-audit.json` - Machine-readable results
- `qa-reports/link-audit.md` - Human-readable summary
- `qa-reports/fail-*.png` - Screenshots of failed pages
- `playwright-report/` - Detailed test results

## CI Integration

The included GitHub Actions workflow automatically runs QA audits on:
- Push to main/develop branches
- Pull requests
- Daily scheduled runs

Results are uploaded as artifacts and commented on PRs.

## Environment Variables

- `QA_BASE_URL` - Target URL for testing (default: localhost:3000)
- `CI` - Enables CI-specific behaviors

## Common Issues & Fixes

### Placeholder Content
- Add real content to pages showing "coming soon"
- Implement industry fallback templates
- Create friendly 404 pages

### Broken CTAs  
- Ensure buttons lead to populated content
- Convert decorative buttons to real actions
- Add proper navigation handlers

### Missing Templates
- Verify database seeding runs on startup
- Check template activation flow
- Ensure RLS policies allow template access

## Development

To add new test cases:

1. Update `qa/qa.config.js` with new selectors/patterns
2. Add tests to `qa/link-audit.spec.js`
3. Run locally: `npm run qa:all`

The system is designed to be zero-maintenance once configured - it will automatically discover and test new pages as your app grows.