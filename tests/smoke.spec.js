/**
 * Smoke Test - Verify basic application functionality
 * Run this first to ensure the application loads correctly
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:9000';

test.describe('Smoke Test - Basic Application Load', () => {
    test('application loads and shows ReferAll header', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Check page title contains "ReferAll"
        await expect(page.locator('h1')).toContainText('ReferAll');
    });
    
    test('referral list renders with sample data @mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        // Wait for referral list to be present
        const referralList = page.locator('#referralList');
        await expect(referralList).toBeVisible();
        
        // Should have at least one referral card (sample data)
        const referralCards = page.locator('.referral-card');
        await expect(referralCards.first()).toBeVisible({ timeout: 10000 });
    });
    
    test('mobile navigation is visible at 375px', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        
        await page.goto(`${BASE_URL}/index.html`);
        await page.waitForLoadState('networkidle');
        
        // Mobile nav should be visible
        const mobileNav = page.locator('.mobile-nav');
        await expect(mobileNav).toBeVisible();
        
        // Should have 4 buttons
        const navButtons = mobileNav.locator('button');
        await expect(navButtons).toHaveCount(4);
    });
});
