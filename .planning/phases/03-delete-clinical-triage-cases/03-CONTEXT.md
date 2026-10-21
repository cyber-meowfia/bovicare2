# Phase 3: Clinical Triage Case Deletion & Lifecycle Management — Context

**Gathered:** 2026-10-21  
**Status:** Ready for planning  

## Phase Boundary

Deliver safe, guarded clinical triage case deletion across both the Farmer and Veterinarian portals, utilizing a soft-delete architecture (`deleted_at = NOW()`) that preserves auditability and food safety governance while immediately removing deleted cases from active queues, patient selectors, and clinical lists.

## Implementation Decisions

### 1. Deletion Behavior & Architecture
- **Soft Delete Mechanism:** When a case is deleted, set `deleted_at = NOW()` in `public.mastitis_cases` and filter `deleted_at IS NULL` from active client state and queries.
- **Immediate Reactive UI:** Case is immediately pruned from `casesList`, updating:
  - Farmer Profile: "📋 Your Consultation Requests & Vet Prescriptions" list.
  - Farmer Home / Quick Action Rail: `renderRailCases()`.
  - Vet Clinical Triage Queue: `renderVetCasesQueue()` (`tabTriage`).
  - Vet Clinical Overview Consultation Workspace: `renderClinicalCaseWorkspace()`, selector dropdown `#clinicalActiveCaseSelect`, and KPI counters.
  - Cow Health History: case history in `modalCowDetails`.
- **Database Migration:** Create local versioned SQL migration `20261021000002_soft_delete_clinical_cases.sql` adding `deleted_at TIMESTAMPTZ` to `public.mastitis_cases`, index `idx_cases_active` on `(farm_id, deleted_at) WHERE deleted_at IS NULL`, and RLS policy permitting farmers to soft-delete their own open cases and vets to soft-delete assigned cases.

### 2. Guarded Deletion Scope & Permissions
- **Farmer Restrictions:** Farmers may only delete cases that are still in `open` / pending status without an active prescription (`treatmentPlan` is null). Once a vet has prescribed medication or active milk withholding is in effect, farmers cannot delete the case (preventing accidental food safety violations).
- **Veterinarian Scope:** Field veterinarians have professional clinical discretion to remove or dismiss triage cases directly from their clinical queue, review modal, or consultation workspace.
- **Safety Feedback:** If a farmer attempts to delete a prescribed case, display an informative toast: *"Cases with active prescriptions or mandatory milk withholding cannot be deleted."*

### 3. UI Placement & Confirmation Safeguards
- **Farmer Portal:**
  - Red styled "Delete Request" / "✕" action button on eligible open case cards in the Farmer Profile consultation list (`cows-grid`).
- **Veterinarian Portal:**
  - Case Cards in `tabTriage` queue: "Dismiss / Delete" action button alongside "Review Patient".
  - Clinical Consultation Workspace (`tabClinicalOverview`): "Delete Case" button in the case actions / summary bar next to "Admit Patient" / "Save Notes".
  - Review Modal (`modalVetReview`): "Delete / Dismiss Case" option with danger styling.
- **Confirmation Prompt:** All delete triggers show a clear confirmation prompt indicating the Case ID and Cow Name before executing (`"Are you sure you want to remove triage case [Case ID] for [Cow Name]?"`).

### 4. Trilingual Localization
- All delete buttons, confirmation messages, and success toasts localized in English, Marathi, and Hindi via `I18N`.

## Code Context

- `app.js`: `casesList`, `renderVetCasesQueue()`, `renderClinicalCaseWorkspace()`, `renderProfileView()`, `renderRailCases()`.
- `index.html`: `tabTriage` queue cards, `tabClinicalOverview` workspace, `modalVetReview`.
- `supabase/migrations/`: `public.mastitis_cases` table and RLS policies.
- `smoke_test.js`: Add Test Suite 37 validating soft-delete filtering, farmer guardrails, vet deletion permissions, and trilingual I18N.

---
*Phase: 03-delete-clinical-triage-cases*  
*Context gathered: 2026-10-21*
