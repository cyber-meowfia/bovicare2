# Architecture

**Pattern:** Hybrid Single-Page Application (SPA) & Progressive Web App (PWA) wrapped with Capacitor for Android native packaging, backed by a cloud-native Backend-as-a-Service (Supabase PostgreSQL + Storage + Auth + RLS), supported by a zero-dependency local Node.js server. A parallel Flutter codebase (`bovicare-main/`) serves as a mobile prototype and UI reference.

## Component Map

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                               │
│                                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │   Landing Page (Web)    │  │       Dedicated Auth Portal         │  │
│  │      landing.html       │  │             login.html              │  │
│  │   3D Cow & AI Scanner   │  │    Farmer vs Vet Role Selector      │  │
│  └───────────┬─────────────┘  └──────────────────┬──────────────────┘  │
│              │                                   │                     │
│              └─────────────────┬─────────────────┘                     │
│                                ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Main Application Dashboard (index.html)              │  │
│  │                                                                  │  │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────────┐  │  │
│  │  │   Tab 0: Home   │ │Tab 1: Cattle Hub│ │Tab 2: Health Assess│  │  │
│  │  │ Hero & Actions  │ │ Catalog/Search  │ │ CMT / Temp / WebP  │  │  │
│  │  └─────────────────┘ └─────────────────┘ └────────────────────┘  │  │
│  │  ┌─────────────────┐ ┌────────────────────────────────────────┐  │  │
│  │  │ Tab 3: Records  │ │Tab 4: Role-Based Clinical/Farm Portal  │  │  │
│  │  │Timeline/Withdraw│ │Farmer Overview  vs. Vet Triage Command │  │  │
│  │  └─────────────────┘ └────────────────────────────────────────┘  │  │
│  │                                                                  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │  Shared UI Shell: Gemini Icon Rail + Top Nav + Modals      │  │  │
│  │  │  Bilingual Translation Engine (English ⇄ Marathi)          │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 │                                      │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                 Client State & Adapter (app.js)                  │  │
│  │  - In-memory Reactive Stores (cows, casesList, recordsList)      │  │
│  │  - Client-side Canvas Image Compression (< 1MB WebP)             │  │
│  │  - Signed URL In-Memory Cache (TTL Expiration)                   │  │
│  │  - Role Routing & Offline Fallback Demo Engine                   │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
          ┌───────────────────────┴───────────────────────┐
          │ HTTP / Static Assets                          │ Supabase JS SDK (PostgREST / Auth / Storage)
          ▼                                               ▼
