/**
 * Mobile-Responsive Enhancement Test Suite
 * 
 * Tests responsive behavior, mobile navigation, modal functionality,
 * data persistence, and referral filtering at multiple breakpoints.
 * 
 * Test Breakpoints:
 * - 375px (mobile - iPhone)
 * - 768px (tablet - iPad)
 * - 1440px (desktop)
 */

const { test, expect } = require('@playwright/test');

// Base URL for tests
const BASE_URL = process.env.BASE_URL || 'http://localhost:9000';

/**
 * Helper: Set viewport size and wait for page to stabilize
 */
async function setViewport(page, width, height = 800) {
    await page.setViewportSize({ width, height });
    // Wait for any responsive transitions to complete
    await page.waitForTimeout(300);
}

/**
 * Helper: Clear localStorage before test
 */
async function clearStorage(page) {
    await page.evaluate(() => {
        localStorage.clear();
    });
}

/**
 * Helper: Load sample referral data (app already has sample data by default)
 */
async function loadSampleData(page) {
    // The application initializes sample data automatically on load
    // Just wait for it to be ready
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Give time for JS to initialize
}

// ============================================================================
// TEST SUITE 1: Mobile Navigation Target IDs
// ============================================================================

test.describe('Mobile Navigation - Target IDs', () => {
    test('should have all required navigation target IDs present', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        
        // Check that all navigation target IDs exist
        const statsBar = await page.locator('#statsBar');
        const referralList = await page.locator('#referralList');
        const barrierPanel = await page.locator('#barrierPanel');
        const bottleneckPanel = await page.locator('#bottleneckPanel');
        
        await expect(statsBar).toBeAttached();
        await expect(referralList).toBeAttached();
        await expect(barrierPanel).toBeAttached();
        await expect(bottleneckPanel).toBeAttached();
    });
});

// ============================================================================
// TEST SUITE 2: Mobile Navigation Functionality
// ============================================================================

test.describe('Mobile Navigation - Functionality @375px', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 375, 667);
    });
    
    test('should show mobile navigation at 375px', async ({ page }) => {
        const mobileNav = page.locator('.mobile-nav');
        await expect(mobileNav).toBeVisible();
        
        // Should have 4 navigation buttons
        const buttons = mobileNav.locator('button');
        await expect(buttons).toHaveCount(4);
    });
    
    test('should scroll to Stats section when tapped', async ({ page }) => {
        const mobileNav = page.locator('.mobile-nav');
        const statsButton = mobileNav.locator('button').filter({ hasText: 'Stats' });
        
        // Click Stats button
        await statsButton.click();
        await page.waitForTimeout(500); // Wait for smooth scroll
        
        // Verify statsBar is in viewport
        const statsBar = page.locator('#statsBar');
        await expect(statsBar).toBeInViewport();
    });
    
    test('should scroll to Referrals section when tapped', async ({ page }) => {
        const mobileNav = page.locator('.mobile-nav');
        const referralsButton = mobileNav.locator('button').filter({ hasText: 'Referrals' });
        
        await referralsButton.click();
        await page.waitForTimeout(500);
        
        const referralList = page.locator('#referralList');
        await expect(referralList).toBeInViewport();
    });
    
    test('should scroll to Barriers section when tapped', async ({ page }) => {
        const mobileNav = page.locator('.mobile-nav');
        const barriersButton = mobileNav.locator('button').filter({ hasText: 'Barriers' });
        
        await barriersButton.click();
        await page.waitForTimeout(500);
        
        const barrierPanel = page.locator('#barrierPanel');
        await expect(barrierPanel).toBeInViewport();
    });
    
    test('should scroll to Insights section when tapped', async ({ page }) => {
        const mobileNav = page.locator('.mobile-nav');
        const insightsButton = mobileNav.locator('button').filter({ hasText: 'Insights' });
        
        await insightsButton.click();
        await page.waitForTimeout(500);
        
        const bottleneckPanel = page.locator('#bottleneckPanel');
        await expect(bottleneckPanel).toBeInViewport();
    });
    
    test('should not hide content behind mobile navigation', async ({ page }) => {
        // Check that body has bottom padding
        const body = page.locator('body');
        const paddingBottom = await body.evaluate((el) => {
            return window.getComputedStyle(el).paddingBottom;
        });
        
        // Should have padding (at least 40px / 2.5rem)
        expect(parseInt(paddingBottom)).toBeGreaterThanOrEqual(40);
    });
});

