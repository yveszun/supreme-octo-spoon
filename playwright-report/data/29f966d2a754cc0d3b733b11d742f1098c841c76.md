# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mobile-responsive.spec.js >> Mobile Navigation - Target IDs >> should have all required navigation target IDs present
- Location: tests/mobile-responsive.spec.js:51:5

# Error details

```
Error: expect(locator).toBeAttached() failed

Locator: locator('#statsBar')
Expected: attached
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeAttached" locator('#statsBar') with timeout 5000ms
  - waiting for locator('#statsBar')

```

```yaml
- text: Not Found
```

# Test source

```ts
  1   | /**
  2   |  * Mobile-Responsive Enhancement Test Suite
  3   |  * 
  4   |  * Tests responsive behavior, mobile navigation, modal functionality,
  5   |  * data persistence, and referral filtering at multiple breakpoints.
  6   |  * 
  7   |  * Test Breakpoints:
  8   |  * - 375px (mobile - iPhone)
  9   |  * - 768px (tablet - iPad)
  10  |  * - 1440px (desktop)
  11  |  */
  12  | 
  13  | const { test, expect } = require('@playwright/test');
  14  | 
  15  | // Base URL for tests
  16  | const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
  17  | 
  18  | /**
  19  |  * Helper: Set viewport size and wait for page to stabilize
  20  |  */
  21  | async function setViewport(page, width, height = 800) {
  22  |     await page.setViewportSize({ width, height });
  23  |     // Wait for any responsive transitions to complete
  24  |     await page.waitForTimeout(300);
  25  | }
  26  | 
  27  | /**
  28  |  * Helper: Clear localStorage before test
  29  |  */
  30  | async function clearStorage(page) {
  31  |     await page.evaluate(() => {
  32  |         localStorage.clear();
  33  |     });
  34  | }
  35  | 
  36  | /**
  37  |  * Helper: Load sample referral data (app already has sample data by default)
  38  |  */
  39  | async function loadSampleData(page) {
  40  |     // The application initializes sample data automatically on load
  41  |     // Just wait for it to be ready
  42  |     await page.waitForLoadState('networkidle');
  43  |     await page.waitForTimeout(500); // Give time for JS to initialize
  44  | }
  45  | 
  46  | // ============================================================================
  47  | // TEST SUITE 1: Mobile Navigation Target IDs
  48  | // ============================================================================
  49  | 
  50  | test.describe('Mobile Navigation - Target IDs', () => {
  51  |     test('should have all required navigation target IDs present', async ({ page }) => {
  52  |         await page.goto(`${BASE_URL}/index.html`);
  53  |         
  54  |         // Check that all navigation target IDs exist
  55  |         const statsBar = await page.locator('#statsBar');
  56  |         const referralList = await page.locator('#referralList');
  57  |         const barrierPanel = await page.locator('#barrierPanel');
  58  |         const bottleneckPanel = await page.locator('#bottleneckPanel');
  59  |         
> 60  |         await expect(statsBar).toBeAttached();
      |                                ^ Error: expect(locator).toBeAttached() failed
  61  |         await expect(referralList).toBeAttached();
  62  |         await expect(barrierPanel).toBeAttached();
  63  |         await expect(bottleneckPanel).toBeAttached();
  64  |     });
  65  | });
  66  | 
  67  | // ============================================================================
  68  | // TEST SUITE 2: Mobile Navigation Functionality
  69  | // ============================================================================
  70  | 
  71  | test.describe('Mobile Navigation - Functionality @375px', () => {
  72  |     test.beforeEach(async ({ page }) => {
  73  |         await page.goto(`${BASE_URL}/index.html`);
  74  |         await setViewport(page, 375, 667);
  75  |     });
  76  |     
  77  |     test('should show mobile navigation at 375px', async ({ page }) => {
  78  |         const mobileNav = page.locator('.mobile-nav');
  79  |         await expect(mobileNav).toBeVisible();
  80  |         
  81  |         // Should have 4 navigation buttons
  82  |         const buttons = mobileNav.locator('button');
  83  |         await expect(buttons).toHaveCount(4);
  84  |     });
  85  |     
  86  |     test('should scroll to Stats section when tapped', async ({ page }) => {
  87  |         const mobileNav = page.locator('.mobile-nav');
  88  |         const statsButton = mobileNav.locator('button').filter({ hasText: 'Stats' });
  89  |         
  90  |         // Click Stats button
  91  |         await statsButton.click();
  92  |         await page.waitForTimeout(500); // Wait for smooth scroll
  93  |         
  94  |         // Verify statsBar is in viewport
  95  |         const statsBar = page.locator('#statsBar');
  96  |         await expect(statsBar).toBeInViewport();
  97  |     });
  98  |     
  99  |     test('should scroll to Referrals section when tapped', async ({ page }) => {
  100 |         const mobileNav = page.locator('.mobile-nav');
  101 |         const referralsButton = mobileNav.locator('button').filter({ hasText: 'Referrals' });
  102 |         
  103 |         await referralsButton.click();
  104 |         await page.waitForTimeout(500);
  105 |         
  106 |         const referralList = page.locator('#referralList');
  107 |         await expect(referralList).toBeInViewport();
  108 |     });
  109 |     
  110 |     test('should scroll to Barriers section when tapped', async ({ page }) => {
  111 |         const mobileNav = page.locator('.mobile-nav');
  112 |         const barriersButton = mobileNav.locator('button').filter({ hasText: 'Barriers' });
  113 |         
  114 |         await barriersButton.click();
  115 |         await page.waitForTimeout(500);
  116 |         
  117 |         const barrierPanel = page.locator('#barrierPanel');
  118 |         await expect(barrierPanel).toBeInViewport();
  119 |     });
  120 |     
  121 |     test('should scroll to Insights section when tapped', async ({ page }) => {
  122 |         const mobileNav = page.locator('.mobile-nav');
  123 |         const insightsButton = mobileNav.locator('button').filter({ hasText: 'Insights' });
  124 |         
  125 |         await insightsButton.click();
  126 |         await page.waitForTimeout(500);
  127 |         
  128 |         const bottleneckPanel = page.locator('#bottleneckPanel');
  129 |         await expect(bottleneckPanel).toBeInViewport();
  130 |     });
  131 |     
  132 |     test('should not hide content behind mobile navigation', async ({ page }) => {
  133 |         // Check that body has bottom padding
  134 |         const body = page.locator('body');
  135 |         const paddingBottom = await body.evaluate((el) => {
  136 |             return window.getComputedStyle(el).paddingBottom;
  137 |         });
  138 |         
  139 |         // Should have padding (at least 40px / 2.5rem)
  140 |         expect(parseInt(paddingBottom)).toBeGreaterThanOrEqual(40);
  141 |     });
  142 | });
  143 | 
  144 | // ============================================================================
  145 | // TEST SUITE 3: Modal Opening and Closing
  146 | // ============================================================================
  147 | 
  148 | test.describe('Modal - Opening and Closing', () => {
  149 |     test.beforeEach(async ({ page }) => {
  150 |         await page.goto(`${BASE_URL}/index.html`);
  151 |         await loadSampleData(page);
  152 |     });
  153 |     
  154 |     test('should open modal when referral card is clicked @375px', async ({ page }) => {
  155 |         await setViewport(page, 375, 667);
  156 |         
  157 |         // Wait for referrals to render
  158 |         await page.waitForSelector('#referralList [data-referral-id]', { timeout: 5000 });
  159 |         
  160 |         // Click first referral card
```