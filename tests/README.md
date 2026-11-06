# Automated Test Suite

## Overview

This directory contains Playwright end-to-end tests for the ReferAll mobile-responsive enhancement.

## Test Files

### `mobile-responsive.spec.js`
Comprehensive test suite covering:
- Mobile navigation functionality
- Modal behavior at different breakpoints
- Coordination plan persistence
- Referral filtering
- Responsive grid layouts
- Horizontal overflow detection
- Desktop regression testing

## Running Tests

### All Tests
```bash
npm test
```

### Specific Breakpoint
```bash
npm run test:mobile   # 375px
npm run test:tablet   # 768px
npm run test:desktop  # 1440px
```

### With UI
```bash
npm run test:ui
```

### Debug Mode
```bash
npm run test:debug
```

## Test Structure

Each test suite follows this pattern:
1. **Setup** (`beforeEach`) - Navigate to page, set viewport
2. **Action** - Interact with elements
3. **Assertion** - Verify expected behavior

## Writing New Tests

```javascript
test.describe('Feature Name', () => {
    test('should do something @breakpoint', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, width, height);
        
        // Your test logic
        const element = page.locator('#myElement');
        await expect(element).toBeVisible();
    });
});
```

## Best Practices

1. ✅ Use descriptive test names
2. ✅ Include breakpoint in test name (e.g., `@375px`)
3. ✅ Set viewport explicitly
4. ✅ Wait for network idle when needed
5. ✅ Use `data-testid` for stable selectors
6. ❌ Avoid hardcoded wait times

## Viewing Results

After running tests:
```bash
npm run test:report
```

Opens interactive HTML report in browser.

## CI/CD

Tests run automatically on GitHub Actions:
- On push to `main` or `mobile-responsive-enhancement`
- On pull requests to `main`

View results in GitHub Actions tab.

## Debugging

### Failed Test
```bash
npx playwright test --debug -g "test name"
```

### Screenshots
Check `test-results/` directory for failure screenshots.

### Traces
Check `playwright-report/` for execution traces.

## Support

- Full documentation: `/TESTING.md`
- Playwright docs: https://playwright.dev
- Report issues: GitHub Issues
