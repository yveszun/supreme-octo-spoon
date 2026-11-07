// QA Analysis Script for Mobile-Responsive Enhancement
// Run this in the browser console to check for issues

console.log("=== MOBILE-RESPONSIVE QA ANALYSIS ===\n");

// Test 1: Check if all navigation target IDs exist
console.log("TEST 1: Navigation Target IDs");
const navTargets = ['statsBar', 'referralList', 'barrierPanel', 'bottleneckPanel'];
navTargets.forEach(id => {
    const element = document.getElementById(id);
    console.log(`  ${id}: ${element ? '✓ EXISTS' : '✗ MISSING'}`);
});

// Test 2: Check mobile navigation visibility at different widths
console.log("\nTEST 2: Mobile Navigation Visibility");
const mobileNav = document.querySelector('.mobile-nav');
console.log(`  Mobile nav element: ${mobileNav ? '✓ EXISTS' : '✗ MISSING'}`);
if (mobileNav) {
    const styles = window.getComputedStyle(mobileNav);
    console.log(`  Display property: ${styles.display}`);
    console.log(`  Position: ${styles.position}`);
    console.log(`  Z-index: ${styles.zIndex}`);
}

// Test 3: Check body padding for mobile nav
console.log("\nTEST 3: Body Padding (should be ~4rem on mobile)");
const bodyStyles = window.getComputedStyle(document.body);
console.log(`  Body padding-bottom: ${bodyStyles.paddingBottom}`);

// Test 4: Check responsive grid classes
console.log("\nTEST 4: Responsive Grid Classes");
const statsGrid = document.querySelector('#statsBar') || document.querySelector('[class*="grid-cols"]');
if (statsGrid) {
    console.log(`  Stats grid classes: ${statsGrid.className}`);
    console.log(`  Contains grid-cols-2: ${statsGrid.className.includes('grid-cols-2') ? '✓' : '✗'}`);
    console.log(`  Contains lg:grid-cols-7: ${statsGrid.className.includes('lg:grid-cols-7') ? '✓' : '✗'}`);
}

// Test 5: Check modal responsive classes
console.log("\nTEST 5: Modal Responsive Classes");
const modal = document.getElementById('referralModal');
if (modal) {
    const modalContent = modal.querySelector('.modal-content') || modal.querySelector('[class*="modal"]');
    if (modalContent) {
        console.log(`  Modal classes: ${modalContent.className}`);
        console.log(`  Contains sm:rounded-lg: ${modalContent.className.includes('sm:rounded-lg') ? '✓' : '✗'}`);
        console.log(`  Contains rounded-none: ${modalContent.className.includes('rounded-none') ? '✓' : '✗'}`);
    }
}

// Test 6: Check tooltip activation function
console.log("\nTEST 6: Touch Tooltip Function");
console.log(`  initMobileTooltips function: ${typeof initMobileTooltips !== 'undefined' ? '✓ DEFINED' : '✗ MISSING'}`);

// Test 7: Check for horizontal overflow at current width
console.log("\nTEST 7: Horizontal Overflow Check");
const bodyWidth = document.body.scrollWidth;
const windowWidth = window.innerWidth;
console.log(`  Body scroll width: ${bodyWidth}px`);
console.log(`  Window width: ${windowWidth}px`);
console.log(`  Horizontal overflow: ${bodyWidth > windowWidth ? '✗ YES (PROBLEM)' : '✓ NO'}`);

// Test 8: Check min tap target sizes
console.log("\nTEST 8: Tap Target Sizes");
const buttons = document.querySelectorAll('button');
let smallButtons = 0;
buttons.forEach(btn => {
    const rect = btn.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
        smallButtons++;
    }
});
console.log(`  Buttons smaller than 44x44px: ${smallButtons} ${smallButtons > 0 ? '⚠️' : '✓'}`);

// Test 9: Check data persistence
console.log("\nTEST 9: Data Persistence");
try {
    const stored = localStorage.getItem('referrals');
    console.log(`  LocalStorage 'referrals': ${stored ? '✓ EXISTS' : '⚠️  EMPTY'}`);
    if (stored) {
        const data = JSON.parse(stored);
        console.log(`  Number of referrals: ${data.length}`);
    }
} catch (e) {
    console.log(`  LocalStorage error: ✗ ${e.message}`);
}

// Test 10: Check JavaScript errors
console.log("\nTEST 10: Console Errors");
console.log("  Check the console for any JavaScript errors above this message");

console.log("\n=== QA ANALYSIS COMPLETE ===");
console.log("\nNOTE: Run this script at different viewport widths:");
console.log("  - 320px (mobile)");
console.log("  - 375px (mobile)");
console.log("  - 768px (tablet)");
console.log("  - 1024px (desktop)");
