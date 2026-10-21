---
phase: 03-delete-clinical-triage-cases
status: passed
date: 2026-10-21
---

# Phase 03 Verification: Clinical Triage Case Deletion & Lifecycle Management

## Must-Haves Check

### Truths
- ✓ Deleted cases are soft-deleted with timestamp `deleted_at = NOW()` preserving historical logs and food safety withdrawal records — observable in `supabase/migrations/20261021000002_soft_delete_clinical_cases.sql` and `app.js:deleteCase`.
- ✓ Active queries filter out soft-deleted cases (`deleted_at IS NULL`) — verified in `app.js:loadBackendData` (`.is('deleted_at', null)`) and partial index `idx_cases_active`.
- ✓ Farmers can only delete open, unprescribed cases (`treatmentPlan` null) — verified in `app.js:deleteCase` rejecting deletion with reason `prescribed_guardrail` in automated Test Suite 37.
- ✓ Field veterinarians can delete/dismiss any triage case from clinical workspace, review modal, or queue — verified in `index.html`, `app.js`, and smoke tests.
- ✓ Case deletion requires confirmation prompt showing Case ID and Cow Name — verified in `app.js:deleteCase`.
- ✓ All deletion controls, prompts, and toasts are trilingual in English, Marathi, and Hindi — verified across all 5 keys in `I18N.en`, `I18N.mr`, and `I18N.hi`.

### Artifacts
- ✓ `supabase/migrations/20261021000002_soft_delete_clinical_cases.sql` — exists, defines column `deleted_at`, partial indexes, `soft_delete_case` stored procedure, and RLS policies.
- ✓ `index.html` — exists, defines `#btnDeleteClinicalCase` with danger styling in clinical workspace header.
- ✓ `app.js` — exists, exports `deleteCase`, `deleteActiveClinicalCase`, `casesList`, and handles in-memory and database pruning.
- ✓ `smoke_test.js` — exists, includes Test Suite 37 validating all 5 functional criteria.

### Key Links
- ✓ `#btnDeleteClinicalCase` in `index.html` → `deleteActiveClinicalCase()` in `app.js` → `deleteCase()` — pattern found and verified.
- ✓ Review modal `#btnModalDeleteCase` in `app.js` → `deleteCase(c.id, 'vet')` — pattern found.
- ✓ Farmer consultation card button `.btn-delete-case-farmer` in `app.js` → `deleteCase(c.id, 'farmer')` — pattern found.
- ✓ `deleteCase()` in `app.js` → `supabaseClient.rpc('soft_delete_case')` or `.update({ deleted_at })` — pattern found.

## Gaps Found
None.

## Human Verification Required
None required for core logic (fully covered by automated Suite 37 with 100% pass rate).
