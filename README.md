# supreme-octo-spoon
ReferAll (Hackachusetts 2026)

ReferAll is a coordination intelligence platform that helps healthcare coordinators prioritize patient referrals and identify system-wide bottlenecks. Built to integrate with existing EHR systems (Epic, Cerner) via HL7 FHIR APIs.

![ReferAll Dashboard](https://img.shields.io/badge/Demo-Live-brightgreen) ![Status](https://img.shields.io/badge/Status-Hackathon%20Project-orange)

---

## 🎯 The Problem

When a doctor refers a patient to a specialist, that referral can get stuck for weeks or months due to:
- **Transportation barriers** - patients can't get to appointments
- **Insurance issues** - authorization delays, out-of-network specialists
- **Language barriers** - limited English proficiency, no interpreters
- **Scheduling conflicts** - long specialist wait times
- **Communication breakdowns** - unreturned calls, wrong contact info

Care coordinators manage hundreds of these referrals manually with spreadsheets, unable to:
1. **Prioritize** which patients need attention most urgently
2. **Identify patterns** - is transportation the bottleneck? Insurance? Language access?
3. **Generate action plans** - what specific steps resolve each barrier type?

---

## 💡 The Solution

**ReferAll is the coordination intelligence layer for healthcare referrals.**

### For Care Coordinators:
- ✅ **Smart Triage** - automatic priority scoring based on days waiting, barriers, and contact attempts
- ✅ **Coordination Plans** - barrier-specific action templates (transportation → arrange medical transport, verify insurance, etc.)
- ✅ **Explainable Intelligence** - every priority shows exactly why (hover tooltips)

### For Health System Administrators:
- ✅ **Bottleneck Intelligence** - see system-wide patterns (transportation affecting 12 patients, avg 31 days stuck)
- ✅ **Impact Assessment** - Critical/High/Moderate severity scoring
- ✅ **System-Level Solutions** - recommendations with stakeholders and expected impact

### Technical Approach:
- ✅ **Integration Layer** - designed to pull referral data from Epic/Cerner via HL7 FHIR APIs
- ✅ **Rule-Based Scoring** - no black-box AI, fully explainable prioritization
- ✅ **Workflow-Optimized** - referrals immediately visible, strategic analysis collapsible

---

## 🚀 Quick Start

**This is a single-file HTML demo** - no server, no dependencies, no installation.

1. **Download** `referall.html`
2. **Open** in any modern web browser (Chrome, Firefox, Safari, Edge)
3. **Explore** the demo with 87 real Massachusetts hospitals and 25 synthetic patient referrals

```bash
# Or clone and open
git clone https://github.com/yourusername/referall.git
cd referall
open referall.html  # macOS
# or just double-click referall.html in your file explorer
```

**That's it!** No npm install, no build step, no backend server.

---

## 📊 Features

### Priority Scoring System
Automatic prioritization based on:
- **Days waiting** (1-3 points: >30 days = 3pts, 15-30 days = 2pts, 7-14 days = 1pt)
- **Number of barriers** (2 points per barrier)
- **Contact attempts** (2-3 points: >2 attempts = 3pts)
- **Scheduling delays** (2 points if present)

**7+ points = High Admin Priority | 5-6 = Medium | 3-4 = Moderate**

Every priority badge shows personalized reasoning via tooltip.

### Barrier Types
- 🚗 **Transportation** - access deserts, mobility limitations
- 💳 **Insurance/Financial** - authorization, out-of-network, affordability
- 🗣️ **Language** - limited English proficiency, interpreter needs
- 📅 **Scheduling** - specialist wait times, patient availability conflicts
- 📞 **Communication** - unreturned calls, incorrect contact information
- 📋 **Medical Records** - missing documentation, transfer delays

### Coordination Plans
Barrier-specific action templates:
- Transportation → Arrange medical transport, verify MassHealth eligibility
- Insurance → Contact insurance for authorization, check in-network alternatives
- Language → Arrange interpreter services, provide translated materials
- And more...

### Bottleneck Intelligence (Collapsible)
- **System-wide barrier analysis** - which barriers affect the most patients?
- **Impact assessment** - Critical (8+ patients × days), High (5-7), Moderate (1-4)
- **Average days stuck** - how long are patients delayed by each barrier type?
- **Health system recommendations** - priority actions, stakeholders, expected impact

---

## 🏥 Data Sources

### Hospital Data (Real)
**87 Massachusetts hospitals** from [CMS Hospital Compare](https://data.cms.gov/provider-data/topics/hospitals)
- Hospital names, addresses, phone numbers
- Available specialties (cardiology, orthopedics, neurology, etc.)
- Emergency services flags

### Patient Referrals (Synthetic)
**25 synthetic patient records** with clinically appropriate barriers:
- Names are fictional
- Barrier patterns reflect real healthcare coordination challenges
- Specialty distributions match real referral volumes

---

## 🛠️ Tech Stack

**Hackathon Demo Stack:**
- Single HTML file (~1800 lines)
- Vanilla JavaScript (no frameworks)
- [Tailwind CSS](https://tailwindcss.com/) (CDN)
- [Chart.js](https://www.chartjs.org/) (CDN)
- LocalStorage for persistence

**Why this stack?**
- ✅ Zero setup - runs in any browser
- ✅ Maximum demo reliability - no server = no failure points
- ✅ Focus on intelligence logic, not infrastructure

**Production Stack Would Be:**
- React/Next.js frontend
- Node.js/Python backend
- PostgreSQL database
- HL7 FHIR API integration with Epic/Cerner
- Redis caching for performance
- Kubernetes deployment

---

## 🎓 Design Decisions

### 1. Workflow-First Layout
**Problem:** Early version had bottleneck intelligence above referral cards - strategic analysis pushed daily workflow off-screen.

**Solution:** Moved intelligence to collapsible full-width section below operational dashboard. Coordinators see referrals immediately. Managers expand intelligence when needed.

### 2. Rule-Based (Not AI)
**Problem:** Care coordinators won't trust black-box AI telling them which patient to prioritize.

**Solution:** Transparent rule-based scoring with visible reasoning. Every priority badge shows exactly why - "Prioritized because this referral has been outstanding for 42 days, and has 3 barriers..."

### 3. Actions vs Barriers Tracking
**Problem:** Completing coordinator tasks doesn't mean patient barriers are resolved.

**Solution:** Separate metrics - "Actions Completed" (checkbox completion) vs "Barriers Resolved" (confirmed resolution). Tracks both coordinator work and patient outcomes.

### 4. Honest Technical Claims
**Problem:** Early version claimed "HIPAA-Ready" (unsupported for a demo).

**Solution:** Changed to "Explainable Intelligence • Actionable Coordination • Privacy-Conscious Design" - accurate claims for hackathon scope.

---

## 📈 Metrics & Impact

### Operational Metrics (Immediate)
- Average referral completion time (target: 30% reduction)
- Coordinator actions per referral (efficiency)
- Barrier resolution rate (outcomes)

### Clinical Metrics (3-6 months)
- Time to specialist appointment (patient access)
- Appointment no-show rates (should decrease with better coordination)
- Patient satisfaction scores (CAHPS survey improvement)

### Strategic Metrics (6-12 months)
- System-wide bottleneck reduction (fewer transportation barriers over time)
- Cost savings (staff time, duplicate testing, emergency visits avoided)
- Value-based care metrics (referral completion is a quality measure)

---

## 🚧 Known Limitations (Hackathon Scope)

This is a **demonstration platform**, not production-ready:

- ❌ **Not HIPAA compliant** - no encryption, audit logs, or BAAs
- ❌ **No EHR integration** - FHIR API integration is designed but not built
- ❌ **Synthetic data only** - real patient data would require security hardening
- ❌ **No authentication** - production would need SSO/SAML
- ❌ **LocalStorage persistence** - production would use proper database

**What it DOES demonstrate:**
- ✅ Coordination intelligence logic (priority scoring, coordination plans)
- ✅ Dual perspective (patient-level + system-level)
- ✅ Workflow-optimized design for real coordinator needs
- ✅ Explainable decision-making (no black boxes)

---

## 🎯 Future Roadmap

### Phase 1: EHR Integration (3-6 months)
- HL7 FHIR API connectors for Epic and Cerner
- Bi-directional sync (pull referrals, push actions back)
- OAuth 2.0 authentication for EHR systems

### Phase 2: Intelligence Enhancement (6-9 months)
- Machine learning for pattern detection (which hospitals have long wait times?)
- Predictive modeling (which referrals are at risk of no-show?)
- Geographic analysis (transportation deserts, specialty access gaps)

### Phase 3: Patient-Facing Tools (9-12 months)
- SMS/app for patients to confirm appointments
- Self-service barrier reporting ("I need transportation help")
- Multilingual support for patient communications

### Phase 4: Network Effects (12+ months)
- Cross-system analytics (state-wide bottleneck trends)
- Best practice sharing (coordination plan templates that work)
- Payer integration (automated authorization checks)

---

## 👥 Team

Built by Yves Miel Zuniga for **Hackachusetts 2026 Healthcare Track**

- 🎓 Harvard University
- 💼 https://www.linkedin.com/in/yvesmielzuniga
- 📧 yves_zuniga@hms.harvard.edu

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

**Note:** Hospital data sourced from CMS Hospital Compare (public domain). Patient data is entirely synthetic and fictional.

---

## 🙏 Acknowledgments

- **CMS Hospital Compare** for public hospital data
- **Hackachusetts 2026** for the healthcare track challenge
- **Care coordinators** who inspired this project with their invisible heroic work

---

## 📚 Additional Documentation

- [Demo Script](🎤_DEMO_SCRIPT.md) - 5-7 minute presentation walkthrough
- [Judge Q&A](❓_JUDGE_QA.md) - Answers to common questions
- [Positioning Strategy](🎯_POSITIONING.md) - "Intelligence layer" approach
- [Test Plan](🎯_TEST_v3.0_FINAL.txt) - Feature verification checklist

---

## 🔗 Links

- **Live Demo:** [Open referall.html in browser]
- **GitHub:** https://github.com/yourusername/referall
- **Hackathon:** [Link to Hackachusetts 2026]
- **Pitch Deck:** [Coming soon]

---

## ⭐ Star This Repo

If ReferAll helped you understand healthcare coordination challenges or inspired your own project, please star this repo!

---

**Built with ❤️ for care coordinators who help patients navigate healthcare every day.**
