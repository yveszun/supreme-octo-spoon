# Mobile UX Prototype - ReferAll

## 📱 View the Prototype

### Option 1: Direct GitHub Raw View
```
https://htmlpreview.github.io/?https://github.com/yveszun/supreme-octo-spoon/blob/mobile-ux-prototype/mobile-prototype.html
```

### Option 2: Download and Open Locally
1. Download: https://raw.githubusercontent.com/yveszun/supreme-octo-spoon/mobile-ux-prototype/mobile-prototype.html
2. Open in your browser
3. Use browser dev tools (F12) to test at different mobile widths: 375px, 390px, 768px

### Option 3: Netlify Drop (Best for iPhone Testing)
1. Download the file above
2. Go to https://app.netlify.com/drop
3. Drag the file to get a live URL
4. Open on your iPhone

## 🎯 What to Test

### Referral List Screen
- **Filters**: Tap "Stuck", "In Progress", "All" to filter referrals
- **Priority badges**: HIGH/MEDIUM labels based on actual calculation
- **Next actions**: Displayed for referrals with barriers
- **Real data**: Uses actual patient data from the application

### Coordination Plan Screen  
- Tap any referral card to open detail view
- Coordination plan generated automatically for referrals with barriers
- **Checkbox persistence**: Tap checkboxes - they save to localStorage instantly
- **Progress tracking**: Watch the progress bar update as you complete actions
- **Grouped by barrier**: Actions organized by transportation, communication, insurance, etc.

### Navigation
- Back button (←) returns to list
- Bottom nav shows the 4-section structure (Referrals, Insights, Hospitals, More)

### Data Persistence
- Complete some actions, close the browser, reopen
- Your checkbox states are preserved via localStorage

## 🎨 Design Elements to Review

1. **Visual Hierarchy**: Patient name → specialty → facility → barriers → next action
2. **Typography**: System fonts, 600 weight headers, clear sizing
3. **Spacing**: Consistent 12-16px padding, 12px gaps between cards
4. **Colors**: Restrained palette - primary blue, subtle grays, semantic colors for status
5. **Cards**: Clean white backgrounds, subtle borders, minimal shadows
6. **Interactions**: Touch-friendly 44px+ targets, smooth transitions

## 📐 Responsive Behavior

Test at these widths:
- **375px**: iPhone SE, iPhone 12/13 mini
- **390px**: iPhone 12/13/14 Pro
- **768px**: iPad mini, large phones

All content should be readable, scrollable, and interactive at these sizes.

## ⚙️ Technical Notes

- **No frameworks**: Pure vanilla JavaScript
- **localStorage**: Coordination plan persistence
- **Real calculations**: Priority scoring uses existing algorithm
- **Desktop preserved**: This is mobile-only - desktop layout unchanged
- **Zero dependencies**: No external libraries

## 🔍 Key Differences from Current Mobile View

**Before (Current):**
- 7 KPIs stacked vertically
- Hospital dashboard above referrals
- Modal-heavy interaction
- Desktop UI compressed

**After (Prototype):**
- Actionable counts only (3 need attention)
- Referrals as primary focus
- Inline coordination workflow
- Purpose-built mobile UI

## 📝 Next Steps After Approval

Once you approve the visual design:
1. I'll integrate this into `index.html` with CSS media queries
2. Desktop layout remains untouched (>768px)
3. Mobile UX activates at ≤768px
4. All existing data, calculations, and features preserved
5. Deploy to new branch for testing
6. No automatic merge or deployment

---

**Branch**: `mobile-ux-prototype`  
**File**: `mobile-prototype.html`  
**Status**: Awaiting visual design approval
