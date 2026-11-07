# ReferAll Mobile Usability Audit

**Date:** October 24, 2026  
**Current State:** Desktop-only design  
**Target:** Mobile-first responsive experience

---

## Critical Mobile Issues Identified

### 1. Layout Structure Problems

#### **Stats Bar (7-column grid)**
- **Issue:** `grid-cols-7` with 7 KPI cards
- **Problem:** Impossible to read on mobile - cards become ~45px wide on 320px screens
- **Impact:** Critical metrics completely unusable
- **Fix Required:** Responsive grid (2 cols on mobile, 3-4 on tablet, 7 on desktop)

#### **Three-Column Layout (grid-cols-12)**
- **Issue:** Fixed 3-6-3 column distribution
  - Left Panel: `col-span-3` (Hospital Dashboard)
  - Center Panel: `col-span-6` (Referral Tracker)
  - Right Panel: `col-span-3` (Barrier Analysis)
- **Problem:** Horizontal scroll on all screens below 1200px
- **Impact:** Core workflow unusable on mobile/tablet
- **Fix Required:** Stack vertically on mobile, 2-col on tablet, 3-col on desktop

### 2. Navigation Issues

#### **No Mobile Navigation**
- **Current:** Desktop-only header with inline text
- **Problem:** No collapsible menu, no bottom nav, no mobile-friendly access
- **Impact:** All navigation is header text - no mobile UX pattern
- **Fix Required:** Implement bottom navigation or hamburger menu

### 3. Interactive Element Issues

#### **Small Tap Targets**
- Checkboxes: Default size (~16px)
- Filter dropdowns: Small touch areas
- Status badges: Clickable but tiny
- **Fix Required:** Minimum 44×44px tap targets

#### **Tooltips**
- **Current:** Hover-only tooltips (`.tooltip:hover`)
- **Problem:** No hover on touch devices - priority explanations inaccessible
- **Fix Required:** Tap-to-show or always-visible on mobile

### 4. Form and Input Issues

#### **Text Input Zoom (iOS)**
- **Current:** No font-size specification prevents iOS auto-zoom
- **Problem:** iOS zooms page when focusing inputs <16px
- **Fix Required:** Ensure inputs are min-font-size: 16px

#### **Dropdowns and Selects**
- County, Type, Emergency, Status filters
- **Current:** Desktop-styled selects
- **Fix Required:** Mobile-friendly selects or filter drawer

### 5. Modal Behavior

#### **Referral Detail Modal**
- **Current:** Centered modal with fixed width
- **Problem:** May overflow viewport on small screens
- **Fix Required:** Full-screen or bottom-sheet on mobile

### 6. Chart Rendering

#### **Dashboard Charts**
- **Current:** Fixed-size chart containers
- **Problem:** Charts may be illegible or overflow
- **Fix Required:** Responsive chart sizing, touch-friendly legends

### 7. Typography Issues

- Header: `text-3xl` (30px) - may be too large on mobile
- Card text: Various sizes, not optimized for narrow screens
- **Fix Required:** Fluid typography scale

---

## Component Breakdown

### Existing Components

1. **Header** (line 97)
   - Title, subtitle
   - No mobile menu

2. **Stats Bar** (line 116)
   - 7 KPI cards
   - Grid layout

3. **Hospital Dashboard** (line 157, col-span-3)
   - Filter dropdowns (County, Type, Emergency)
   - Hospital list

4. **Referral Tracker** (line 194, col-span-6)
   - Status filter
   - Referral cards list
   - Click to open modal

5. **Barrier Analysis Panel** (line 220, col-span-3)
   - Individual barrier display
   - System-level bottleneck intelligence (collapsible)

6. **Referral Detail Modal** (JavaScript-generated)
   - Patient info
   - Timeline
   - Coordination plan
   - Action checkboxes

---

## Mobile Breakpoints Strategy

### Breakpoints to Target

```
320px:  Narrow mobile (iPhone SE)
375px:  Standard mobile (iPhone 12/13)
390px:  Modern mobile (iPhone 14)
430px:  Large mobile (iPhone 14 Pro Max)
640px:  Tailwind 'sm' - small tablets
768px:  Tailwind 'md' - tablets
1024px: Tailwind 'lg' - laptops
1280px: Tailwind 'xl' - desktops
```

### Responsive Patterns

#### Mobile (< 640px)
- Stack all panels vertically
- 2-column KPI grid
- Bottom navigation
- Full-screen modals
- Single-column referral cards

#### Tablet (640px - 1023px)
- 3-4 column KPI grid
- 2-column layout (referrals + sidebar)
- Adaptive navigation
- Bottom-sheet modals

#### Desktop (>= 1024px)
- Keep existing 7-column KPI
- Keep existing 3-column layout
- Keep existing header nav
- Keep existing modal behavior

---

## Design System to Preserve

### Colors (from existing)
- Primary Blue: `#2563eb` (bg-blue-600)
- Success Green: `#16a34a` (text-green-600)
- Purple: `#9333ea` (text-purple-600)
- Red/Warning: `#dc2626` (text-red-600)
- Teal: `#14b8a6` (text-teal-600)
- Indigo: `#4f46e5` (text-indigo-600)

### Typography
- Headers: Bold, large
- Body: Regular, readable
- Labels: Small, medium weight

### Spacing
- Card padding: `p-4` (1rem)
- Grid gaps: `gap-4` / `gap-6`
- Container: `mx-auto px-4`

---

## Priority Fixes (Must-Have)

1. **CRITICAL:** Responsive grid for stats bar
2. **CRITICAL:** Stack three-column layout on mobile
3. **CRITICAL:** Mobile navigation (bottom nav recommended)
4. **CRITICAL:** Tap target sizes (44×44px minimum)
5. **HIGH:** Responsive modals (full-screen on mobile)
6. **HIGH:** Touch-friendly tooltips
7. **MEDIUM:** iOS input zoom prevention
8. **MEDIUM:** Responsive charts

---

## Implementation Notes

### Technology Stack
- **Tailwind CSS:** Already loaded via CDN
- **Chart.js:** For analytics visualization
- **Vanilla JavaScript:** All existing interactions
- **No framework:** Pure HTML/CSS/JS

### Tailwind Responsive Classes

Tailwind uses mobile-first breakpoints:
- Default: mobile (< 640px)
- `sm:`: >= 640px
- `md:`: >= 768px
- `lg:`: >= 1024px
- `xl:`: >= 1280px
- `2xl:`: >= 1536px

### Example Responsive Pattern

```html
<!-- Mobile: 2 cols, Tablet: 4 cols, Desktop: 7 cols -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
```

---

## Testing Checklist

### Functional Testing (All Screens)
- [ ] Stats display correctly
- [ ] Filters work
- [ ] Referral cards clickable
- [ ] Modals open/close
- [ ] Coordination plans expand
- [ ] Checkboxes toggle and persist
- [ ] Charts render
- [ ] No horizontal scroll
- [ ] No JavaScript errors

### Screen Size Testing
- [ ] 320px: iPhone SE
- [ ] 375px: iPhone 12/13
- [ ] 390px: iPhone 14
- [ ] 430px: iPhone 14 Pro Max
- [ ] 768px: iPad
- [ ] 1024px: Desktop

### Touch Testing
- [ ] All buttons tappable (44×44px)
- [ ] Tooltips accessible
- [ ] Dropdowns usable
- [ ] Checkboxes easy to tap
- [ ] No accidental taps

---

## End of Audit

**Next Steps:**
1. Implement responsive CSS
2. Add mobile navigation
3. Update grid layouts
4. Enhance touch targets
5. Test on multiple devices
6. Verify functionality preserved