┌───────────────────────────────┐     ┌──────────────────────────────────────────────────┐
│          SERVER TIER          │     │                CLOUD BACKEND TIER                │
│                               │     │               (Supabase Free Tier)               │
│  server.js (Node.js)          │     │                                                  │
│  - Zero-dependency HTTP       │     │  ┌────────────────────────────────────────────┐  │
│  - Static Asset Delivery      │     │  │ PostgreSQL 15 Database (RLS Enforced)      │  │
│  - Dynamic Runtime Injection  │     │  │ - profiles, farms, farm_members            │  │
│    (/env-config.js)           │     │  │ - cows, health_records, mastitis_cases     │  │
│                               │     │  │ - diagnoses, treatment_plans, udder_images │  │
│                               │     │  │ - screening_results (staged pipeline)      │  │
│                               │     │  └────────────────────────────────────────────┘  │
│                               │     │  ┌────────────────────────────────────────────┐  │
│                               │     │  │ Encrypted Private Object Storage           │  │
│                               │     │  │ - bovicare-private-images (primary)        │  │
│                               │     │  │ - udder-images (fallback)                  │  │
│                               │     │  │ - Signed URL access only (1MB max per file)│  │
│                               │     │  └────────────────────────────────────────────┘  │
│                               │     │  ┌────────────────────────────────────────────┐  │
│                               │     │  │ Supabase Auth & JWT Verification           │  │
│                               │     │  │ Role escalation prevention trigger         │  │
│                               │     │  └────────────────────────────────────────────┘  │
└───────────────────────────────┘     └──────────────────────────────────────────────────┘
```

## Layers

### 1. Presentation Layer (UI & Markup)
- **Purpose:** Delivers mobile-first, responsive, and aesthetically refined interfaces with bilingual support and role-tailored workflows.
- **Location:** Workspace root
- **Key Files:**
  - `landing.html` & `landing.css` & `landing.js` — Presentation landing page featuring animated 3D CSS cow, audio moo synthesis, clinical AI scan HUD, and video flow.
  - `login.html` & `login.css` & `login.js` — Dedicated authentication portal with role dropdown (Farmer vs Vet), password visibility toggle, demo autofill, and redirection.
  - `index.html` & `styles.css` — Core application dashboard incorporating the Gemini-style icon rail, top nav brand bar, tab switching, and interactive modal dialogs.

### 2. Client Application & Business Logic Layer
- **Purpose:** Manages in-memory state, clinical vitals validation, image compression, offline fallback logic, and cloud synchronization.
- **Location:** Workspace root
- **Key Files:**
  - `app.js` — Primary controller (2400+ LOC) orchestrating:
    - Tab navigation (`switchTab`)
    - Bilingual Marathi translation (`applyLanguage`, `toggleLanguage`)
    - Cattle search and status filtering (`renderCowsView`, `handleCowSearch`)
    - Clinical assessment form with body temperature & CMT scoring (`submitAssessment`)
    - Client-side WebP canvas downsampling (`compressImageToWebP`)
    - In-memory signed URL cache management (`signedUrlCache`, `getSignedUdderImageUrl`)
    - Veterinary evaluation modal and prescription submission (`openVetReviewModal`, `submitVetDiagnosis`)
    - Dual role switching (`setRole`, `renderProfileView`, `renderVetPortalHome`)
    - Live Supabase cloud synchronization (`initCloudBackend`, `loadBackendData`)
  - `env-config.js` — Static runtime fallback for Supabase credentials.
  - `supabase-config.js` — Centralized initialization wrapper for `@supabase/supabase-js`, farm provisioning (`ensureActiveFarm`), and session detection.

### 3. Server & Runtime Config Layer
- **Purpose:** Provides a lightweight, zero-dependency Node.js HTTP server for local development, production hosting, and runtime config injection.
- **Location:** Workspace root
- **Key Files:**
  - `server.js` — Native Node.js HTTP server. Reads `.env` on boot, serves `/env-config.js` dynamically without baking secrets, and provides clean route mapping (`/`, `/landing`, `/login`, `/app`).

### 4. Database & Storage Layer (Supabase BaaS)
- **Purpose:** Production-ready PostgreSQL schema with Row Level Security (RLS) and encrypted object storage for clinical udder imagery.
- **Location:** `supabase/migrations/`
- **Key Files:**
  - `20261018000000_core_bovicare_schema.sql` — PostgreSQL 15 schema declaring 8 enums, 11 core tables (`profiles`, `farms`, `farm_members`, `cows`, `health_records`, `mastitis_cases`, `udder_images`, `screening_results`, `diagnoses`, `consultations`, `treatment_plans`, `follow_ups`), lean foreign key indexes, and the `prevent_role_self_escalation` security trigger.
  - `20261018000001_storage_buckets_and_policies.sql` — Dual private storage buckets (`bovicare-private-images`, `udder-images`) capped at 1MB per file, restricted to authenticated farm members and licensed veterinarians via signed URLs.

### 5. Native Mobile Wrapper & Reference Implementation
- **Purpose:** Android native packaging via Capacitor, and Flutter mobile reference implementation.
- **Location:** Root & `bovicare-main/`
- **Key Files:**
  - `capacitor.config.json` — Android configuration (`com.bovicare.app`) with Camera & Photo permissions.
  - `bovicare-main/lib/main.dart` — Flutter prototype containing original UI tokens, layout patterns, and color palettes.

### 6. Testing & Quality Assurance
- **Purpose:** Regression safety and clinical correctness verification.
- **Location:** Workspace root
- **Key Files:**
  - `smoke_test.js` — Comprehensive 26-suite automated test suite covering clinical math, RLS policies, DOM cleanliness, and translations. Run via `npm test`.

---

## Existing Capabilities (Validated Requirements)

- ✓ **Clinical Bovine Rectal Temperature Validation**: Validates physiologic ranges (38.0–39.2°C normal, >39.2°C fever, <38.0°C subnormal) — `app.js`, `smoke_test.js`
- ✓ **California Mastitis Test (CMT) & Symptom Scoring**: Formats and evaluates CMT reactions (Negative, Trace, 1+, 2+, 3+) and abnormal milk/udder symptoms — `app.js`, `smoke_test.js`
- ✓ **4-Quarter Udder Localization**: Tracks quarters separately: Left Front (LF), Right Front (RF), Left Rear (LR), Right Rear (RR), or ALL — `app.js`, `supabase/migrations/`
- ✓ **Client-Side WebP Image Downsampling**: Converts camera photos in-browser to WebP format under 1MB to respect Supabase free-tier storage quotas — `app.js`, `smoke_test.js`
- ✓ **Dual-Bucket Cloud Storage & In-Memory Signed URL Cache**: Transparent fallback between `bovicare-private-images` and `udder-images` with 50-minute TTL caching — `app.js`, `smoke_test.js`, `supabase/migrations/`
- ✓ **Bilingual Marathi & English Localization**: Seamless dynamic translation across UI text, clinical advice, and cattle status — `app.js`, `smoke_test.js`
- ✓ **Cattle Herd Catalog & Multi-Attribute Search**: Live filtering by cow name, tag number, breed, and health status (Healthy vs To Monitor) — `app.js`, `smoke_test.js`
- ✓ **Species Classification (Cow vs Buffalo)**: Detects indigenous cows vs Murrah/Nili-Ravi buffaloes for tailored parameters — `smoke_test.js`
- ✓ **Add Livestock Modal & Udder Photo Upload**: Farmer workflow to register new animals with lactation status, daily milk yield, and profile picture — `app.js`, `index.html`
- ✓ **Role-Based Experience (Dairy Farmer vs Veterinarian)**:
  - **Farmer Mode**: Herd health overview, milk yield tracking, fast triage submission, withdrawal countdowns — `app.js`
  - **Veterinary Clinical Portal**: Priority triage queue, clinical evaluation modal, prescription issuance — `app.js`, `smoke_test.js`
- ✓ **Clinical Triage Admission Workflow**: Modal enabling instant triage case creation with quarter mapping, symptoms, and photographic evidence — `app.js`
- ✓ **Veterinary Prescriptions & Mandatory Withdrawal Holds**: Issues medication protocols with food safety milk (hours) and meat (days) withholding periods — `app.js`, `smoke_test.js`
- ✓ **Interactive Landing Page**: Modern presentation website with 3D animated cow, audio moo synthesis, and AI scanner HUD — `landing.html`, `landing.js`
- ✓ **Dedicated Authentication Portal**: Standalone login with role selection, demo autofill, and Supabase Auth integration — `login.html`, `login.js`
- ✓ **Offline Demo Mode Graceful Fallback**: App remains fully interactive with mock data when Supabase credentials or network connection are unavailable — `app.js`, `login.js`
- ✓ **Automated 26-Suite Smoke Test Harness**: Zero-dependency test runner ensuring zero regressions across all core features — `smoke_test.js`

---

## Conventions

- **Design System & Palette:**
  - Primary Forest: `#176B45` (`var(--forest)`)
  - Accent Green: `#238653` (`var(--green)`)
  - Background Cream: `#F8F7F0` (`var(--cream)`)
  - Text Ink: `#20352A` (`var(--ink)`)
  - Muted Text: `#77857A` (`var(--muted)`)