// ============================================================================
// TEST SUITE 3: Modal Opening and Closing
// ============================================================================

test.describe('Modal - Opening and Closing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await loadSampleData(page);
    });
    
    test('should open modal when referral card is clicked @375px', async ({ page }) => {
        await setViewport(page, 375, 667);
        
        // Wait for referrals to render
        await page.waitForSelector('.referral-card', { timeout: 10000 });
        
        // Click first referral card
        const firstCard = page.locator('.referral-card').first();
        await firstCard.click();
        
        // Modal should be visible
        const modal = page.locator('#referralModal');
        await expect(modal).toBeVisible();
    });
    
    test('should close modal when X button is clicked @375px', async ({ page }) => {
        await setViewport(page, 375, 667);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        // Open modal
        const firstCard = page.locator('#referralList .referral-card').first();
        await firstCard.click();
        
        // Close modal
        const closeButton = page.locator("#referralModal button[onclick=\"closeModal()\"]")
        await closeButton.click();
        
        // Modal should be hidden
        const modal = page.locator('#referralModal');
        await expect(modal).toBeHidden();
    });
    
    test('should show full-screen modal on mobile @375px', async ({ page }) => {
        await setViewport(page, 375, 667);
        await page.waitForSelector('.referral-card', { timeout: 10000 });
        
        const firstCard = page.locator('.referral-card').first();
        await firstCard.click();
        
        const modalContent = page.locator('#referralModal > div');
        const box = await modalContent.boundingBox();
        
        // On mobile, modal should be close to full viewport width
        expect(box.width).toBeGreaterThan(350); // Almost full width at 375px
    });
    
    test('should show centered modal on desktop @1440px', async ({ page }) => {
        await setViewport(page, 1440, 900);
        await page.waitForSelector('.referral-card', { timeout: 10000 });
        
        const firstCard = page.locator('.referral-card').first();
        await firstCard.click();
        
        const modalContent = page.locator('#referralModal > div');
        const box = await modalContent.boundingBox();
        
        // On desktop, modal should NOT be full width
        expect(box.width).toBeLessThan(1200); // Centered, not full width
    });
    
    test('should close modal when clicking outside @1440px', async ({ page }) => {
        await setViewport(page, 1440, 900);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        const firstCard = page.locator('#referralList .referral-card').first();
        await firstCard.click();
        
        // Click on the modal overlay (outside content)
        const modal = page.locator('#referralModal');
        await modal.click({ position: { x: 10, y: 10 } }); // Click top-left corner
        
        // Modal should close
        await expect(modal).toBeHidden();
    });
});

// ============================================================================
// TEST SUITE 4: Coordination Plan Checkbox Persistence
// ============================================================================

