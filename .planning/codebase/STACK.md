# Codebase Stack

**Language:** JavaScript (ES6+ Node.js & Browser Vanilla JS), SQL (PostgreSQL 15+), Dart (Flutter 3.13+)  
**Runtime:** Node.js (v18+ / v20+), Browser (Modern evergreen browsers, Chromium/WebKit), Android (via Capacitor)  
**Framework:** Vanilla JS / HTML5 / CSS3 SPA (Web & Hybrid Mobile), Capacitor 5+, Flutter (UI Reference)

## Dependencies

### Core Production Dependencies
- **Node.js Built-ins** (`http`, `https`, `fs`, `path`, `crypto`, `assert`) — Zero-dependency local dev static server, Bhashini translation proxy, and smoke test runner.
- **@supabase/supabase-js@2** (CDN runtime: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`) — Supabase client for PostgreSQL queries, Authentication, Realtime, and Private Object Storage with signed URLs.
- **Bhashini Indian Language API Proxy** — Node.js backend proxy connecting to National Language Translation Mission Dhruva pipeline (`dhruva-api.bhashini.gov.in`) for secure Marathi & Hindi translation without exposing API keys to the browser.
- **Web Speech API & SpeechSynthesis** — Native browser speech-to-text recognition and text-to-speech voice assistant for rural farmers in Marathi (`mr-IN`), Hindi (`hi-IN`), and English (`en-IN`).
- **Google Fonts** (`Plus Jakarta Sans`, `Caveat`) — Modern typography loaded via CDN with native Devanagari Unicode support.

### Mobile & Hybrid Tooling
- **@capacitor/cli** (npx invocation) — Hybrid Android native app wrapper.
- **Flutter SDK** (`^3.13.5`) / `cupertino_icons: ^1.0.8` (in `bovicare-main/`) — Mobile native prototype and design specification reference.

### Dev & Testing Dependencies
- **Node.js Test Runner** (`smoke_test.js`) — Zero-dependency test harness containing 29 comprehensive test suites validating clinical vitals, RLS, signed URLs, multi-language Marathi/Hindi translations, Admin RBAC, and DOM integrity.
- **flutter_lints: ^6.0.0** — Dart linting rules for the Flutter reference package.

## Configuration & Environment

- **Local Server:** `server.js` (Lightweight, zero-dependency HTTP server with dynamic `/env-config.js` publishable runtime injection, Bhashini endpoints `/api/bhashini/config` & `/api/bhashini/translate`, and clean route mapping `/`, `/landing`, `/login`, `/admin`, `/app`).
- **Environment Management:** `.env` (loaded automatically by `server.js` from `.env.example`).
  - `SUPABASE_URL` — Supabase project reference URL.
  - `SUPABASE_ANON_KEY` — Publishable anon public key.
  - `BOVICARE_STORAGE_BUCKET` — Storage bucket (`bovicare-private-images` with `udder-images` fallback).
  - `BHASHINI_API_KEY` & `BHASHINI_USER_ID` — (Optional) Bhashini National Language Mission credentials.
- **Database Migrations:** `supabase/migrations/`
  - `20261018000000_core_bovicare_schema.sql` (Tables, enums, triggers, RLS policies).
  - `20261018000001_storage_buckets_and_policies.sql` (Storage buckets, upload/read policies, 1MB cap).
  - `20261020000000_admin_portal_rls.sql` (Admin portal RBAC schema, administrator verification, and audit logs).
  - `20261020000001_enforce_role_route_protection.sql` (Strict role-to-route protection for Farmer vs. Veterinarian).
- **Mobile Container:** `capacitor.config.json`
  - App ID: `com.bovicare.app`
  - App Name: `BoviCare`
  - Web Dir: `.`
  - Permissions: Camera, Photos
- **Build / Dev Scripts:** Defined in `package.json`:
  - `npm start` / `npm run dev`: `node server.js`
  - `npm test`: `node smoke_test.js`
  - `npm run cap:add:android`: Add Android Capacitor platform
  - `npm run cap:sync`: Sync assets to Android
  - `npm run cap:open`: Launch Android Studio
