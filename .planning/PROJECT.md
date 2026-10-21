# BoviCare — AI-Assisted Bovine Mastitis Detection & Veterinary Tele-Triage

## Core Value
Empower dairy farmers and field veterinarians with rapid, quarter-level mastitis detection, clinical triage, standardized CMT assessments, and food safety milk withholding governance across Marathi, Hindi, and English.

## Problem
Bovine mastitis is the single most economically damaging disease in dairy farming, causing severe milk production losses, animal suffering, and antibiotic contamination risks in bulk milk tanks. Rural smallholder farmers often lack access to timely veterinary diagnostics, struggle with complex English-only medical forms, and inadvertently deliver antibiotic-laden milk during treatment periods.

## Vision
A unified, zero-build Progressive Web Application (PWA) & Capacitor-wrapped mobile app that functions seamlessly in low-connectivity rural settings, provides spoken and written guidance in Marathi and Hindi, allows farmers to submit 4-quarter observations with WebP-compressed photos, and enables licensed veterinarians to issue digital prescriptions with automated milk withholding countdowns.

## Constraints
- **Zero-Dependency Local Server:** Native Node.js HTTP server (`server.js`) without heavy frameworks.
- **Supabase Free Tier Limitations:** Image files must be compressed under 1MB client-side; database access strictly guarded by PostgreSQL RLS.
- **Server-Side API Security:** Bhashini API keys and third-party credentials must remain strictly on the server; never exposed to browser client.
- **Architecture Preservation:** Keep vanilla JS / HTML5 / CSS3 architecture and design system; do not replace with a generic template or framework.

## Non-Goals
- **Replacing Licensed Veterinary Judgment:** AI and automated checklists screen and triage only; clinical diagnosis and prescription authority remain with registered veterinarians.
- **Complex Cloud Build Pipelines:** No Webpack/Vite build steps for core runtime; vanilla ES modules and direct browser loading to preserve rapid field deployment and offline resilience.
- **Unverified Indic Machine Translation:** No faking or hallucinating Indic translations; use official Bhashini endpoints or verified local clinical terminology.

---

## Requirements

### Validated (Confirmed Existing Capabilities)
- [x] **REQ-VAL-01**: Rectal & udder surface temperature validation with bovine fever/subnormal thresholds (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-02**: California Mastitis Test (CMT) reaction scoring (Negative to 3+) and fore-milk strip-cup inspection (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-03**: 4-quarter udder anatomical mapping (LF, RF, LR, RR) for localized clinical tracking (`app.js`, `supabase/migrations/`)
- [x] **REQ-VAL-04**: Client-side canvas image downsampling to WebP (< 1MB) for free-tier storage compliance (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-05**: Dual-bucket cloud storage (`bovicare-private-images` & `udder-images`) with 50-minute TTL signed URL cache (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-06**: Trilingual localization engine supporting English, Marathi, and Hindi across all public and authenticated pages (`app.js`, `landing.js`, `login.js`, `admin.js`)
- [x] **REQ-VAL-07**: Server-side Bhashini proxy (`/api/bhashini/config` & `/api/bhashini/translate`) for Indic translation without client secret exposure (`server.js`)
- [x] **REQ-VAL-08**: Voice assistant speech-to-text input and speech synthesis audio guides for rural farmers (`app.js`, `index.html`)
- [x] **REQ-VAL-09**: Cattle catalog with multi-attribute search and indigenous cow vs. Murrah buffalo classification (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-10**: Priority triage queue and digital prescription issuance with automated milk/meat withholding timers (`app.js`, `smoke_test.js`)
- [x] **REQ-VAL-11**: Full vertical scrolling on the health assessment form with mobile keyboard clearance (`index.html`, `styles.css`)
- [x] **REQ-VAL-12**: Removal of Active Role indicator badges from dashboard headers and sidebars without compromising RBAC security (`index.html`, `styles.css`, `app.js`)
- [x] **REQ-VAL-13**: Cleaned up Clinical Overview dashboard with 4-quarter heatmap, Somatic Cell Count (SCC) benchmarks, and pathogen formulary (`index.html`, `app.js`)
- [x] **REQ-VAL-14**: Dedicated Administration Command Portal with master gate and telemetry (`admin.html`, `admin.js`, `supabase/migrations/`)
- [x] **REQ-VAL-15**: 29-suite automated smoke test runner with 100% pass rate (`smoke_test.js`)

### Active (Incomplete Features & Next Priorities)
- [ ] **REQ-ACT-01**: In-modal Bhashini dynamic translation button for Vet Review (translate farmer notes to English or prescription to Marathi/Hindi)
- [ ] **REQ-ACT-02**: Connect pre-trained deep learning computer vision model (.onnx / PyTorch) to `/api/ai-screen` with confidence score display
- [ ] **REQ-ACT-03**: Dynamic date & lactation-stage filters on the Clinical Overview dashboard
- [ ] **REQ-ACT-04**: Browser push / SMS notifications for impending milk withholding release and urgent triage cases
- [ ] **REQ-ACT-05**: Capacitor native Android build synchronization and camera hardware verification

### Out of Scope
- **Direct Treatment Dispensation / E-Commerce:** BoviCare issues clinical Rx protocols; direct pharmaceutical purchasing is out of scope for v1.
- **Automated Milking Machine Hardware Integration:** Real-time sensor streaming via IoT milking parlors is deferred to future enterprise roadmap.

---

## Key Decisions

| Decision | Rationale | Outcome |
| :--- | :--- | :--- |
| **Keep Vanilla Web Core** | High performance, instant mobile loading, zero build complexity, and easy offline debugging | Confirmed |
| **Server-Side Bhashini Proxy** | Protects government API keys and user credentials while providing Indic translation | Confirmed |
| **Remove Active Role Badges** | Prevents confusing role-switch buttons for users; enforce roles strictly via Auth and RLS | Confirmed |
| **Client-Side WebP Compression** | Guarantees uploaded cow photos stay under 1MB cap for Supabase free-tier storage | Confirmed |
| **Trilingual Priority (EN/MR/HI)** | Matches rural Maharashtra and Northern India dairy belt language demographics | Confirmed |

---

*Last updated: 2026-10-20 after codebase re-mapping and GSD initialization.*