test.describe('Coordination Plan - Checkbox Persistence', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await clearStorage(page);
        await loadSampleData(page);
    });
    
    test('should render barrier checkboxes correctly @375px', async ({ page }) => {
        await setViewport(page, 375, 667);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        // Find a referral with barriers
        const cards = page.locator('#referralList .referral-card');
        const count = await cards.count();
        
        let foundBarrierCard = false;
        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            await card.click();
            await page.waitForTimeout(300);
            
            // Check if "Generate Coordination Plan" button exists
            const generateButton = page.locator('button').filter({ hasText: /Generate Coordination Plan/i });
            
            if (await generateButton.count() > 0) {
                foundBarrierCard = true;
                
                // Click to generate coordination plan
                await generateButton.click();
                await page.waitForTimeout(500);
                
                // Find checkboxes in the coordination plan
                const checkboxes = page.locator('input[type="checkbox"][id^="action-"]');
                const checkboxCount = await checkboxes.count();
                
                expect(checkboxCount).toBeGreaterThan(0);
                
                // Verify checkbox exists and can be interacted with
                const firstCheckbox = checkboxes.first();
                await expect(firstCheckbox).toBeVisible();
                
                // Check the checkbox
                await firstCheckbox.check();
                await expect(firstCheckbox).toBeChecked();
                
                // Uncheck it
                await firstCheckbox.uncheck();
                await expect(firstCheckbox).not.toBeChecked();
                
                break;
            }
            
            // Close modal before trying next card
            const closeButton = page.locator("#referralModal button[onclick=\"closeModal()\"]");
            if (await closeButton.count() > 0) {
                await closeButton.click();
                await page.waitForTimeout(200);
            }
        }
        
        expect(foundBarrierCard).toBe(true);
    });
    
    test('should handle multiple barrier checkboxes @768px', async ({ page }) => {
        await setViewport(page, 768, 1024);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        // Find a referral with multiple barriers
        const cards = page.locator('#referralList .referral-card');
        const count = await cards.count();
        
        let foundMultiBarrierCard = false;
        for (let i = 0; i < count; i++) {
            const card = cards.nth(i);
            await card.click();
            await page.waitForTimeout(300);
            
            // Check if "Generate Coordination Plan" button exists
            const generateButton = page.locator('button').filter({ hasText: /Generate Coordination Plan/i });
            
            if (await generateButton.count() > 0) {
                // Click to generate coordination plan
                await generateButton.click();
                await page.waitForTimeout(500);
                
                const checkboxes = page.locator('input[type="checkbox"][id^="action-"]');
                const checkboxCount = await checkboxes.count();
                
                if (checkboxCount >= 2) {
                    foundMultiBarrierCard = true;
                    
                    // Test checking multiple checkboxes
                    await checkboxes.nth(0).check();
                    await expect(checkboxes.nth(0)).toBeChecked();
                    
                    await checkboxes.nth(1).check();
                    await expect(checkboxes.nth(1)).toBeChecked();
                    
                    // Both should remain checked
                    await expect(checkboxes.nth(0)).toBeChecked();
                    await expect(checkboxes.nth(1)).toBeChecked();
                    
                    break;
                }
            }
            
            const closeButton = page.locator("#referralModal button[onclick=\"closeModal()\"]");
            if (await closeButton.count() > 0) {
                await closeButton.click();
                await page.waitForTimeout(200);
            }
        }
        
        expect(foundMultiBarrierCard).toBe(true);
    });
});

// ============================================================================
// TEST SUITE 5: Referral Filtering
// ============================================================================

test.describe('Referral Filtering', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await loadSampleData(page);
    });
    
    test('should filter referrals by status @375px', async ({ page }) => {
        await setViewport(page, 375, 667);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        // Get initial count
        const initialCount = await page.locator('#referralList .referral-card').count();
        expect(initialCount).toBeGreaterThan(0);
        
        // Click "Stuck" filter button (referrals with barriers)
        const stuckFilter = page.locator('button').filter({ hasText: 'Stuck' });
        await stuckFilter.click();
        await page.waitForTimeout(300);
        
        // Count should change (assuming mixed statuses)
        const filteredCount = await page.locator('#referralList .referral-card').count();
        
        // Verify we got some stuck referrals
        expect(filteredCount).toBeGreaterThan(0);
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });
    
    test('should clear filters when "All" is clicked @768px', async ({ page }) => {
        await setViewport(page, 768, 1024);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        const initialCount = await page.locator('#referralList .referral-card').count();
        
        // Apply filter
        const completedFilter = page.locator('button').filter({ hasText: 'Completed' });
        await completedFilter.click();
        await page.waitForTimeout(300);
        
        const filteredCount = await page.locator('#referralList .referral-card').count();
        
        // Click "All" to clear filter
        const allFilter = page.locator('button').filter({ hasText: 'All' });
        await allFilter.click();
        await page.waitForTimeout(300);
        
        // Count should return to initial
        const finalCount = await page.locator('#referralList .referral-card').count();
        expect(finalCount).toBe(initialCount);
    });
    
    test('should filter referrals by In Progress status @1440px', async ({ page }) => {
        await setViewport(page, 1440, 900);
        await page.waitForSelector('#referralList .referral-card', { timeout: 5000 });
        
        const initialCount = await page.locator('#referralList .referral-card').count();
        
        // Click "In Progress" filter
        const activeFilter = page.locator('button').filter({ hasText: 'In Progress' });
        await activeFilter.click();
        await page.waitForTimeout(300);
        
        const filteredCount = await page.locator('#referralList .referral-card').count();
        
        // Should filter results
        expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });
});

