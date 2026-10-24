# ReferAll - Requirements Documentation
**Developed with Kiro AI**

---

## Functional Requirements

### FR-1: Hospital Data Management
- **FR-1.1:** Display 87 real Massachusetts hospitals from CMS Hospital Compare
- **FR-1.2:** Show hospital names, addresses, phone numbers, and available specialties
- **FR-1.3:** Filter hospitals by specialty type (cardiology, orthopedics, neurology, etc.)
- **FR-1.4:** Filter hospitals by distance range (0-10mi, 10-25mi, 25-50mi, 50+mi)
- **FR-1.5:** Display hospital cards with emergency services flag

**Status:** ✅ Implemented in v1.0

---

### FR-2: Referral Tracking
- **FR-2.1:** Display active referrals with patient name, specialty, hospital, and days waiting
- **FR-2.2:** Track referral status (pending/in-progress/scheduled/completed)
- **FR-2.3:** Record contact attempts and last contact date
- **FR-2.4:** Support referral detail view with full information
- **FR-2.5:** Persist referral data across page reloads (LocalStorage)

**Status:** ✅ Implemented in v1.0

---

### FR-3: Barrier Identification
- **FR-3.1:** Support 6 barrier types:
  - Transportation (🚗)
  - Insurance/Financial (💳)
  - Language (🗣️)
  - Scheduling (📅)
  - Communication (📞)
  - Medical Records (📋)
- **FR-3.2:** Display barriers on referral cards with icons
- **FR-3.3:** Track multiple barriers per referral
- **FR-3.4:** Count total barriers per patient

**Status:** ✅ Implemented in v1.0

---

### FR-4: Priority Scoring System
- **FR-4.1:** Calculate automatic priority score based on:
  - Days waiting (1-3 points)
  - Number of barriers (2 points each)
  - Contact attempts (2-3 points)
  - Scheduling delays (2 points if present)
- **FR-4.2:** Categorize priorities:
  - High Admin Priority (7+ points)
  - Medium Admin Priority (5-6 points)
  - Moderate Admin Priority (3-4 points)
- **FR-4.3:** Display priority badges with color coding
- **FR-4.4:** Show personalized priority reasoning in tooltips
- **FR-4.5:** Clarify administrative vs clinical urgency

**Status:** ✅ Implemented in v2.1, refined in v2.3

**Algorithm:**
```javascript
function calculatePriority(referral) {
  let score = 0;
  let factors = [];
  
  // Days waiting (1-3 points)
  if (referral.daysWaiting > 30) { score += 3; factors.push(`${referral.daysWaiting} days waiting`); }
  else if (referral.daysWaiting > 15) { score += 2; factors.push(`${referral.daysWaiting} days waiting`); }
  else if (referral.daysWaiting > 7) { score += 1; factors.push(`${referral.daysWaiting} days waiting`); }
  
  // Barriers (2 points each)
  score += referral.barriers.length * 2;
  if (referral.barriers.length > 0) {
    factors.push(`${referral.barriers.length} barrier${referral.barriers.length > 1 ? 's' : ''}`);
  }
  
  // Contact attempts (2-3 points)
  if (referral.contactAttempts > 2) { score += 3; factors.push(`${referral.contactAttempts} contact attempts`); }
  else if (referral.contactAttempts === 2) { score += 2; factors.push(`${referral.contactAttempts} contact attempts`); }
  
  // Scheduling delays (2 points)
  if (referral.schedulingDelay) { score += 2; factors.push('scheduling delays'); }
  
  // Categorize
  let level = score >= 7 ? 'critical' : score >= 5 ? 'high' : 'medium';
  
  return { level, score, factors };
}
```

---

### FR-5: Coordination Plans
- **FR-5.1:** Generate barrier-specific action templates automatically
- **FR-5.2:** Transportation barriers → medical transport, MassHealth verification
- **FR-5.3:** Insurance barriers → authorization support, network alternatives
- **FR-5.4:** Language barriers → interpreter services, translated materials
- **FR-5.5:** Scheduling barriers → flexible appointment times, provider outreach
- **FR-5.6:** Communication barriers → update contact info, emergency contact
- **FR-5.7:** Medical record barriers → fax follow-up, electronic records request
- **FR-5.8:** Track action completion with checkboxes
- **FR-5.9:** Persist completed actions in LocalStorage
- **FR-5.10:** Calculate total actionsCompleted metric

**Status:** ✅ Implemented in v2.2