- **Typography:**
  - Primary UI Font: `Plus Jakarta Sans`, sans-serif
  - Brand Accent / Handwritten Font: `Caveat`, cursive
- **File Naming:**
  - Web assets: lower-case with hyphens or underscores (`supabase-config.js`, `landing.css`, `smoke_test.js`).
  - Database migrations: `YYYYMMDDHHMMSS_description.sql`.
- **Component & CSS Structure:**
  - Responsive flexbox/grid containers with card elevation and smooth micro-animations.
  - CSS custom properties (`:root`) for color tokens, border radius, and spacing.
  - Clean separation between presentation styles (`styles.css`, `landing.css`, `login.css`) and DOM controllers.
- **State & Cloud Sync:**
  - State variables are updated optimistically in memory, then asynchronously synchronized to Supabase tables.
  - Public anon key is the only credential exposed to the browser; all backend access is protected via PostgreSQL RLS.
- **Testing Approach:**
  - Automated smoke tests in `smoke_test.js` executed via `npm test`. All new clinical logic and DOM endpoints must have assertions added to this suite.

---

## Patterns to Follow

1. **Strict 1MB Storage & WebP Pre-Processing:** Never upload raw image files directly to Supabase storage. Always route through `compressImageToWebP(file, 1200, 1200, 0.8)` before uploading.
2. **Dual-Bucket Fallback Pattern:** When resolving storage paths, query `BOVICARE_STORAGE_BUCKET` first, falling back to `FALLBACK_STORAGE_BUCKET` if not found.
3. **Signed URL TTL Caching:** Never create redundant signed URLs for the same asset. Utilize `signedUrlCache` with a 50-minute TTL.
4. **Bilingual Key Mapping:** When introducing new UI text or labels, register both English and Marathi translations in `marathiDict` within `app.js`.
5. **Role-Aware DOM Segregation:** Maintain clear visual and functional distinction between Farmer workflows and Veterinary Clinical workflows (`activeRole === 'vet'` vs `'farmer'`).
6. **Graceful Offline Mode:** Ensure any new feature works seamlessly when `isSupabaseConfigured()` is false, maintaining in-memory lists so demo workflows never break.
