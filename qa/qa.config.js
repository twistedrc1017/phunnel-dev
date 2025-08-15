export const QA_CONFIG = {
  baseURL: process.env.QA_BASE_URL || "http://localhost:3000",
  entryPaths: ["/", "/dashboard", "/industries", "/dashboard/templates"],
  sameOriginOnly: true,
  maxPages: 300,
  maxDepth: 4,
  excludePatterns: [/^\/api\//, /^\/auth\//, /^\/_next\//, /^\/static\//, /^\/node_modules\//],
  placeholderSignals: [
    "industry not found",
    "coming soon",
    "placeholder",
    "lorem ipsum",
    "under construction",
    "todo:",
    "template not found",
    "page not found",
    "404"
  ],
  minContentWords: 60,
  ctaSelectors: [
    'a:has-text("See how it works")',
    'button:has-text("See how it works")',
    'a:has-text("Get started")',
    'button:has-text("Get started")',
    'a:has-text("Learn more")',
    'button:has-text("Learn more")',
    'a:has-text("Templates")',
    'button:has-text("Templates")',
    'a:has-text("View Details")',
    'button:has-text("View Details")',
    'a:has-text("Activate Template")',
    'button:has-text("Activate Template")',
    'a:has-text("Start Your Project")',
    'button:has-text("Start Your Project")',
    'a:has-text("Free Consultation")',
    'button:has-text("Free Consultation")'
  ],
  reportDir: "qa-reports"
};