// ============================================================================
// TEST SUITE 6: Responsive Grid Layouts
// ============================================================================

test.describe('Responsive Grid Layouts', () => {
    test('should show 2-column stats grid at 375px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 375, 667);
        
        const statsBar = page.locator('#statsBar');
        const gridCols = await statsBar.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(2);
    });
    
    test('should show 4-column stats grid at 768px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 768, 1024);
        
        const statsBar = page.locator('#statsBar');
        const gridCols = await statsBar.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(4);
    });
    
    test('should show 7-column stats grid at 1440px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        
        const statsBar = page.locator('#statsBar');
        const gridCols = await statsBar.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(7);
    });
    
    test('should stack three-column layout vertically at 375px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 375, 667);
        
        const container = page.locator('.grid.grid-cols-1.lg\\:grid-cols-12').first();
        const gridCols = await container.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(1); // Single column on mobile
    });
    
    test('should show three-column grid at 1440px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        
        const container = page.locator('.grid.grid-cols-1.lg\\:grid-cols-12').first();
        const gridCols = await container.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });
        
        expect(gridCols).toBe(12); // 12-column grid on desktop
    });
});

// ============================================================================
// TEST SUITE 7: No Horizontal Overflow
// ============================================================================

test.describe('Horizontal Overflow Detection', () => {
    test('should have no horizontal overflow at 375px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 375, 667);
        await page.waitForLoadState('networkidle');
        
        const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > window.innerWidth;
        });
        
        expect(hasOverflow).toBe(false);
    });
    
    test('should have no horizontal overflow at 768px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 768, 1024);
        await page.waitForLoadState('networkidle');
        
        const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > window.innerWidth;
        });
        
        expect(hasOverflow).toBe(false);
    });
    
    test('should have no horizontal overflow at 1440px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        await page.waitForLoadState('networkidle');
        
        const hasOverflow = await page.evaluate(() => {
            return document.body.scrollWidth > window.innerWidth;
        });
        
        expect(hasOverflow).toBe(false);
    });
});

// ============================================================================
// TEST SUITE 8: Desktop Regression Testing
// ============================================================================

test.describe('Desktop Regression - No Breaking Changes', () => {
    test('should not show mobile navigation at 1440px', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        
        const mobileNav = page.locator('.mobile-nav');
        await expect(mobileNav).toBeHidden();
    });
    
    test('should maintain desktop stats display', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        
        const statCards = page.locator('#statsBar > div');
        await expect(statCards).toHaveCount(7);
    });
    
    test('should maintain desktop three-column layout', async ({ page }) => {
        await page.goto(`${BASE_URL}/index.html`);
        await setViewport(page, 1440, 900);
        
        // Check that left, center, and right panels are visible
        const panels = page.locator('.grid.grid-cols-1.lg\\:grid-cols-12 > div');
        await expect(panels).toHaveCount(3);
    });
});
