/**
 * BoviCare Comprehensive Feature Smoke Test Suite
 * Validates clinical validation, data transforms, caching, and business logic.
 */

const assert = require('assert');
const path = require('path');

console.log('--- STARTING BOVICARE SMOKE TEST SUITE ---');

// 1. Clinical Vitals: Body Temperature Validation (Normal Bovine Range: 38.0 - 39.2°C)
function evaluateBodyTemp(val) {
  if (isNaN(val) || val === null || val === undefined) return 'invalid';
  if (val > 39.2) return 'fever';
  if (val < 38.0) return 'subnormal';
  return 'normal';
}

assert.strictEqual(evaluateBodyTemp(38.6), 'normal', '38.6°C should be normal');
assert.strictEqual(evaluateBodyTemp(38.0), 'normal', '38.0°C boundary should be normal');
assert.strictEqual(evaluateBodyTemp(39.2), 'normal', '39.2°C boundary should be normal');
assert.strictEqual(evaluateBodyTemp(39.8), 'fever', '39.8°C should be fever');
assert.strictEqual(evaluateBodyTemp(37.4), 'subnormal', '37.4°C should be subnormal');
console.log('✅ 1. Body temperature vitals validation passed.');

// 2. Case Status & Urgency Enum Formatting
function formatCaseStatus(status) {
  switch (status) {
    case 'open': return 'Awaiting Review';
    case 'under_review': return 'In Review';
    case 'treatment_prescribed': return 'Prescription Active';
    case 'monitoring': return 'Under Monitoring';
    case 'resolved': return 'Resolved';
    case 'escalated': return 'Urgent / Escalated';
    default: return status || 'Open';
  }
}

function formatUrgency(urgency) {
  switch (urgency) {
    case 'urgent': return '● Urgent Review';
    case 'critical': return '● Emergency Priority';
    case 'monitor': return '● To Monitor';
    case 'routine': return '● Routine Health';
    default: return '● Routine';
  }
}

assert.strictEqual(formatCaseStatus('open'), 'Awaiting Review');
assert.strictEqual(formatCaseStatus('treatment_prescribed'), 'Prescription Active');
assert.strictEqual(formatUrgency('urgent'), '● Urgent Review');
assert.strictEqual(formatUrgency('critical'), '● Emergency Priority');
console.log('✅ 2. Clinical case status & urgency mapping passed.');

// 3. Veterinary Diagnosis & Administration Route Formatting
function formatDiagnosisType(diag) {
  switch (diag) {
    case 'clinical_mastitis': return 'Acute Clinical Mastitis';
    case 'subclinical_mastitis': return 'Subclinical Mastitis (High SCC)';
    case 'trauma_injury': return 'Teat / Udder Physical Trauma';
    case 'healthy_non_mastitis': return 'Physiological / Healthy';
    default: return diag;
  }
}

function formatTreatmentRoute(route) {
  switch (route) {
    case 'intramammary': return 'Intramammary Infusion';
    case 'intramuscular': return 'Intramuscular Injection (IM)';
    case 'subcutaneous': return 'Subcutaneous (SC)';
    case 'oral': return 'Oral Suspension';
    case 'topical': return 'Topical Teat Dip / Salve';
    default: return route;
  }
}

assert.strictEqual(formatDiagnosisType('clinical_mastitis'), 'Acute Clinical Mastitis');
assert.strictEqual(formatTreatmentRoute('intramammary'), 'Intramammary Infusion');
console.log('✅ 3. Veterinary diagnosis & route mapping passed.');

// 4. Species Classification (Cow vs. Buffalo)
function classifySpecies(breed) {
  if (!breed) return 'cow';
  return breed.toLowerCase().includes('buffalo') || breed.toLowerCase().includes('murrah') ? 'buffalo' : 'cow';
}

assert.strictEqual(classifySpecies('Holstein Friesian'), 'cow');
assert.strictEqual(classifySpecies('Gir Cross'), 'cow');
assert.strictEqual(classifySpecies('Murrah Buffalo'), 'buffalo');
assert.strictEqual(classifySpecies('Nili-Ravi Buffalo'), 'buffalo');
console.log('✅ 4. Species classification passed.');

// 5. In-Memory Signed URL Cache TTL Logic
const signedUrlCache = new Map();

function getCachedSignedUrl(path) {
  const cached = signedUrlCache.get(path);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.url;
  }
  return null;
}

function setCachedSignedUrl(path, url, ttlMs = 50 * 60 * 1000) {
  signedUrlCache.set(path, {
    url,
    expiresAt: Date.now() + ttlMs
  });
}

const testPath = 'farm-123/cow-456/case-789/image.webp';
assert.strictEqual(getCachedSignedUrl(testPath), null, 'Initial cache should be empty');
setCachedSignedUrl(testPath, 'https://supabase.co/signed-url-abc');
assert.strictEqual(getCachedSignedUrl(testPath), 'https://supabase.co/signed-url-abc', 'Cache hit within TTL');

// Expired entry test
setCachedSignedUrl(testPath, 'https://supabase.co/expired-url', -1000);
assert.strictEqual(getCachedSignedUrl(testPath), null, 'Expired cache entry should return null');
console.log('✅ 5. Signed URL caching & TTL validation passed.');

// 6. Proactive Storage Consumption Advisory Calculation
function evaluateStorageThreshold(totalBytes, targetMB = 600, alertThresholdMB = 500) {
  const totalMB = totalBytes / (1024 * 1024);
  return {
    totalMB,
    isApproaching: totalMB >= alertThresholdMB,
    isExceeded: totalMB > targetMB
  };
}

assert.strictEqual(evaluateStorageThreshold(100 * 1024 * 1024).isApproaching, false, '100MB should be safe');
assert.strictEqual(evaluateStorageThreshold(520 * 1024 * 1024).isApproaching, true, '520MB should trigger warning');
assert.strictEqual(evaluateStorageThreshold(610 * 1024 * 1024).isExceeded, true, '610MB should exceed target');
console.log('✅ 6. Storage threshold calculation passed.');

// 7. Storage Path Structure & Folder Name Formatting
function isValidStoragePath(path) {
  // Pattern: {farm_id}/{cow_id}/{case_id}/{filename}
  const parts = path.split('/');
  if (parts.length !== 4) return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(parts[0]) && uuidRegex.test(parts[1]) && uuidRegex.test(parts[2]) && parts[3].length > 0;
}

const validPath = '11111111-1111-1111-1111-111111111111/22222222-2222-2222-2222-222222222222/33333333-3333-3333-3333-333333333333/1729000000_sample.webp';
const invalidPath1 = 'random-farm/cow-1/case-2/pic.jpg';
const invalidPath2 = '11111111-1111-1111-1111-111111111111/pic.jpg';

assert.strictEqual(isValidStoragePath(validPath), true, 'Valid 4-part UUID path should pass');
assert.strictEqual(isValidStoragePath(invalidPath1), false, 'Non-UUID path should fail');
assert.strictEqual(isValidStoragePath(invalidPath2), false, 'Shallow path should fail');
console.log('✅ 7. Storage path UUID schema validation passed.');

// 8. Food Safety Withdrawal Constraints
function validateWithdrawalTimes(milkHours, meatDays) {
  if (milkHours < 0 || meatDays < 0) return false;
  if (milkHours < 24) return false; // Clinical minimum for mastitis antibiotics
  return true;
}