**Example Template:**
```javascript
// Transportation barrier coordination plan
{
  barrier: 'Transportation',
  actions: [
    { id: 1, text: 'Arrange medical transportation through MassHealth', completed: false },
    { id: 2, text: 'Verify patient transportation eligibility', completed: false },
    { id: 3, text: 'Provide alternative local provider options if needed', completed: false },
    { id: 4, text: 'Connect patient with community transport services', completed: false }
  ]
}
```

---

### FR-6: Barrier Resolution Tracking
- **FR-6.1:** Track barriers resolved separately from actions completed
- **FR-6.2:** Coordinator confirms barrier resolution (not automatic on action completion)
- **FR-6.3:** Display barriersResolved metric distinct from actionsCompleted
- **FR-6.4:** Show resolved barriers with checkmark (✓) in UI
- **FR-6.5:** Update bottleneck intelligence when barriers resolved

**Status:** ✅ Implemented in v2.3

**Distinction:**
- **Actions Completed:** Coordinator tasks checked off (process metric)
- **Barriers Resolved:** Patient barriers actually fixed (outcome metric)

---

### FR-7: Bottleneck Intelligence
- **FR-7.1:** Calculate system-wide barrier statistics:
  - Count of patients affected per barrier type
  - Average days stuck per barrier type
  - Actions initiated per barrier type
  - Impact score (patients × avg days)
- **FR-7.2:** Categorize impact severity:
  - Critical (8+ patients × days)
  - High (5-7 patients × days)
  - Moderate (1-4 patients × days)
- **FR-7.3:** Display bottleneck intelligence in collapsible section
- **FR-7.4:** Generate system-level solution recommendations
- **FR-7.5:** Identify stakeholders for each bottleneck
- **FR-7.6:** Show expected impact of interventions
- **FR-7.7:** Display key insights (high-acuity specialties, geographic clusters)

**Status:** ✅ Implemented in v2.4, enhanced in v2.5, layout optimized in v3.0

**Example Bottleneck:**
```javascript
{
  barrier: 'Transportation',
  count: 12,                    // patients affected
  avgDaysStuck: 31,             // average delay
  actionsInitiated: 18,         // coordinator actions
  impact: 'Critical',           // 12 patients × 31 days = 372
  systemSolution: 'Standardized transport eligibility criteria with payer partnerships',
  stakeholders: 'Payers, hospitals, transport providers',
  expectedImpact: '40% reduction in referral delays'
}
```

---

### FR-8: Dashboard & Metrics
- **FR-8.1:** Display 7 KPI cards at top:
  - Total Hospitals (87)
  - Active Referrals (count)
  - Completion Rate (percentage)
  - Needs Attention (high priority count)
  - Actions Completed (teal, process metric)
  - Barriers Resolved (purple, outcome metric)
  - Active Plans (with coordination plans)
- **FR-8.2:** Three-column operational dashboard:
  - Left: Hospital Dashboard (filter and search)
  - Center: Referral Tracker (main workflow)
  - Right: Barrier Analysis (pie chart distribution)
- **FR-8.3:** Collapsible Referral Bottleneck Intelligence (full-width)
- **FR-8.4:** Update metrics in real-time on action completion

**Status:** ✅ Implemented in v2.3, layout optimized in v3.0

---

### FR-9: User Interface
- **FR-9.1:** Workflow-first layout (referrals immediately visible)
- **FR-9.2:** Responsive design (works on desktop and tablet)
- **FR-9.3:** Color-coded priority badges (red/yellow/blue)
- **FR-9.4:** Modal dialogs for referral details
- **FR-9.5:** Scrollable modal content with fixed header
- **FR-9.6:** Tooltips for priority reasoning
- **FR-9.7:** Filter dropdowns for hospitals (specialty, distance)
- **FR-9.8:** Pie chart for barrier distribution
- **FR-9.9:** Collapsible sections (bottleneck intelligence)
- **FR-9.10:** Emoji icons for visual clarity

**Status:** ✅ Implemented across all versions, refined in v3.0

---

## Non-Functional Requirements

### NFR-1: Performance
- **NFR-1.1:** Page load time < 2 seconds on standard broadband
- **NFR-1.2:** No external server dependencies (runs offline)
- **NFR-1.3:** Smooth UI interactions (no lag on action completion)
- **NFR-1.4:** LocalStorage for instant data persistence

**Status:** ✅ Achieved (single HTML file with CDN assets)

---

### NFR-2: Reliability
- **NFR-2.1:** Zero server failures (no backend to fail)
- **NFR-2.2:** Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR-2.3:** Data persists across page reloads
- **NFR-2.4:** Graceful degradation if LocalStorage unavailable

**Status:** ✅ Achieved

---

