# BoviCare Roadmap

## Overview

A phased plan continuing from the validated brownfield baseline, addressing incomplete features, improving Bhashini tele-triage interactions, connecting AI computer vision, and completing native mobile packaging.

---

## Phase Details

### Phase 0: Core Platform Baseline & Trilingual Localization
**Status:** Completed & Validated ✓  
**Requirements:** REQ-01, REQ-02, REQ-03, REQ-04, REQ-05, REQ-06, REQ-07, REQ-08, REQ-09, REQ-10, REQ-11, REQ-12, REQ-13, REQ-14, REQ-15  
**Success Criteria:**
1. Rectal & udder vitals validated against bovine physiology.
2. 4-quarter CMT assessment form scrolls vertically with zero UI clipping on all devices.
3. Active Role badge completely removed from Farmer & Vet dashboards.
4. Trilingual (English, Marathi, Hindi) localization consistent across public pages, forms, and admin console.
5. All 29 smoke test suites pass with 100% rate.

---

### Phase 1: In-Modal Tele-Triage Bhashini Translation
**Status:** Completed & Validated ✓  
**Requirements:** REQ-16  
**Goal:** Enable seamless two-way translation during veterinary evaluations without leaving the consultation modal.  
**Success Criteria:**
1. Vet evaluation modal (`modalVetReview`) features a one-click button to translate Marathi/Hindi farmer notes into English using the `/api/bhashini/translate` proxy.
2. Veterinarian prescription instructions can be converted to clear, farmer-readable Marathi or Hindi with veterinary term preservation.
3. Translation requests provide clear loading feedback and graceful fallbacks if network is interrupted.

---

### Phase 2: Editable Farmer & Vet Profiles + Location-Based Vet Assignment
**Status:** Completed & Validated ✓  
**Requirements:** REQ-17  
**Goal:** Deliver editable profile modals for farmers and vets with deterministic 4-tier location-based matching, stability governance, and absolute farmer-facing vet privacy.  
**Success Criteria:**
1. Unified `#modalEditFarmerProfile` allows authenticated farmers to update personal and farm location details.
2. Unified `#modalEditVetProfile` allows authenticated vets to update practice address and service jurisdiction.
3. Deterministic 4-tier location-based vet matching hierarchy (PIN code > Village + District > District > State) implemented with stability and tie-breaker governance.
4. Strict farmer-facing privacy protects assigned vet identities with neutral coverage status.
5. Trilingual localization across English, Marathi, and Hindi for all modal forms, labels, and status notices.
6. All 36 automated smoke test suites pass with 100% rate.

---

### Phase 3: Clinical Triage Case Deletion & Lifecycle Management
**Status:** Completed & Validated ✓ (2026-10-21)  
**Requirements:** REQ-18  
**Goal:** Deliver safe, guarded clinical triage case deletion across Farmer and Veterinarian portals with soft-delete architecture.  
**Success Criteria:**
1. Soft-delete mechanism (`deleted_at = NOW()`) safely removes cases from active queues without violating data integrity.
2. Farmer portal permits deleting open/pending consultation requests while guarding active antibiotic milk withholding plans.
3. Veterinarian portal allows dismissing or deleting cases from the Triage Queue, Review Modal, and Clinical Consultation Workspace.
4. Confirmation prompt prevents accidental case deletion with case identity context.
5. Trilingual localization across English, Marathi, and Hindi for all delete actions and alerts.
6. Automated smoke test suite validates deletion operations, guardrails, and reactive UI updates. All 37 smoke test suites pass with 100% rate.

---

### Phase 4: Computer Vision Mastitis AI Screening Integration
**Status:** Completed & Validated ✓ (2026-10-21)  
**Requirements:** REQ-19  
**Goal:** Connect the pre-trained deep learning inference service to provide real-time curd and inflammation probability.  
**Success Criteria:**
1. Uploaded strip-cup and udder WebP images can be screened via `/api/ai-screen`.
2. Model inferences display confidence scores and probability tiers (Low, Moderate, High risk) in the assessment panel.
3. Explicit disclaimer remains visible stating AI screening assists but does not replace licensed veterinary evaluation.

---

### Phase 5: Clinical Overview Analytics & Cohort Filtering
**Status:** Queued  
**Requirements:** REQ-20  
**Goal:** Provide actionable herd epidemiology filtering by date ranges, lactation stages, and species cohorts.  
**Success Criteria:**
1. Clinical Overview heatmap and KPI cards can be filtered by date range (7d, 30d, 90d, All).
2. Separate views for indigenous cattle vs. Murrah buffaloes.
3. PDF/CSV epidemiological report generation includes Somatic Cell Count (SCC) tiers and active withholding schedules.

---

### Phase 6: Milk Withholding Reminders & Alert System
**Status:** Queued  
**Requirements:** REQ-21  
**Goal:** Prevent accidental bulk milk tank contamination with proactive withholding expiration notifications.  
**Success Criteria:**
1. Browser push notifications notify farmers 12 hours and 2 hours before an antibiotic milk withhold expires.
2. Urgent triage admissions trigger immediate alert badges for assigned veterinarians.
3. Withholding countdown timers update accurately across client reloads.

---

### Phase 7: Capacitor Native Android Packaging & Hardware Testing
**Status:** Queued  
**Requirements:** REQ-22  
**Goal:** Deliver a certified Android APK for field veterinarians and farmers with native camera support.  
**Success Criteria:**
1. Capacitor Android build syncs all web assets cleanly without missing asset paths.
2. Native camera snap and gallery selection verified on physical Android devices.
3. Offline data cache functions seamlessly when device is disconnected from cellular networks.

---

## Progress Table

| Phase | Description | Status | Plans | Target Req |
| :--- | :--- | :--- | :--- | :--- |
| **0** | Core Platform Baseline & Trilingual Localization | Completed ✓ | 5/5 | REQ-01 – REQ-15 |
| **1** | In-Modal Tele-Triage Bhashini Translation | Completed ✓ | 2/2 | REQ-16 |
| **2** | Editable Farmer & Vet Profiles + Location Assignment | Completed ✓ | 1/1 | REQ-17 |
| **3** | Clinical Triage Case Deletion & Lifecycle Management | Completed ✓ | 1/1 | REQ-18 |
| **4** | Computer Vision Mastitis AI Screening | Completed ✓ | 1/1 | REQ-19 |
| **5** | Clinical Overview Analytics & Cohort Filtering | Queued | 0/2 | REQ-20 |
| **6** | Milk Withholding Reminders & Alert System | Queued | 0/2 | REQ-21 |
| **7** | Capacitor Native Android Packaging & Hardware | Queued | 0/2 | REQ-22 |