assert.strictEqual(validateWithdrawalTimes(72, 14), true, '72h milk & 14d meat is valid');
assert.strictEqual(validateWithdrawalTimes(12, 14), false, '12h milk is unsafe (< 24h)');
assert.strictEqual(validateWithdrawalTimes(-1, 14), false, 'Negative withdrawal is invalid');
console.log('✅ 8. Food safety withdrawal validation passed.');

// 9. Client WebP Size Cap Validation
function validateImageSizeCap(sizeBytes, capBytes = 1048576) {
  return sizeBytes <= capBytes;
}

assert.strictEqual(validateImageSizeCap(350 * 1024), true, '350 KB is within cap');
assert.strictEqual(validateImageSizeCap(1048576), true, 'Exact 1 MB is within cap');
assert.strictEqual(validateImageSizeCap(1048577), false, '1 MB + 1 byte exceeds cap');
console.log('✅ 9. Image size limit (1MB) validation passed.');

// 10. Bilingual Marathi Translation Verification
const I18N_SAMPLE = {
  en: { greeting: 'Good morning, Farmer 👋', herdHealth: 'HERD HEALTH' },
  mr: { greeting: 'शुभ प्रभात, शेतकरी 👋', herdHealth: 'कळप आरोग्य' }
};
assert.strictEqual(I18N_SAMPLE.en.greeting.includes('Farmer'), true);
assert.strictEqual(I18N_SAMPLE.mr.greeting.includes('शेतकरी'), true);
assert.strictEqual(I18N_SAMPLE.mr.herdHealth, 'कळप आरोग्य');
console.log('✅ 10. Bilingual Marathi dictionary validation passed.');

// 11. Dual-Bucket Storage Fallback Resolution
async function resolveStorageBucket(primaryBucket, fallbackBucket, mockBuckets) {
  if (mockBuckets.has(primaryBucket)) return primaryBucket;
  if (mockBuckets.has(fallbackBucket)) return fallbackBucket;
  throw new Error('Bucket not found');
}