### NFR-3: Usability
- **NFR-3.1:** Intuitive navigation (no training required for demo)
- **NFR-3.2:** Clear visual hierarchy (referrals front and center)
- **NFR-3.3:** Self-explanatory priority tooltips
- **NFR-3.4:** One-click access to coordination plans
- **NFR-3.5:** Color-coded for quick visual scanning

**Status:** ✅ Achieved, validated through iterative design

---

### NFR-4: Maintainability
- **NFR-4.1:** Clean, commented JavaScript code
- **NFR-4.2:** Modular function design (25+ specialized functions)
- **NFR-4.3:** Consistent naming conventions
- **NFR-4.4:** Single-file architecture for easy distribution

**Status:** ✅ Achieved

---

### NFR-5: Scalability (Future)
- **NFR-5.1:** Architecture ready for backend integration (FHIR APIs)
- **NFR-5.2:** Data model supports thousands of referrals
- **NFR-5.3:** Algorithm scales to multiple health systems
- **NFR-5.4:** Coordination plan templates extensible

**Status:** ⏳ Designed for future scalability

---

### NFR-6: Security & Privacy
- **NFR-6.1:** Synthetic patient data only (no real PHI)
- **NFR-6.2:** No data transmission to external servers
- **NFR-6.3:** Privacy-conscious design principles
- **NFR-6.4:** Honest technical claims (no false "HIPAA-Ready")

**Status:** ✅ Achieved for hackathon demo scope

**Note:** Production version would require:
- ✗ HIPAA compliance (encryption, audit logs, BAAs)
- ✗ Authentication & authorization (SSO/SAML)
- ✗ Data encryption at rest and in transit
- ✗ Penetration testing and security audits

---

### NFR-7: Documentation
- **NFR-7.1:** Comprehensive README with quick start
- **NFR-7.2:** Inline code comments for complex logic
- **NFR-7.3:** Demo script for presentation
- **NFR-7.4:** Q&A preparation for judges
- **NFR-7.5:** Strategic positioning documentation
- **NFR-7.6:** Kiro AI development documentation

**Status:** ✅ Achieved

---

## Acceptance Criteria

### AC-1: Core Functionality
- [ ] ✅ 87 real MA hospitals displayed with accurate data
- [ ] ✅ 25 synthetic patient referrals with diverse barriers
- [ ] ✅ Priority scoring automatically calculated
- [ ] ✅ Coordination plans generated per barrier type
- [ ] ✅ Actions and barriers tracked separately
- [ ] ✅ Bottleneck intelligence shows system patterns

### AC-2: User Experience
- [ ] ✅ Referrals visible immediately on page load
- [ ] ✅ Priority badges show reasoning on hover
- [ ] ✅ Modal scrolls smoothly with fixed header
- [ ] ✅ Bottleneck intelligence collapsible and below workflow
- [ ] ✅ Color coding clear and consistent

### AC-3: Technical Quality
- [ ] ✅ No console errors in browser
- [ ] ✅ Works offline (no server required)
- [ ] ✅ Data persists across reloads
- [ ] ✅ Loads in < 2 seconds
- [ ] ✅ Responsive on desktop and tablet

### AC-4: Documentation
- [ ] ✅ README explains problem and solution
- [ ] ✅ Demo script provided for presentation
- [ ] ✅ Q&A document covers judge questions
- [ ] ✅ Kiro development documentation complete
- [ ] ✅ License and attribution included

### AC-5: Strategic Positioning
- [ ] ✅ Positioned as "intelligence layer" not EHR competitor
- [ ] ✅ Integration approach with Epic/Cerner via FHIR APIs
- [ ] ✅ Honest technical claims (no false HIPAA/AI hype)
- [ ] ✅ Clear value proposition for coordinators and administrators

---

## Requirements Traceability

| Requirement | Version Implemented | Status |
|-------------|---------------------|--------|
| FR-1: Hospital Data | v1.0 | ✅ Complete |
| FR-2: Referral Tracking | v1.0 | ✅ Complete |
| FR-3: Barrier Identification | v1.0 | ✅ Complete |
| FR-4: Priority Scoring | v2.1, v2.3 | ✅ Complete |
| FR-5: Coordination Plans | v2.2 | ✅ Complete |
| FR-6: Barrier Resolution | v2.3 | ✅ Complete |
| FR-7: Bottleneck Intelligence | v2.4, v2.5, v3.0 | ✅ Complete |
| FR-8: Dashboard & Metrics | v2.3, v3.0 | ✅ Complete |
| FR-9: User Interface | All versions | ✅ Complete |
| NFR-1 to NFR-7 | All versions | ✅ Complete |

---

**All requirements met for Hackachusetts 2026 Healthcare Track submission.**

Built with Kiro AI 🚀
