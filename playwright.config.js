// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for mobile-responsive testing
 * 
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: 0, // Disable retries while debugging
  
  /* Limit workers for stability */
  workers: 1,
  
  /* Set reasonable test timeout */
  timeout: 15 * 1000, // 15 seconds per test
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results.json' }],
    ['list']
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers at different viewports */
  projects: [
    {
      name: 'mobile-chrome-375',
      use: { 
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 },
        // Override to use Chromium only (CI has only Chromium installed)
        channel: undefined,
        browserName: 'chromium',
      },
    },
    {
      name: 'tablet-chrome-768',
      use: { 
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 },
        // Override to use Chromium only (CI has only Chromium installed)
        channel: undefined,
        browserName: 'chromium',
      },
    },
    {
      name: 'desktop-chrome-1440',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'python3 -m http.server 9000',
    url: 'http://localhost:9000/index.html',
    reuseExistingServer: false, // Always start fresh server in CI
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