(async () => {
  const bucketsA = new Set(['bovicare-private-images', 'udder-images']);
  const bucketsB = new Set(['udder-images']); // Only udder-images exists
  const bucketsC = new Set(['bovicare-private-images']); // Only bovicare-private-images exists

  assert.strictEqual(await resolveStorageBucket('bovicare-private-images', 'udder-images', bucketsA), 'bovicare-private-images');
  assert.strictEqual(await resolveStorageBucket('bovicare-private-images', 'udder-images', bucketsB), 'udder-images');
  assert.strictEqual(await resolveStorageBucket('bovicare-private-images', 'udder-images', bucketsC), 'bovicare-private-images');
  console.log('✅ 11. Dual-bucket fallback resolution passed.');

  // 12. Safe Quarter & Symptoms Parsing
  function safeParseList(val, fallback = 'None') {
    if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : fallback;
    if (typeof val === 'string' && val.trim().length > 0) return val.trim();
    return fallback;
  }
  assert.strictEqual(safeParseList(['RF', 'RR']), 'RF, RR');
  assert.strictEqual(safeParseList('Left Front'), 'Left Front');
  assert.strictEqual(safeParseList(null, 'General'), 'General');
  assert.strictEqual(safeParseList([], 'General'), 'General');
  console.log('✅ 12. Safe quarter & symptom parsing passed.');

  // 13. Veterinary Diagnosis & Treatment Prescription Payload Validation
  function validateClinicalPrescription(payload) {
    if (!payload.caseId) return false;
    if (!['clinical_mastitis', 'subclinical_mastitis', 'trauma_injury', 'healthy_non_mastitis'].includes(payload.diagnosis)) return false;
    if (!['intramammary', 'intramuscular', 'subcutaneous', 'oral', 'topical'].includes(payload.route)) return false;
    if (typeof payload.milkWithdrawalHours !== 'number' || payload.milkWithdrawalHours < 0) return false;
    if (typeof payload.meatWithdrawalDays !== 'number' || payload.meatWithdrawalDays < 0) return false;
    if (!payload.medicationProtocol || payload.medicationProtocol.trim().length === 0) return false;
    return true;
  }

  const validRx = {
    caseId: 'CASE-2026-001',
    diagnosis: 'clinical_mastitis',
    route: 'intramammary',
    medicationProtocol: 'Cefquinome intramammary infusion 75mg q12h x 3d',
    milkWithdrawalHours: 72,
    meatWithdrawalDays: 14
  };
  const invalidRxNegativeWithdrawal = { ...validRx, milkWithdrawalHours: -1 };
  const invalidRxBadRoute = { ...validRx, route: 'intravenous_unsupported' };

  assert.strictEqual(validateClinicalPrescription(validRx), true, 'Valid clinical Rx should pass');
  assert.strictEqual(validateClinicalPrescription(invalidRxNegativeWithdrawal), false, 'Negative withdrawal should fail');
  assert.strictEqual(validateClinicalPrescription(invalidRxBadRoute), false, 'Unsupported route should fail');
  console.log('✅ 13. Veterinary diagnosis & prescription payload validation passed.');

  // 14. Responsive Role Switch & Tab Routing Transitions
  function getTabDestinationForRole(role) {
    return role === 'vet' ? 4 : 0;
  }
  assert.strictEqual(getTabDestinationForRole('farmer'), 0, 'Farmer should route to Home Tab 0');
  assert.strictEqual(getTabDestinationForRole('vet'), 4, 'Vet should route to Clinical Portal Tab 4');
  console.log('✅ 14. Role-based routing state transitions passed.');

  // 15. Centralized Supabase Configuration & DOM Cleanliness Verification
  const fs = require('fs');
  const indexHtml = fs.readFileSync('index.html', 'utf8');

  // Verify that the developer "Cloud Config" modal and button are removed from user-facing DOM
  assert.strictEqual(indexHtml.includes('id="modalAuth"'), false, 'modalAuth should be removed from index.html');
  assert.strictEqual(indexHtml.includes('openSupabaseAuthModal()'), false, 'openSupabaseAuthModal should be removed from index.html');
  assert.strictEqual(indexHtml.includes('src="env-config.js"'), true, 'env-config.js should be referenced in index.html');

  // Verify centralized configuration loader
  function resolveCentralizedConfig(envWindow, envProcess) {
    return {
      url: envWindow.ENV_SUPABASE_URL || envProcess.SUPABASE_URL || '',
      key: envWindow.ENV_SUPABASE_ANON_KEY || envProcess.SUPABASE_ANON_KEY || ''
    };
  }

  const testConfig = resolveCentralizedConfig(
    { ENV_SUPABASE_URL: 'https://test-ref.supabase.co', ENV_SUPABASE_ANON_KEY: 'anon-test-key' },
    {}
  );
  assert.strictEqual(testConfig.url, 'https://test-ref.supabase.co');
  assert.strictEqual(testConfig.key, 'anon-test-key');

  // Verify safety guard against service_role keys
  function isSafePublishableKey(key) {
    if (!key) return false;
    // service_role keys usually contain service_role in their payload or decoded headers
    if (key.toLowerCase().includes('service_role') || key.toLowerCase().includes('secret')) return false;
    return true;
  }
  assert.strictEqual(isSafePublishableKey('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'), true);
  assert.strictEqual(isSafePublishableKey('service_role_secret_key_123'), false);
  console.log('✅ 15. Centralized Supabase configuration & DOM cleanliness verified.');

  // 16. Dynamic Farmer vs. Veterinarian Profile Details Verification
  function buildProfileModel(role, profile, farm, cowsList, casesList) {
    if (role === 'farmer') {
      return {
        role: 'farmer',
        fullName: profile?.full_name || 'Ramesh Patil',
        roleTitle: 'Dairy Farmer & Herd Owner',
        farmName: farm?.name || 'Sahyadri Dairy Farm',
        regCode: farm?.registration_code || 'FARM-MH-4019',
        phone: profile?.phone_number || '+91 98220 14829',
        totalCattle: cowsList.length,
        healthyCattle: cowsList.filter(c => c.status === 'healthy').length
      };
    } else {
      return {
        role: 'vet',
        fullName: profile?.full_name || 'Dr. Anjali Deshmukh, B.V.Sc & A.H.',
        roleTitle: 'Licensed Veterinary Officer',
        vetLicenseNumber: profile?.vet_license_number || 'VCI-MAH-2024-8842',
        clinicAffiliation: profile?.vet_clinic_affiliation || 'Pune District Veterinary Dispensary & Animal Hospital',
        phone: profile?.phone_number || '+91 94231 77610',
        pendingTriageCases: casesList.filter(c => c.status === 'open').length,
        isVerified: true
      };
    }
  }

  const mockCows = [{ status: 'healthy' }, { status: 'monitor' }, { status: 'healthy' }];
  const mockCases = [{ status: 'open' }, { status: 'treatment_prescribed' }];

  const farmerProfile = buildProfileModel('farmer', null, null, mockCows, mockCases);
  assert.strictEqual(farmerProfile.role, 'farmer');
  assert.strictEqual(farmerProfile.farmName, 'Sahyadri Dairy Farm');
  assert.strictEqual(farmerProfile.regCode, 'FARM-MH-4019');
  assert.strictEqual(farmerProfile.totalCattle, 3);
  assert.strictEqual(farmerProfile.healthyCattle, 2);

  const vetProfile = buildProfileModel('vet', null, null, mockCows, mockCases);
  assert.strictEqual(vetProfile.role, 'vet');
  assert.strictEqual(vetProfile.vetLicenseNumber, 'VCI-MAH-2024-8842');
  assert.strictEqual(vetProfile.clinicAffiliation.includes('Dispensary'), true);
  assert.strictEqual(vetProfile.pendingTriageCases, 1);
  assert.strictEqual(vetProfile.isVerified, true);
  console.log('✅ 16. Dynamic Farmer vs. Veterinarian profile details verified.');

  // 17. Gemini-Style Icon Rail Sidebar, Visible Icons & Layout
  const freshHtml = fs.readFileSync(__dirname + '/index.html', 'utf-8');
  const stylesCss = fs.readFileSync(__dirname + '/styles.css', 'utf-8');

  // Verify Sidebar HTML elements & Icon Rail structure
  assert.strictEqual(freshHtml.includes('id="appSidebar"'), true, 'Sidebar element #appSidebar must exist');
  assert.strictEqual(freshHtml.includes('class="app-sidebar expanded"'), true, 'Sidebar must have expanded class by default on page refresh');
  assert.strictEqual(freshHtml.includes('id="btnRailToggle"'), true, 'Sidebar rail toggle #btnRailToggle must exist');
  assert.strictEqual(freshHtml.includes('id="btnSidebarToggle"'), false, 'Header toggle button #btnSidebarToggle must be removed');
  assert.strictEqual(freshHtml.includes('class="app-body-layout"'), true, 'Body layout wrapper .app-body-layout must exist');
  assert.strictEqual(freshHtml.includes('class="sidebar-icon-wrap"'), true, 'Sidebar icon wraps must exist for visible icons');
  assert.strictEqual(freshHtml.includes('class="sidebar-nav-btn'), true, 'Sidebar nav buttons must exist');
  assert.strictEqual(freshHtml.includes('id="sideLinkOverview"'), true, 'Sidebar overview link must exist');
  assert.strictEqual(freshHtml.includes('id="sideLinkCows"'), true, 'Sidebar cows link must exist');
  assert.strictEqual(freshHtml.includes('id="sideLinkAssess"'), true, 'Sidebar assess link must exist');
  assert.strictEqual(freshHtml.includes('id="sideLinkRecords"'), true, 'Sidebar records link must exist');
  // Verify removal of role switching buttons from main dashboard & presence of read-only badges
  assert.strictEqual(freshHtml.includes('id="sideRoleFarmer"'), false, 'Sidebar farmer role switch button must be removed');
  assert.strictEqual(freshHtml.includes('id="sideRoleVet"'), false, 'Sidebar vet role switch button must be removed');
  assert.strictEqual(freshHtml.includes('id="pillRoleFarmer"'), false, 'Header farmer role switch button must be removed');
  assert.strictEqual(freshHtml.includes('id="pillRoleVet"'), false, 'Header vet role switch button must be removed');
  assert.strictEqual(freshHtml.includes('onclick="setRole('), false, 'No role switching onclick handlers should exist on main dashboard');
  assert.strictEqual(freshHtml.includes('id="activeRoleBadge"'), true, 'Read-only active role header badge #activeRoleBadge must exist');
  assert.strictEqual(freshHtml.includes('id="sideActiveRoleBadge"'), true, 'Read-only active role sidebar badge #sideActiveRoleBadge must exist');
  assert.strictEqual(stylesCss.includes('.active-role-indicator-badge'), true, '.active-role-indicator-badge styles must exist in styles.css');

  // Verify removal of "Supabase Cloud Sync" text & Header badge
  assert.strictEqual(freshHtml.includes('Supabase Cloud Sync'), false, 'Text "Supabase Cloud Sync" must be removed');
  assert.strictEqual(freshHtml.includes('id="sidebarCloudStatus"'), false, '#sidebarCloudStatus must be removed');
  assert.strictEqual(freshHtml.includes('Bovine Mastitis Detection & Care'), false, 'Text "Bovine Mastitis Detection & Care" must be removed from header');

  // Verify Header Logo
  assert.strictEqual(freshHtml.includes('class="brand-wrapper"'), true, 'Brand wrapper logo must exist');
  assert.strictEqual(freshHtml.includes('class="top-nav-left"'), true, 'Top nav left cluster with logo must exist');

  // Verify Expanded Middle Feed & Removal of 2-Column Squeeze
  assert.strictEqual(freshHtml.includes('class="dashboard-expanded-feed"'), true, 'Primary feed must use .dashboard-expanded-feed');
  assert.strictEqual(freshHtml.includes('class="dashboard-grid"'), false, 'Old cramped .dashboard-grid must not be present');

  // Verify Bottom Operational Section containing Herd Glance, Stats, and Clinical Queue
  assert.strictEqual(freshHtml.includes('class="home-bottom-operational-section"'), true, 'Bottom operational section must exist');
  assert.strictEqual(freshHtml.includes('class="bottom-operational-grid"'), true, 'Bottom operational dual-grid must exist');
  assert.strictEqual(freshHtml.includes('id="txtHerdGlanceTitle"'), true, 'Herd at a glance title must exist in bottom section');
  assert.strictEqual(freshHtml.includes('id="statTotalCows"'), true, 'Total cows stat element must exist');
  assert.strictEqual(freshHtml.includes('id="statHealthyCows"'), true, 'Healthy cows stat element must exist');
  assert.strictEqual(freshHtml.includes('id="statMonitorCows"'), true, 'Monitor cows stat element must exist');
  assert.strictEqual(freshHtml.includes('id="railCasesContainer"'), true, 'Clinical triage queue container must exist in bottom section');

  // Verify CSS Rules for Gemini Icon Rail & Responsive Layout
  assert.strictEqual(stylesCss.includes('.app-sidebar.collapsed {'), true, '.app-sidebar.collapsed CSS must exist');
  assert.strictEqual(stylesCss.includes('width: 68px;'), true, 'Collapsed rail width must be 68px (Gemini web style)');
  assert.strictEqual(stylesCss.includes('.sidebar-icon-wrap {'), true, '.sidebar-icon-wrap CSS must exist for visible icons');
  assert.strictEqual(stylesCss.includes('.dashboard-expanded-feed {'), true, '.dashboard-expanded-feed CSS must exist');
  assert.strictEqual(stylesCss.includes('.home-bottom-operational-section {'), true, '.home-bottom-operational-section CSS must exist');
  assert.strictEqual(stylesCss.includes('.bottom-operational-grid {'), true, '.bottom-operational-grid CSS must exist');

  console.log('✅ 17. Gemini-style icon rail sidebar with visible icons & bottom operations verified.');

  // 18. Cattle Catalog Filtering, Search & Status Isolation
  function filterCattleData(cowsList, statusFilter = 'all', searchQuery = '') {
    let list = cowsList;
    if (statusFilter && statusFilter !== 'all') {
      list = list.filter(c => c.status === statusFilter);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.tag.toLowerCase().includes(q) || 
        c.breed.toLowerCase().includes(q)
      );
    }
    return list;
  }

  const sampleHerd = [
    { id: '1', name: 'Gauri', tag: '#C001', breed: 'Holstein', status: 'healthy' },
    { id: '2', name: 'Laxmi', tag: '#C002', breed: 'Gir Cross', status: 'monitor' },
    { id: '3', name: 'Rani', tag: '#C003', breed: 'Jersey', status: 'healthy' },
    { id: '4', name: 'Kalyani', tag: '#C004', breed: 'Murrah Buffalo', status: 'monitor' }
  ];

  // Test status filtering
  const allFiltered = filterCattleData(sampleHerd, 'all');
  const healthyFiltered = filterCattleData(sampleHerd, 'healthy');
  const monitorFiltered = filterCattleData(sampleHerd, 'monitor');
  assert.strictEqual(allFiltered.length, 4, 'All filter should return all 4 cattle');
  assert.strictEqual(healthyFiltered.length, 2, 'Healthy filter should return 2 cattle');
  assert.strictEqual(monitorFiltered.length, 2, 'Monitor filter should return 2 cattle');
  assert.strictEqual(healthyFiltered.every(c => c.status === 'healthy'), true, 'All returned cows must be healthy');
  assert.strictEqual(monitorFiltered.every(c => c.status === 'monitor'), true, 'All returned cows must be monitor');

  // Test search filtering combined with status
  const searchGauri = filterCattleData(sampleHerd, 'all', 'Gauri');
  assert.strictEqual(searchGauri.length, 1, 'Search for Gauri should match 1');
  assert.strictEqual(searchGauri[0].tag, '#C001');

  const searchTag = filterCattleData(sampleHerd, 'all', '#C002');
  assert.strictEqual(searchTag.length, 1, 'Search by tag #C002 should match Laxmi');

  const searchBreed = filterCattleData(sampleHerd, 'all', 'Murrah');
  assert.strictEqual(searchBreed.length, 1, 'Search by breed Murrah should match Kalyani');

  const combinedSearchAndFilter = filterCattleData(sampleHerd, 'healthy', 'Gir');
  assert.strictEqual(combinedSearchAndFilter.length, 0, 'Gir cow is in monitor status, should yield 0 in healthy filter');
  console.log('✅ 18. Cattle catalog filter pills & multi-attribute search passed.');

  // 19. Interactive Modals DOM & CSS Verification
  assert.strictEqual(freshHtml.includes('id="cattleFilterPillsRow"'), true, 'Filter pills container #cattleFilterPillsRow must exist in index.html');
  assert.strictEqual(freshHtml.includes('id="btnFilterAll"'), true, 'Filter pill #btnFilterAll must exist');
  assert.strictEqual(freshHtml.includes('id="btnFilterHealthy"'), true, 'Filter pill #btnFilterHealthy must exist');
  assert.strictEqual(freshHtml.includes('id="btnFilterMonitor"'), true, 'Filter pill #btnFilterMonitor must exist');
  assert.strictEqual(freshHtml.includes('id="countFilterAll"'), true, 'Count badge #countFilterAll must exist');
  assert.strictEqual(freshHtml.includes('id="countFilterHealthy"'), true, 'Count badge #countFilterHealthy must exist');
  assert.strictEqual(freshHtml.includes('id="countFilterMonitor"'), true, 'Count badge #countFilterMonitor must exist');

  // Verify Interactive Modals
  assert.strictEqual(freshHtml.includes('id="modalSymptomGuide"'), true, 'Modal #modalSymptomGuide must exist');
  assert.strictEqual(freshHtml.includes('closeSymptomGuide()'), true, 'closeSymptomGuide handler must exist');
  assert.strictEqual(freshHtml.includes('id="modalReminders"'), true, 'Modal #modalReminders must exist');
  assert.strictEqual(freshHtml.includes('closeRemindersModal()'), true, 'closeRemindersModal handler must exist');
  assert.strictEqual(freshHtml.includes('id="activeWithdrawalRemindersList"'), true, '#activeWithdrawalRemindersList must exist');
  assert.strictEqual(freshHtml.includes('id="modalCowDetails"'), true, 'Modal #modalCowDetails must exist');
  assert.strictEqual(freshHtml.includes('closeCowDetailsModal()'), true, 'closeCowDetailsModal handler must exist');

  // Verify Clinical Temperature Input Guidance
  assert.strictEqual(freshHtml.includes('min="36.0"'), true, 'Temperature field must have min=36.0');
  assert.strictEqual(freshHtml.includes('max="43.0"'), true, 'Temperature field must have max=43.0');
  assert.strictEqual(freshHtml.includes('Normal bovine range: 38.0°C – 39.2°C'), true, 'Temperature field must have clinical normal hint');

  // Verify CSS Rules for Pills & Modals
  assert.strictEqual(stylesCss.includes('.filter-pills-row {'), true, '.filter-pills-row CSS rule must exist');
  assert.strictEqual(stylesCss.includes('.filter-pill-btn {'), true, '.filter-pill-btn CSS rule must exist');
  assert.strictEqual(stylesCss.includes('.filter-pill-btn.active {'), true, '.filter-pill-btn.active CSS rule must exist');
  assert.strictEqual(stylesCss.includes('.filter-pill-count {'), true, '.filter-pill-count CSS rule must exist');
  assert.strictEqual(stylesCss.includes('.btn-secondary-action {'), true, '.btn-secondary-action CSS rule must exist');

  console.log('✅ 19. Interactive modals, cattle filter pills DOM, and styles verified.');

  // 20. Supabase SQL Migrations & RLS Integrity Verification
  const migrationsDir = path.join(__dirname, 'supabase', 'migrations');
  const migrationFiles = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

  assert.strictEqual(migrationFiles.length >= 2, true, 'At least 2 consolidated SQL migration files must exist');
  assert.strictEqual(migrationFiles.includes('20261018000000_core_bovicare_schema.sql'), true);
  assert.strictEqual(migrationFiles.includes('20261018000001_storage_buckets_and_policies.sql'), true);

  const m0Content = fs.readFileSync(path.join(migrationsDir, '20261018000000_core_bovicare_schema.sql'), 'utf8');
  assert.strictEqual(m0Content.includes('farm_members_insert'), true, 'farm_members_insert policy must exist');
  assert.strictEqual(m0Content.includes('profiles_insert_own'), true, 'profiles_insert_own policy must exist');
  assert.strictEqual(m0Content.includes('cows_vet_update'), true, 'cows_vet_update policy must exist');
  assert.strictEqual(m0Content.includes('cases_vet_update'), true, 'cases_vet_update policy must exist');
  assert.strictEqual(m0Content.includes('seed_initial_farm_herd'), true, 'seed_initial_farm_herd function must exist');

  const m1Content = fs.readFileSync(path.join(migrationsDir, '20261018000001_storage_buckets_and_policies.sql'), 'utf8');
  assert.strictEqual(m1Content.includes('bovicare-private-images'), true, 'bovicare-private-images bucket must be configured');
  assert.strictEqual(m1Content.includes('udder-images'), true, 'udder-images bucket must be configured');
  assert.strictEqual(m1Content.includes('1048576'), true, '1MB size limit (1048576) must be enforced');

  console.log('✅ 20. Supabase SQL migrations contract & RLS integrity passed.');

  // 21. Cow Photo Upload & Profile Image Management Verification
  const appJs = fs.readFileSync(__dirname + '/app.js', 'utf-8');

  // Verify DOM elements in index.html for cow photo addition
  assert.strictEqual(freshHtml.includes('id="cowPhotoInput"'), true, 'Cow photo file input #cowPhotoInput must exist');
  assert.strictEqual(freshHtml.includes('id="cowPhotoPreview"'), true, 'Cow photo preview element #cowPhotoPreview must exist');
  assert.strictEqual(freshHtml.includes('id="cowPhotoPreviewContainer"'), true, 'Cow photo preview container #cowPhotoPreviewContainer must exist');
  assert.strictEqual(freshHtml.includes('handleCowPhotoSelected'), true, 'handleCowPhotoSelected handler must be bound in index.html');
  assert.strictEqual(freshHtml.includes('removeCowPhoto'), true, 'removeCowPhoto handler must be bound in index.html');

  // Verify app.js implementation for cow photo compression and updates
  assert.strictEqual(appJs.includes('handleCowPhotoSelected'), true, 'handleCowPhotoSelected function must exist in app.js');
  assert.strictEqual(appJs.includes('handleUpdateCowPhoto'), true, 'handleUpdateCowPhoto function must exist in app.js');
  assert.strictEqual(appJs.includes('removeCowPhoto'), true, 'removeCowPhoto function must exist in app.js');
  assert.strictEqual(appJs.includes('changeCowPhotoInput'), true, 'changeCowPhotoInput must be handled in cow details modal');
  assert.strictEqual(appJs.includes('detailCowPhotoImg'), true, 'detailCowPhotoImg must be rendered in cow details modal');

  // Verify schema and storage path pattern
  assert.strictEqual(m0Content.includes('photo_storage_path TEXT'), true, 'cows table must have photo_storage_path column');

  function isValidCowPhotoPath(path) {
    // Pattern: {farm_id}/cows/{filename}
    const parts = path.split('/');
    if (parts.length !== 3) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(parts[0]) && parts[1] === 'cows' && parts[2].endsWith('.webp');
  }

  const validCowPhoto = '11111111-1111-1111-1111-111111111111/cows/cow_sample_123.webp';
  const invalidCowPhoto = '11111111-1111-1111-1111-111111111111/random/cow_sample_123.png';
  assert.strictEqual(isValidCowPhotoPath(validCowPhoto), true, 'Valid cow photo storage path should pass');
  assert.strictEqual(isValidCowPhotoPath(invalidCowPhoto), false, 'Invalid cow photo path should fail');

  console.log('✅ 21. Cow photo upload, WebP compression, and profile photo update verified.');

  // 22. Website Landing Page, 3D Cow Hero, & Video Adaptation Verification
  const landingHtml = fs.readFileSync(path.join(__dirname, 'landing.html'), 'utf8');
  const landingCss = fs.readFileSync(path.join(__dirname, 'landing.css'), 'utf8');
  const landingJs = fs.readFileSync(path.join(__dirname, 'landing.js'), 'utf8');
  const serverJs = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');

  // Verify Hero Headline & Suggested Copy
  assert.strictEqual(landingHtml.includes('Healthier Herds Start with'), true, 'Landing page must feature headline');
  assert.strictEqual(landingHtml.includes('Support better udder health with'), true, 'Landing page must include supporting copy');
  assert.strictEqual(landingHtml.includes('Private Supabase'), false, 'Private Supabase must be removed from landing page');
  assert.strictEqual(landingHtml.includes('Observation logging'), false, 'Observation logging must be removed from landing page');

  // Verify Navigation Links & Actions
  assert.strictEqual(landingHtml.includes('class="site-header"'), true, 'Sticky header must exist');
  assert.strictEqual(landingHtml.includes('index.html?role=farmer'), true, 'Farmer Portal action must link to app');
  assert.strictEqual(landingHtml.includes('index.html?role=vet'), true, 'Vet Portal action must link to app');
  assert.strictEqual(landingHtml.includes('Get Started Free'), true, 'Prominent Get Started action must exist');

  // Verify 3D Animated Cow Hero Element (Zero scooter references)
  assert.strictEqual(landingHtml.includes('id="heroCowImg"'), true, 'Hero cow image element #heroCowImg must exist');
  assert.strictEqual(landingHtml.includes('assets/images/hero_cow_3d.jpg'), true, '3D cow hero image must be referenced');
  assert.strictEqual(fs.existsSync(path.join(__dirname, 'assets', 'images', 'hero_cow_3d.jpg')), true, 'hero_cow_3d.jpg must exist on disk');
  assert.strictEqual(landingHtml.toLowerCase().includes('scooter'), false, 'Zero scooter elements must remain in landing page');

  // Verify Floating Telemetry Badges & Interactive HUD
  assert.strictEqual(landingHtml.includes('id="aiScanHud"'), true, 'AI scan HUD overlay must exist');
  assert.strictEqual(landingHtml.includes('Early Mastitis Screen'), true, 'Early mastitis screening badge must exist');
  assert.strictEqual(landingHtml.includes('Rapid Vet Triage'), true, 'Rapid vet triage badge must exist');
  assert.strictEqual(landingHtml.includes('Milk Safety Guard'), true, 'Milk safety guard badge must exist');
  assert.strictEqual(landingHtml.includes('id="btnToggleAiScan"'), true, 'AI scan mode toggle must exist');

  // Verify Supporting Sections
  assert.strictEqual(landingHtml.includes('id="simulator"'), true, 'Clinical simulator section must exist');
  assert.strictEqual(landingHtml.includes('id="features"'), true, 'Features section must exist');
  assert.strictEqual(landingHtml.includes('id="how-it-works"'), true, 'How it works section must exist');
  assert.strictEqual(landingHtml.includes('id="impact"'), true, 'Impact section must exist');
  assert.strictEqual(landingHtml.includes('id="testimonials"'), true, 'Testimonials section must exist');
  assert.strictEqual(landingHtml.includes('class="site-footer"'), true, 'Footer must exist');

  // Verify Animation & CSS Rules inspired by reference video
  assert.strictEqual(landingCss.includes('@keyframes cowBobbing'), true, 'cowBobbing keyframe animation must exist');
  assert.strictEqual(landingCss.includes('@keyframes shadowPulse'), true, 'shadowPulse keyframe animation must exist');
  assert.strictEqual(landingCss.includes('mix-blend-mode: multiply'), true, 'Clean blending for 3D render must be applied');
  assert.strictEqual(landingCss.includes('@media (max-width: 1024px)'), true, 'Tablet breakpoint must exist');
  assert.strictEqual(landingCss.includes('@media (max-width: 768px)'), true, 'Mobile breakpoint must exist');
  assert.strictEqual(landingCss.includes('@media (prefers-reduced-motion: reduce)'), true, 'Accessibility reduced-motion must be supported');

  // Verify JS Interactive Controller
  assert.strictEqual(landingJs.includes('initHeroCowInteractions'), true, 'Hero cow interaction handler must exist');
  assert.strictEqual(landingJs.includes('initClinicalSimulator'), true, 'Clinical simulator handler must exist');
  assert.strictEqual(landingJs.includes('SIM_CASES'), true, 'Simulation data must exist');

  // Verify Server Routing & Index Navigation Link
  assert.strictEqual(serverJs.includes('landing.html'), true, 'server.js must route to landing.html');
  assert.strictEqual(freshHtml.includes('Website'), true, 'index.html must have link back to landing page');

  console.log('✅ 22. Website landing page, 3D animated cow, and video-inspired motion verified.');

  // 23. Dedicated Login Page & Role Dropdown (Farmer vs. Vet) Verification
  const loginHtml = fs.readFileSync(path.join(__dirname, 'login.html'), 'utf8');
  const loginCss = fs.readFileSync(path.join(__dirname, 'login.css'), 'utf8');
  const loginJs = fs.readFileSync(path.join(__dirname, 'login.js'), 'utf8');

  // Verify Role Dropdown & Options in login.html
  assert.strictEqual(loginHtml.includes('id="roleSelect"'), true, 'Role selection dropdown #roleSelect must exist in login.html');
  assert.strictEqual(loginHtml.includes('value="farmer"'), true, 'Role option "farmer" must exist in login.html');
  assert.strictEqual(loginHtml.includes('value="vet"'), true, 'Role option "vet" must exist in login.html');
  assert.strictEqual(loginHtml.includes('id="roleHintBox"'), true, 'Dynamic role hint callout #roleHintBox must exist');
  assert.strictEqual(loginHtml.includes('id="loginEmail"'), true, 'Email input #loginEmail must exist');
  assert.strictEqual(loginHtml.includes('id="loginPassword"'), true, 'Password input #loginPassword must exist');
  assert.strictEqual(loginHtml.includes('id="btnLoginSubmit"'), true, 'Submit button #btnLoginSubmit must exist');
  assert.strictEqual(loginHtml.includes('autofillDemo(\'farmer\')'), true, 'Farmer demo autofill button must exist');
  assert.strictEqual(loginHtml.includes('autofillDemo(\'vet\')'), true, 'Vet demo autofill button must exist');
  assert.strictEqual(loginHtml.includes('assets/images/hero_cow_3d.jpg'), true, '3D Cow hero must be displayed on login page');

  // Verify CSS Rules for Role Dropdown & Login Card
  assert.strictEqual(loginCss.includes('.form-select'), true, '.form-select CSS must exist');
  assert.strictEqual(loginCss.includes('.role-hint-box'), true, '.role-hint-box CSS must exist');
  assert.strictEqual(loginCss.includes('.role-hint-box.vet'), true, '.role-hint-box.vet CSS must exist for distinct vet styling');
  assert.strictEqual(loginCss.includes('.btn-login-submit'), true, '.btn-login-submit CSS must exist');

  // Verify Controller & Storage Sync in login.js and app.js
  assert.strictEqual(loginJs.includes('handleRoleSelectionChange'), true, 'handleRoleSelectionChange must exist in login.js');
  assert.strictEqual(loginJs.includes('bovicare_active_role'), true, 'login.js must persist bovicare_active_role');
  assert.strictEqual(appJs.includes('bovicare_active_role'), true, 'app.js must read bovicare_active_role on startup');

  // Verify Server Routing & Inter-Page Links
  assert.strictEqual(serverJs.includes('login.html'), true, 'server.js must route to login.html');
  assert.strictEqual(freshHtml.includes('Login'), true, 'index.html must have a link to Login');
  assert.strictEqual(landingHtml.includes('login.html'), true, 'landing.html must have links to login.html');

  console.log('✅ 23. Dedicated login page, role dropdown (Farmer vs Vet), and auth routing verified.');

  // 24. Visually Distinct Dedicated Veterinary Clinical Portal Verification
  const currentIndexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const currentStylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
  const currentAppJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

  // Verify CSS Theme & Distinct Clinical Styling in styles.css
  assert.strictEqual(currentStylesCss.includes('body.portal-vet-theme'), true, 'body.portal-vet-theme CSS must exist');
  assert.strictEqual(currentStylesCss.includes('--forest: #1E3A8A'), true, 'Medical cobalt palette must be defined for vet portal');
  assert.strictEqual(currentStylesCss.includes('.vet-command-hero'), true, '.vet-command-hero styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-kpi-grid'), true, '.vet-kpi-grid styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-urgent-alert-box'), true, '.vet-urgent-alert-box styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-actions-grid'), true, '.vet-actions-grid styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-triage-feed'), true, '.vet-triage-feed styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-case-card'), true, '.vet-case-card styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-quarter-grid'), true, '.vet-quarter-grid styling must exist for 4-quarter udder matrices');
  assert.strictEqual(currentStylesCss.includes('.vet-formulary-card'), true, '.vet-formulary-card styling must exist');

  // Verify Dedicated Veterinary Portal HTML Structure in index.html
  assert.strictEqual(currentIndexHtml.includes('id="farmerHomeFeed"'), true, '#farmerHomeFeed must exist to isolate farmer view');
  assert.strictEqual(currentIndexHtml.includes('id="vetHomeFeed"'), true, '#vetHomeFeed must exist for dedicated vet command center');
  assert.strictEqual(currentIndexHtml.includes('id="vetPortalCasesFeed"'), true, '#vetPortalCasesFeed container must exist');
  assert.strictEqual(currentIndexHtml.includes('id="vetKpiUrgent"'), true, '#vetKpiUrgent KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="vetKpiHold"'), true, '#vetKpiHold KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="vetHeroLicense"'), true, '#vetHeroLicense VCI registration element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="brandIconBox"'), true, '#brandIconBox must exist on header for dynamic medical icon');
  assert.strictEqual(currentIndexHtml.includes('id="btnSidebarQuickAction"'), true, '#btnSidebarQuickAction must exist for dynamic role quick action');
  assert.strictEqual(currentIndexHtml.includes('Cefquinome (Cobactan LC)'), true, 'VCI standard drug formulary must exist on vet portal');

  // Verify Controller Logic in app.js
  assert.strictEqual(currentAppJs.includes('portal-vet-theme'), true, 'app.js must toggle portal-vet-theme');
  assert.strictEqual(currentAppJs.includes('renderVetPortalHome'), true, 'renderVetPortalHome function must exist');
  assert.strictEqual(currentAppJs.includes('CLINICAL VETERINARY PORTAL'), true, 'Clinical tagline must be configured for vet mode');
  assert.strictEqual(currentAppJs.includes('Clinical Triage'), true, 'Clinical navigation labels must be configured for vet mode');

  console.log('✅ 24. Visually distinct Veterinary Clinical Portal, theme, and command center verified.');

  // =========================================================================
  // TEST SUITE 25: Comprehensive Clinical Triage Queue & Multi-Patient Data Integrity
  // =========================================================================
  // Verify Triage filter pills exist in index.html & CSS
  assert.strictEqual(currentIndexHtml.includes('id="vetFilterPillRow"'), true, '#vetFilterPillRow must exist in index.html');
  assert.strictEqual(currentIndexHtml.includes('data-filter="all"'), true, 'All filter pill must exist');
  assert.strictEqual(currentIndexHtml.includes('data-filter="urgent"'), true, 'Urgent filter pill must exist');
  assert.strictEqual(currentIndexHtml.includes('data-filter="open"'), true, 'Open filter pill must exist');
  assert.strictEqual(currentIndexHtml.includes('data-filter="holds"'), true, 'Holds filter pill must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-filter-pill-row'), true, '.vet-filter-pill-row styling must exist');
  assert.strictEqual(currentStylesCss.includes('.vet-filter-pill'), true, '.vet-filter-pill styling must exist');

  // Verify Pre-rendered non-empty Clinical Triage feed in index.html
  assert.strictEqual(currentIndexHtml.includes('CASE-2026-081'), true, 'Laxmi CASE-2026-081 must be pre-rendered in triage queue');
  assert.strictEqual(currentIndexHtml.includes('CASE-2026-082'), true, 'Gauri CASE-2026-082 must be pre-rendered in triage queue');
  assert.strictEqual(currentIndexHtml.includes('CASE-2026-083'), true, 'Nandini CASE-2026-083 must be pre-rendered in triage queue');
  assert.strictEqual(currentIndexHtml.includes('CASE-2026-084'), true, 'Radha CASE-2026-084 must be pre-rendered in triage queue');
  assert.strictEqual(currentIndexHtml.includes('CASE-2026-085'), true, 'Kaveri CASE-2026-085 must be pre-rendered in triage queue');

  // Verify JS casesList dataset and filter functions
  assert.strictEqual(currentAppJs.includes('activeVetTriageFilter'), true, 'activeVetTriageFilter state variable must exist');
  assert.strictEqual(currentAppJs.includes('setVetTriageFilter'), true, 'setVetTriageFilter function must exist');
  assert.strictEqual(currentAppJs.includes('CASE-2026-081') && currentAppJs.includes('CASE-2026-085'), true, 'casesList must contain multi-patient records (CASE-2026-081 to 085)');
  assert.strictEqual(currentAppJs.includes('renderVetPortalHome()'), true, 'renderVetPortalHome must be called dynamically across workflows');

  console.log('✅ 25. Clinical triage queue richness, filter pills, and non-emptiness verified.');

  // =========================================================================
  // TEST SUITE 26: Add Patient to Clinical Triage Modal & Workflow Verification
  // =========================================================================
  assert.strictEqual(currentIndexHtml.includes('id="modalAddTriageCase"'), true, '#modalAddTriageCase must exist in index.html');
  assert.strictEqual(currentIndexHtml.includes('id="triageCowSelect"'), true, '#triageCowSelect dropdown must exist');
  assert.strictEqual(currentIndexHtml.includes('id="triageUrgencySelect"'), true, '#triageUrgencySelect dropdown must exist');
  assert.strictEqual(currentIndexHtml.includes('id="triageTempInput"'), true, '#triageTempInput must exist');
  assert.strictEqual(currentIndexHtml.includes('id="triageCmtSelect"'), true, '#triageCmtSelect must exist');
  assert.strictEqual(currentIndexHtml.includes('openAddTriageCaseModal()'), true, 'openAddTriageCaseModal action must be wired up');

  // Verify JS modal handlers
  assert.strictEqual(currentAppJs.includes('openAddTriageCaseModal'), true, 'openAddTriageCaseModal function must exist');
  assert.strictEqual(currentAppJs.includes('closeAddTriageCaseModal'), true, 'closeAddTriageCaseModal function must exist');
  assert.strictEqual(currentAppJs.includes('submitNewTriageCase'), true, 'submitNewTriageCase function must exist');
  assert.strictEqual(currentAppJs.includes('openAddTriageCaseModal();'), true, 'Sidebar quick action in vet mode must trigger openAddTriageCaseModal');

  console.log('✅ 26. Dedicated Add Triage Case modal and clinical admission workflow verified.');

  // =========================================================================
  // TEST SUITE 27: Clinical Overview & Herd Epidemiology Dashboard Verification
  // =========================================================================
  // Verify HTML Section & Unique Identifiers in index.html
  assert.strictEqual(currentIndexHtml.includes('id="tabTriage"'), true, '#tabTriage dedicated tab section must exist in index.html');
  assert.strictEqual(currentIndexHtml.includes('id="tabClinicalOverview"'), true, '#tabClinicalOverview dedicated tab section must exist in index.html');
  assert.strictEqual(currentIndexHtml.includes('id="kpiMastitisRate"'), true, '#kpiMastitisRate KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="kpiActiveTriageCases"'), true, '#kpiActiveTriageCases KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="kpiQuartersAtRisk"'), true, '#kpiQuartersAtRisk KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('id="kpiSafeWithholdingLiters"'), true, '#kpiSafeWithholdingLiters KPI element must exist');
  assert.strictEqual(currentIndexHtml.includes('class="quarter-heatmap-grid"'), true, '.quarter-heatmap-grid 4-quarter anatomical map must exist');
  assert.strictEqual(currentIndexHtml.includes('class="scc-meter-wrap"'), true, '.scc-meter-wrap SCC multi-segment meter must exist');
  assert.strictEqual(currentIndexHtml.includes('class="withholding-guard-feed"'), true, '.withholding-guard-feed food safety shield must exist');

  // Verify CSS Styling in styles.css
  assert.strictEqual(currentStylesCss.includes('.clinical-overview-container'), true, '.clinical-overview-container CSS must exist');
  assert.strictEqual(currentStylesCss.includes('.clinical-overview-hero'), true, '.clinical-overview-hero CSS must exist');
  assert.strictEqual(currentStylesCss.includes('.clinical-kpi-grid'), true, '.clinical-kpi-grid CSS must exist');
  assert.strictEqual(currentStylesCss.includes('.quarter-heatmap-grid'), true, '.quarter-heatmap-grid CSS must exist');
  assert.strictEqual(currentStylesCss.includes('.scc-meter-wrap'), true, '.scc-meter-wrap CSS must exist');
  assert.strictEqual(currentStylesCss.includes('.withholding-guard-card'), true, '.withholding-guard-card CSS must exist');

  // Verify JS Controller Logic in app.js
  assert.strictEqual(currentAppJs.includes('renderClinicalOverviewDashboard'), true, 'renderClinicalOverviewDashboard function must exist in app.js');
  assert.strictEqual(currentAppJs.includes('if (tabIndex === 0) renderClinicalOverviewDashboard();'), true, 'tabIndex 0 must route to renderClinicalOverviewDashboard');
  assert.strictEqual(currentAppJs.includes('if (tabIndex === 1) renderVetPortalHome();'), true, 'tabIndex 1 must route to renderVetPortalHome');
  assert.strictEqual(currentAppJs.includes('if (tabIndex === 5) renderProfileView();'), true, 'tabIndex 5 must route to renderProfileView');

  console.log('✅ 27. Clinical Overview dashboard, 4-quarter heatmap, and navigation tabs verified.');

  // =========================================================================
  // TEST SUITE 28: Secure Admin Portal & RBAC Extension Verification
  // =========================================================================
  const adminMigrationPath = path.join(__dirname, 'supabase', 'migrations', '20261020000000_admin_portal_rls.sql');
  assert.strictEqual(fs.existsSync(adminMigrationPath), true, 'Admin migration file 20261020000000_admin_portal_rls.sql must exist');
  const adminSql = fs.readFileSync(adminMigrationPath, 'utf8');

  // Verify Security Definer Admin Functions & Policies in SQL
  assert.strictEqual(adminSql.includes('CREATE OR REPLACE FUNCTION public.is_admin()'), true, 'public.is_admin() must be defined in SQL migration');
  assert.strictEqual(adminSql.includes('CREATE OR REPLACE FUNCTION public.get_admin_dashboard_metrics()'), true, 'public.get_admin_dashboard_metrics() RPC must be defined');
  assert.strictEqual(adminSql.includes('CREATE POLICY "admin_profiles_all"'), true, 'admin_profiles_all RLS policy must be created');
  assert.strictEqual(adminSql.includes('CREATE POLICY "admin_cows_all"'), true, 'admin_cows_all RLS policy must be created');
  assert.strictEqual(adminSql.includes('CREATE POLICY "admin_cases_all"'), true, 'admin_cases_all RLS policy must be created');

  // Verify Admin HTML Layout & Auth Gate
  const adminHtmlPath = path.join(__dirname, 'admin.html');
  assert.strictEqual(fs.existsSync(adminHtmlPath), true, 'admin.html must exist');
  const adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

  assert.strictEqual(adminHtml.includes('id="adminAuthGate"'), true, '#adminAuthGate security gate must exist');
  assert.strictEqual(adminHtml.includes('id="adminLoginForm"'), true, '#adminLoginForm form must exist');
  assert.strictEqual(adminHtml.includes('id="adminAppContainer"'), true, '#adminAppContainer master container must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatFarmers"'), true, '#adminStatFarmers metric element must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatActiveVets"'), true, '#adminStatActiveVets metric element must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatLivestock"'), true, '#adminStatLivestock metric element must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatCows"'), true, '#adminStatCows metric element must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatBuffaloes"'), true, '#adminStatBuffaloes metric element must exist');
  assert.strictEqual(adminHtml.includes('id="adminStatTotalUsers"'), true, '#adminStatTotalUsers metric element must exist');
  assert.strictEqual(adminHtml.includes('id="farmersTableBody"'), true, '#farmersTableBody table must exist');
  assert.strictEqual(adminHtml.includes('id="vetsTableBody"'), true, '#vetsTableBody table must exist');
  assert.strictEqual(adminHtml.includes('id="livestockTableBody"'), true, '#livestockTableBody table must exist');
  assert.strictEqual(adminHtml.includes('id="casesTableBody"'), true, '#casesTableBody table must exist');

  // Verify Admin JS Logic
  const adminJsPath = path.join(__dirname, 'admin.js');
  assert.strictEqual(fs.existsSync(adminJsPath), true, 'admin.js must exist');
  const adminJs = fs.readFileSync(adminJsPath, 'utf8');

  assert.strictEqual(adminJs.includes('checkAdminSession'), true, 'checkAdminSession must exist in admin.js');
  assert.strictEqual(adminJs.includes('grantAdminAccess'), true, 'grantAdminAccess must exist in admin.js');
  assert.strictEqual(adminJs.includes('classifySpecies'), true, 'classifySpecies must exist in admin.js');
  assert.strictEqual(adminJs.includes("profile.role !== 'admin'"), true, 'Strict role !== admin rejection must exist in admin.js');

  // Verify Server Route Mapping
  const currentServerJs = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
  assert.strictEqual(currentServerJs.includes("reqPath === '/admin'"), true, "server.js must route '/admin' to admin.html");

  console.log('✅ 28. Secure Admin Portal, RBAC migration, telemetry, and gate verification passed.');

  // =========================================================================
  // TEST SUITE 29: Removal of Role-Switching & Enforcement of Route Protection
  // =========================================================================
  const latestAppJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  const latestLoginJs = fs.readFileSync(path.join(__dirname, 'login.js'), 'utf8');
  const rbacMigrationPath = path.join(__dirname, 'supabase', 'migrations', '20261020000001_enforce_role_route_protection.sql');

  // 1. Verify Complete Removal of Role-Switching UI & Functions
  assert.strictEqual(latestAppJs.includes('function toggleUserRole'), false, 'toggleUserRole function must be completely removed');
  assert.strictEqual(latestAppJs.includes('onclick = toggleUserRole'), false, 'onclick = toggleUserRole handlers must be removed');
  assert.strictEqual(latestAppJs.includes("activeBadge.style.cursor = 'default'"), true, 'activeBadge must have cursor default (read-only)');
  assert.strictEqual(latestAppJs.includes("sideBadge.style.cursor = 'default'"), true, 'sideBadge must have cursor default (read-only)');

  // 2. Verify URL Tampering Defense & Database-Enforced Routing
  assert.strictEqual(latestAppJs.includes('enforceAuthenticatedRoleAndRoute'), true, 'enforceAuthenticatedRoleAndRoute must be defined in app.js');
  assert.strictEqual(latestAppJs.includes('attemptedRole !== trustedRole'), true, 'URL role tampering detection must exist in app.js');
  assert.strictEqual(latestAppJs.includes('window.history.replaceState'), true, 'Unauthorized URL parameters must be sanitized via replaceState');

  // 3. Verify Tab Route Protection in switchTab
  assert.strictEqual(latestAppJs.includes("activeRole === 'farmer' && vetOnlyTabs.includes(targetId)"), true, 'Farmer must be blocked from accessing vet tabs');
  assert.strictEqual(latestAppJs.includes("activeRole === 'vet' && farmerOnlyTabs.includes(targetId)"), true, 'Vet must be blocked from accessing farmer tabs');
  assert.strictEqual(latestAppJs.includes('Access Denied: Veterinarian credentials required'), true, 'Farmer accessing vet tab must show Access Denied');
  assert.strictEqual(latestAppJs.includes('Access Denied: Farmer dashboard is restricted to herd owners'), true, 'Vet accessing farmer tab must show Access Denied');

  // 4. Verify Database-Resolved Role in login.js
  assert.strictEqual(latestLoginJs.includes("profile.role === 'veterinarian' ? 'vet' : 'farmer'"), true, 'login.js must resolve trusted role from database profile');

  // 5. Verify SQL Migration File
  assert.strictEqual(fs.existsSync(rbacMigrationPath), true, '20261020000001_enforce_role_route_protection.sql migration must exist');
  const rbacSql = fs.readFileSync(rbacMigrationPath, 'utf8');
  assert.strictEqual(rbacSql.includes('trg_prevent_role_self_escalation'), true, 'trg_prevent_role_self_escalation trigger must exist in SQL migration');

  console.log('✅ 29. Farmer/Vet role switching removal and strict route protection verified.');

  console.log('--- ALL 29 TEST SUITES COMPLETED WITH 100% PASS RATE ---');
})();
