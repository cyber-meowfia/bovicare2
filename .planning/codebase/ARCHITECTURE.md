# Architecture

**Pattern:** Hybrid Single-Page Application (SPA) & Progressive Web App (PWA) wrapped with Capacitor for Android native packaging, backed by cloud-native Backend-as-a-Service (Supabase PostgreSQL + Storage + Auth + RLS), supported by a zero-dependency local Node.js server with Bhashini translation proxying and multi-language Indic localization (English, Marathi, and Hindi). A parallel Flutter codebase (`bovicare-main/`) serves as a mobile prototype and UI reference.

## Component Map

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CLIENT TIER                               │
│                                                                        │
│  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │
│  │   Landing Page (Web)    │  │       Dedicated Auth Portal         │  │
│  │      landing.html       │  │             login.html              │  │
│  │   3D Cow & AI Scanner   │  │    Farmer vs Vet Role Selector      │  │
│  │   (EN / MR / HI picker) │  │       (EN / MR / HI picker)         │  │
│  └───────────┬─────────────┘  └──────────────────┬──────────────────┘  │
│              │                                   │                     │
│              └─────────────────┬─────────────────┘                     │
│                                │                                       │
│                                ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Main Application Dashboard (index.html)              │  │
│  │                                                                  │  │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────────┐  │  │
│  │  │   Tab 0: Home   │ │Tab 1: Cattle Hub│ │Tab 2: Health Assess│  │  │
│  │  │ Hero & Actions  │ │ Catalog/Search  │ │ CMT / Temp / WebP  │  │  │
│  │  │ (Farmer View)   │ │ Ind./Murrah Buf │ │ Full Page Scroll   │  │  │
│  │  └─────────────────┘ └─────────────────┘ └────────────────────┘  │  │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌────────────────────┐  │  │
│  │  │ Tab 3: Records  │ │Tab 4: Vet Triage│ │Tab 5: Clinical Ov. │  │  │
│  │  │Timeline/Withdraw│ │ Priority Queue  │ │ 4-Q Heatmap / SCC  │  │  │
│  │  └─────────────────┘ └─────────────────┘ └────────────────────┘  │  │
│  │                                                                  │  │
│  │  ┌────────────────────────────────────────────────────────────┐  │  │
│  │  │  UI Shell: Gemini Icon Rail + Cleaned Header (No Role Badges│  │  │
│  │  │  3-Language Segmented Switcher (English ⇄ Marathi ⇄ Hindi) │  │  │
│  │  │  Bhashini Speech Synthesis & Speech-to-Text Input          │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 │                                      │
│  ┌──────────────────────────────┴───────────────────────────────────┐  │
│  │             Administration Command Portal (admin.html)           │  │
│  │  - Master Auth Gate & RBAC Session Verification                  │  │
│  │  - Farmers, Vets, Livestock Population & Cases Telemetry         │  │
│  │  - Dedicated Multilingual Interface (EN / MR / HI)               │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 │                                      │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                 Client State & Adapter (app.js)                  │  │
│  │  - In-memory Reactive Stores (cows, casesList, recordsList)      │  │
│  │  - Client-side Canvas Image Compression (< 1MB WebP)             │  │
│  │  - Signed URL In-Memory Cache (50-min TTL Expiration)            │  │
│  │  - Centralized I18N Dictionary (English, Marathi & Hindi)        │  │
│  │  - Bhashini Client Translation & Speech Recognition Adapters     │  │
│  │  - Role Routing & Offline Fallback Demo Engine                   │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
          ┌───────────────────────┴───────────────────────┐
          │ HTTP / Static Assets & Bhashini API           │ Supabase JS SDK (PostgREST / Auth / Storage)
          ▼                                               ▼
┌───────────────────────────────┐     ┌──────────────────────────────────────────────────┐
│          SERVER TIER          │     │                CLOUD BACKEND TIER                │
│                               │     │               (Supabase Free Tier)               │
│  server.js (Node.js)          │     │                                                  │
│  - Zero-dependency HTTP       │     │  ┌────────────────────────────────────────────┐  │
│  - Static Asset Delivery      │     │  │ PostgreSQL 15 Database (RLS Enforced)      │  │
│  - Dynamic Runtime Injection  │     │  │ - profiles, farms, farm_members            │  │
│    (/env-config.js)           │     │  │ - cows, health_records, mastitis_cases     │  │
│  - Bhashini Translation Proxy │     │  │ - diagnoses, treatment_plans, udder_images │  │
│    (/api/bhashini/config)     │     │  │ - admin_audit_logs, system_telemetry       │  │
│    (/api/bhashini/translate)  │     │  └────────────────────────────────────────────┘  │
│  - Local AI Screening Hook    │     │  ┌────────────────────────────────────────────┐  │
│    (/api/ai-screen)           │     │  │ Encrypted Private Object Storage           │  │
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
- **Purpose:** Delivers mobile-first, responsive, and aesthetically refined interfaces with trilingual support (English, Marathi, Hindi) and role-tailored workflows.
- **Location:** Workspace root
- **Key Files:**
  - `landing.html` & `landing.css` & `landing.js` — Presentation landing page featuring animated 3D CSS cow, audio moo synthesis, clinical AI scan HUD, and 3-language selector.
  - `login.html` & `login.css` & `login.js` — Dedicated authentication portal with role dropdown (Farmer vs Vet), password visibility toggle, demo autofill, and trilingual localization.
  - `admin.html` & `admin.css` & `admin.js` — Secure Admin Command Center for database administrators with live telemetry, user tables, and multi-language controls.
  - `index.html` & `styles.css` — Core application dashboard incorporating the Gemini-style icon rail, top nav brand bar, tab switching, and interactive modal dialogs.

### 2. Client Application & Business Logic Layer
- **Purpose:** Manages in-memory state, clinical vitals validation, image compression, offline fallback logic, trilingual localization, and cloud synchronization.
- **Location:** Workspace root
- **Key Files:**
  - `app.js` — Primary controller (3000+ LOC) orchestrating:
    - Tab navigation (`switchTab`)
    - Trilingual localization (`applyLanguage`, `setAppLanguage`, `cycleLanguage`) for English, Marathi, and Hindi
    - Speech synthesis guide (`readAssessmentGuideAloud`) and Speech recognition voice input (`toggleSpeechRecognitionFor`)
    - Cattle search and status filtering (`renderCowsView`, `handleCowSearch`)
    - Clinical assessment form with body temperature, 4-quarter selection, and CMT scoring (`submitAssessment`)
    - Client-side WebP canvas downsampling (`compressImageToWebP`)
    - In-memory signed URL cache management (`signedUrlCache`, `getSignedUdderImageUrl`)
    - Veterinary evaluation modal and prescription submission (`openVetReviewModal`, `submitVetDiagnosis`)
    - Clinical Overview dashboard (`renderClinicalOverviewDashboard`) with 4-quarter heatmap and Somatic Cell Count benchmarks
    - Live Supabase cloud synchronization (`initCloudBackend`, `loadBackendData`)
  - `env-config.js` — Static runtime fallback for Supabase credentials.
  - `supabase-config.js` — Centralized initialization wrapper for `@supabase/supabase-js`, farm provisioning (`ensureActiveFarm`), and session detection.

### 3. Server & Runtime Config Layer
- **Purpose:** Provides a lightweight, zero-dependency Node.js HTTP server for local development, production hosting, runtime config injection, and Bhashini API proxying.
- **Location:** Workspace root
- **Key Files:**
  - `server.js` — Native Node.js HTTP server. Reads `.env` on boot, serves `/env-config.js` dynamically without baking secrets, provides Bhashini proxies (`/api/bhashini/config` and `/api/bhashini/translate`), and maps clean route aliases (`/`, `/landing`, `/login`, `/admin`, `/app`).

### 4. Database & Storage Layer (Supabase BaaS)
- **Purpose:** Production-ready PostgreSQL schema with Row Level Security (RLS) and encrypted object storage for clinical udder imagery.
- **Location:** `supabase/migrations/`
- **Key Files:**
  - `20261018000000_core_bovicare_schema.sql` — PostgreSQL 15 schema declaring 8 enums, 11 core tables (`profiles`, `farms`, `farm_members`, `cows`, `health_records`, `mastitis_cases`, `udder_images`, `screening_results`, `diagnoses`, `consultations`, `treatment_plans`, `follow_ups`), lean foreign key indexes, and the `prevent_role_self_escalation` security trigger.
  - `20261018000001_storage_buckets_and_policies.sql` — Dual private storage buckets (`bovicare-private-images`, `udder-images`) capped at 1MB per file, restricted to authenticated farm members and licensed veterinarians via signed URLs.
  - `20261020000000_admin_portal_rls.sql` — Administrator RBAC schema, audit telemetry table, and elevated access verification policies.
  - `20261020000001_enforce_role_route_protection.sql` — Strict role-to-route protection for Farmer vs. Veterinarian.

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
  - `smoke_test.js` — Comprehensive 29-suite automated test suite covering clinical math, RLS policies, DOM cleanliness, multi-language Marathi & Hindi translations, Admin portal, and route security. Run via `npm test`.

---

## Existing Capabilities (Validated Requirements)

1. ✓ **Clinical Bovine Rectal Temperature Validation**: Validates physiologic ranges (38.0–39.2°C normal, >39.2°C fever, <38.0°C subnormal) — `app.js`, `smoke_test.js`
2. ✓ **California Mastitis Test (CMT) & Symptom Scoring**: Formats and evaluates CMT reactions (Negative, Trace, 1+, 2+, 3+) and abnormal milk/udder symptoms — `app.js`, `smoke_test.js`
3. ✓ **4-Quarter Udder Localization**: Tracks quarters separately: Left Front (LF), Right Front (RF), Left Rear (LR), Right Rear (RR), or ALL — `app.js`, `supabase/migrations/`
4. ✓ **Client-Side WebP Image Downsampling**: Converts camera photos in-browser to WebP format under 1MB to respect Supabase free-tier storage quotas — `app.js`, `smoke_test.js`
5. ✓ **Dual-Bucket Cloud Storage & In-Memory Signed URL Cache**: Transparent fallback between `bovicare-private-images` and `udder-images` with 50-minute TTL caching — `app.js`, `smoke_test.js`, `supabase/migrations/`
6. ✓ **Trilingual Localization (English, Marathi & Hindi)**: Dynamic translation across UI text, clinical forms, status badges, and dashboards with persistent language storage — `app.js`, `landing.js`, `login.js`, `admin.js`, `smoke_test.js`
7. ✓ **Bhashini Indian Language Mission Proxy & Voice Input**: Server-side proxy for Dhruva translation APIs and client-side speech-to-text / text-to-speech voice assistant — `server.js`, `app.js`
8. ✓ **Cattle Herd Catalog & Multi-Attribute Search**: Live filtering by cow name, tag number, breed, and health status (Healthy vs To Monitor) — `app.js`, `smoke_test.js`
9. ✓ **Species Classification (Cow vs Buffalo)**: Detects indigenous cows vs Murrah/Nili-Ravi buffaloes for tailored parameters — `smoke_test.js`, `admin.js`
10. ✓ **Add Livestock Modal & Udder Photo Upload**: Farmer workflow to register new animals with lactation status, daily milk yield, and profile picture — `app.js`, `index.html`
11. ✓ **Role-Based Experience (Dairy Farmer vs Veterinarian)**:
    - **Farmer Mode**: Herd health overview, milk yield tracking, fast triage submission, withdrawal countdowns — `app.js`
    - **Veterinary Clinical Portal**: Priority triage queue, clinical evaluation modal, prescription issuance — `app.js`, `smoke_test.js`
12. ✓ **Removal of Active Role Badges from Dashboards**: Active role badges removed from dashboard headers and sidebars without weakening RLS or authentication — `index.html`, `app.js`, `styles.css`, `smoke_test.js`
13. ✓ **Full Vertical Scrolling for Assessment Form**: Unrestricted scrolling across desktop and mobile screens with generous bottom clearance for actions and on-screen keyboards — `index.html`, `styles.css`
14. ✓ **Cleaned Up Clinical Overview & Epidemiology Dashboard**: 4-quarter heatmap, Somatic Cell Count (SCC) tiers, and Food Safety Antibiotic Withholding Shield — `index.html`, `app.js`, `smoke_test.js`
15. ✓ **Clinical Triage Admission Workflow**: Modal enabling instant triage case creation with quarter mapping, symptoms, and photographic evidence — `app.js`
16. ✓ **Veterinary Prescriptions & Mandatory Withdrawal Holds**: Issues medication protocols with food safety milk (hours) and meat (days) withholding periods — `app.js`, `smoke_test.js`
17. ✓ **Interactive Landing Page**: Modern presentation website with 3D animated cow, audio moo synthesis, and AI scanner HUD — `landing.html`, `landing.js`
18. ✓ **Dedicated Authentication Portal**: Standalone login with role selection, demo autofill, and Supabase Auth integration — `login.html`, `login.js`
19. ✓ **Secure Administration Portal**: Master administrator gate, system governance, livestock population overview, and triage telemetry — `admin.html`, `admin.js`, `admin.css`, `supabase/migrations/`
20. ✓ **Strict Role-to-Route Authorization**: Role switching removed from main dashboard; strict route protections enforced — `app.js`, `login.js`, `smoke_test.js`
21. ✓ **Offline Demo Mode Graceful Fallback**: App remains fully interactive with mock data when Supabase credentials or network connection are unavailable — `app.js`, `login.js`, `admin.js`
22. ✓ **Automated 29-Suite Smoke Test Harness**: Zero-dependency test runner ensuring zero regressions across all core features — `smoke_test.js`

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
  - Devanagari Support: Standard Devanagari Unicode glyph support with line wrapping preservation
- **File Naming:**
  - Web assets: lower-case with hyphens or underscores (`supabase-config.js`, `landing.css`, `smoke_test.js`).
  - Database migrations: `YYYYMMDDHHMMSS_description.sql`.
- **Component & CSS Structure:**
  - Responsive flexbox/grid containers with card elevation and smooth micro-animations.
  - CSS custom properties (`:root`) for color tokens, border radius, and spacing.
  - Clean separation between presentation styles (`styles.css`, `landing.css`, `login.css`, `admin.css`) and DOM controllers.
- **State & Cloud Sync:**
  - State variables are updated optimistically in memory, then asynchronously synchronized to Supabase tables.
  - Public anon key is the only credential exposed to the browser; all backend access is protected via PostgreSQL RLS.
  - Server-side proxy for third-party services like Bhashini to prevent API secret leaks.
- **Testing Approach:**
  - Automated smoke tests in `smoke_test.js` executed via `npm test`. All new clinical logic and DOM endpoints must have assertions added to this suite.

---

## Patterns to Follow

1. **Strict 1MB Storage & WebP Pre-Processing:** Never upload raw image files directly to Supabase storage. Always route through `compressImageToWebP(file, 1200, 1200, 0.8)` before uploading.
2. **Dual-Bucket Fallback Pattern:** When resolving storage paths, query `BOVICARE_STORAGE_BUCKET` first, falling back to `FALLBACK_STORAGE_BUCKET` if not found.
3. **Signed URL TTL Caching:** Never create redundant signed URLs for the same asset. Utilize `signedUrlCache` with a 50-minute TTL.
4. **Trilingual Key Mapping:** When introducing new UI text, register English, Marathi, and Hindi translations in `I18N` (`app.js`), `LOGIN_I18N` (`login.js`), `LANDING_I18N` (`landing.js`), and `ADMIN_I18N` (`admin.js`).
5. **Secure Server Proxying for APIs:** Private API keys (such as Bhashini or AI services) must stay strictly server-side in `server.js` or environment variables; never expose them to frontend JavaScript.
6. **Graceful Offline Mode:** Ensure any new feature works seamlessly when `isSupabaseConfigured()` is false, maintaining in-memory lists so demo workflows never break.
