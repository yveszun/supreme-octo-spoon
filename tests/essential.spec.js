/**
 * Essential Mobile-Responsive Tests
 * Core functionality verification only
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:9000';

test.describe('Essential Mobile Tests', () => {
    test('navigation IDs exist', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await expect(page.locator('#statsBar')).toBeAttached();
        await expect(page.locator('#referralList')).toBeAttached();
        await expect(page.locator('#barrierPanel')).toBeAttached();
        await expect(page.locator('#bottleneckPanel')).toBeAttached();
    });
    
    test('mobile nav visible at 375px', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`${BASE_URL}/index.html`);
        
        const mobileNav = page.locator('.mobile-nav');
        await expect(mobileNav).toBeVisible();
        await expect(mobileNav.locator('button')).toHaveCount(4);
    });
    
    test('referral list renders', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        const referralCards = page.locator('.referral-card');
        await expect(referralCards.first()).toBeVisible({ timeout: 10000 });
    });
    
    test('modal opens and closes', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        await page.locator('.referral-card').first().click();
        await expect(page.locator('#referralModal')).toBeVisible();
        
        // Click close button (has onclick="closeModal()")
        await page.locator('#referralModal button[onclick="closeModal()"]').click();
        await expect(page.locator('#referralModal')).toBeHidden();
    });
    
    test('stats grid responsive', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`${BASE_URL}/index.html`);
        
        const statsBar = page.locator('#statsBar');
        const gridCols = await statsBar.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(2); // 2 columns on mobile
    });
    
    test('no horizontal overflow', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > window.innerWidth;
        });
        
        expect(hasOverflow).toBe(false);
    });
});
