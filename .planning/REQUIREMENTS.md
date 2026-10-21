# Requirements: BoviCare

## Requirement Hierarchy & Status

| Req ID | Description | Category | Priority | Status | Phase |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | Bovine rectal and udder temperature validation thresholds | Clinical Core | Must | Validated | Phase 0 |
| **REQ-02** | CMT reaction scoring (0 to 3+) & fore-milk inspection | Clinical Core | Must | Validated | Phase 0 |
| **REQ-03** | 4-quarter udder anatomical mapping (LF, RF, LR, RR) | Clinical Core | Must | Validated | Phase 0 |
| **REQ-04** | Client-side WebP compression (< 1MB cap) | Storage | Must | Validated | Phase 0 |
| **REQ-05** | Dual-bucket storage fallback & signed URL TTL caching | Storage | Must | Validated | Phase 0 |
| **REQ-06** | Trilingual localization (English, Marathi, Hindi) across UI | Localization | Must | Validated | Phase 0 |
| **REQ-07** | Bhashini server proxy with credential protection | Integration | Must | Validated | Phase 0 |
| **REQ-08** | Rural farmer speech-to-text input & speech synthesis guide | Usability | Must | Validated | Phase 0 |
| **REQ-09** | Cattle catalog with cow vs. Murrah buffalo classification | Herd Hub | Must | Validated | Phase 0 |
| **REQ-10** | Triage queue & digital Rx with milk withholding timers | Triage & Rx | Must | Validated | Phase 0 |
| **REQ-11** | Full vertical page scrolling on health assessment form | UI/UX | Must | Validated | Phase 0 |
| **REQ-12** | Removal of Active Role indicator badges from dashboards | Security/UI | Must | Validated | Phase 0 |
| **REQ-13** | Clinical Overview dashboard with 4-quarter heatmap & SCC | Analytics | Must | Validated | Phase 0 |
| **REQ-14** | Secure Administration Portal with telemetry & audit logs | Admin | Should | Validated | Phase 0 |
| **REQ-15** | Automated smoke test runner with 29 test suites | Testing | Must | Validated | Phase 0 |
| **REQ-16** | In-modal Bhashini translation for Vet review & notes | Integration | Should | Active | Phase 1 |
| **REQ-17** | Connect deep learning computer-vision model to `/api/ai-screen` | AI Inference | Should | Active | Phase 2 |
| **REQ-18** | Clinical Overview date range & lactation group filtering | Analytics | Nice | Active | Phase 3 |
| **REQ-19** | Browser push / SMS notifications for milk withholding expiry | Notification | Nice | Active | Phase 4 |
| **REQ-20** | Capacitor Android native packaging & camera verification | Mobile | Should | Active | Phase 5 |

---

## Table Stakes (Essential for Field Operations)

- [x] **REQ-01: Temperature Range Validation** — Detects clinical hypothermia (< 38.0°C) and acute mastitic fever (> 39.2°C).
- [x] **REQ-02: CMT Scoring** — Standardized grading of somatic reaction gelation from Negative to 3+.
- [x] **REQ-03: 4-Quarter Udder Localization** — Separate tracking for LF, RF, LR, and RR avoids whole-udder overtreatment.
- [x] **REQ-04: Client-Side WebP Compression** — Prevents mobile upload failures and stays within Supabase 1MB free-tier storage caps.
- [x] **REQ-06: Trilingual Localization** — Rural farmers in Maharashtra and Hindi-speaking states require natural Indic language forms.
- [x] **REQ-10: Food Safety Milk Withholding Timers** — Enforces mandatory withdrawal periods to prevent antibiotic milk tank contamination.
- [x] **REQ-11: Full Vertical Form Scrolling** — Form fields, inputs, and submit button must remain completely accessible on mobile keyboards.
- [x] **REQ-12: Complete Role Badges Removal** — Eliminates misleading role-switch buttons from dashboard UI while preserving RLS policies.

---

## Differentiators (Value-Add & Tele-Veterinary Tools)

- [x] **REQ-08: Bhashini Voice Assistant** — Allows semi-literate farmers to dictate clinical symptoms and hear assessment guides read aloud.
- [x] **REQ-13: 4-Quarter Udder Inflammation Heatmap** — Gives veterinarians immediate epidemiological visualization of herd vulnerable quarters.
- [ ] **REQ-16: One-Click Tele-Consultation Translation** — In-modal translation of farmer Marathi/Hindi notes into English for urban vets, and vice versa.
- [ ] **REQ-17: On-Device / Cloud Mastitis AI Screening** — Computer vision inference providing probabilistic heatmaps on strip cup curd formations.

---

## Out of Scope (Deferred)

- **REQ-DEF-01: Pharmaceutical E-Commerce & Delivery** — Deferred; focus on clinical triage and veterinary prescription compliance.
- **REQ-DEF-02: Automated In-Line Milking Parlor Sensors** — Deferred to Phase 6+ enterprise hardware roadmap.
