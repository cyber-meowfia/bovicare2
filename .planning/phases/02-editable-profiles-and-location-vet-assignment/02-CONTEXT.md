# Phase 2: Editable Farmer and Vet Profiles + Location-Based Vet Assignment — Context

**Gathered:** 2026-10-21  
**Status:** Ready for planning  

## Phase Boundary

Deliver editable profile and location management for authenticated farmers and veterinarians, accompanied by deterministic, location-based veterinary matching and strict privacy governance that prevents farmers from ever viewing assigned veterinarian identities.

## Implementation Decisions

### 1. Editable Farmer Profile & Farm Details
- **UI Interaction:** Unified modal (`modalEditFarmerProfile`) launched via a clearly visible "Edit Farm Profile" button on the Farmer profile card.
- **Fields Managed:** 
  - Personal: Full Name, Phone Number (stored in `public.profiles`).
  - Farm & Location: Farm Name, Location Address, Village/City, District, State, Postal PIN Code (stored in `public.farms`).
- **Validation & Feedback:** Prefilled with saved state, input validation for required fields, clear saving spinner and error/success toasts.
- **Role & Security Guards:** Farmers can only edit their own profile and owned farm records (`created_by = auth.uid()`). Strict prohibition against role changes or admin fields.
- **Location Change Trigger:** Updating farm location automatically triggers a reassessment of the assigned veterinarian.

### 2. Editable Veterinarian Location & Practice Details
- **UI Interaction:** Unified modal (`modalEditVetProfile`) launched via an "Edit Practice Location" button on the Veterinarian profile card.
- **Fields Managed:** 
  - Personal: Full Name, Emergency Phone Number.
  - Practice & Location: Clinic Affiliation, Practice Address, Village/City, District, State, Postal PIN Code, Service Jurisdiction (stored in `public.profiles`).
- **Role & Security Guards:** Vets may only update their own profile; `role`, `is_verified_vet`, and administrative fields are protected by existing database triggers (`trg_prevent_role_self_escalation`).

### 3. Location-Based Vet Matching Hierarchy & Case Routing
- **Hierarchical Tiered Match:**
  - **Tier 4 (Highest):** Exact matching Postal PIN Code.
  - **Tier 3:** Matching Village/City AND District.
  - **Tier 2:** Matching District.
  - **Tier 1:** Matching State.
  - **Tier 0:** No location overlap $\rightarrow$ "No suitable vet available for this location yet."
- **Eligibility Filter:** Only vets with `role = 'veterinarian'`, `is_verified_vet = TRUE`, and `is_active_vet = TRUE` are eligible.
- **Stability & Non-Churn:** If the currently assigned vet remains eligible and maintains the same or higher match tier, preserve current assignment without unnecessary churn.
- **Deterministic Tie-Breaker:** Earliest registration (`created_at ASC`), then lowest UUID (`id ASC`).
- **Assignment Persistence:** Persisted in `farms.assigned_vet_id` and automatically routed to new `mastitis_cases.assigned_vet_id`.
- **Database Architecture:** Encapsulated in a local SQL migration with stored procedure `public.recalculate_farm_vet_assignment(p_farm_id UUID)` and trigger on farm/vet location updates.

### 4. Absolute Farmer Vet Privacy Protection
- **No Identity Exposure:** The farmer-facing frontend must NEVER display assigned vet name, contact, clinic name, registration license, or photo.
- **Neutral Statuses:**
  - When assigned: *"Your case is being routed to an eligible veterinary professional."*
  - When unassigned: *"Veterinary assistance is not yet available for this location."*
- **Database & RLS Level Security:** Existing RLS policy `profiles_read` restricts farmers to only query their own user ID (`id = auth.uid()`), completely preventing farmers from discovering vet identities via network inspection or direct Supabase queries.
- **Full Vet Oversight:** Assigned vets retain complete access to evaluate and prescribe for their assigned cases.

### 5. UI, Localization & Free-Tier Compatibility
- **Trilingual Localization:** All new labels, modal placeholders, validation errors, and status messages localized in English, Marathi, and Hindi via `I18N`.
- **Zero Paid Dependencies:** Uses structured geographic text fields (Pincode, Village/City, District, State) for free, transparent, zero-cost matching without paid third-party geocoding APIs.
- **Zero Git Operations:** Work exclusively within local workspace without running git commands.

## Code Context

- [app.js](file:///Users/aryanmokal/Projects/bovicare/app.js): Profile rendering (`renderProfileView`), case workflows, and Supabase data synchronization.
- [index.html](file:///Users/aryanmokal/Projects/bovicare/index.html): Farmer and Vet profile sections, modal overlays, and action buttons.
- [styles.css](file:///Users/aryanmokal/Projects/bovicare/styles.css): Profile card styles, modal sheets, and status pill badges.
- [supabase/migrations/](file:///Users/aryanmokal/Projects/bovicare/supabase/migrations/): Core schema and RLS policies.
- [smoke_test.js](file:///Users/aryanmokal/Projects/bovicare/smoke_test.js): Verification test suite to be extended with new test suites.

---
*Phase: 02-editable-profiles-and-location-vet-assignment*  
*Context gathered: 2026-10-21*
