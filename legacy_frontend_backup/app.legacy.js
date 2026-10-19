/**
 * BoviCare — Bovine Mastitis Detection & Veterinary Assistance System
 * Interactive Client Application
 */

// Initial illustrative cattle dataset
const initialCows = [
  {
    id: "C001",
    name: "Gauri",
    tag: "#C001",
    breed: "Holstein Friesian",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "2 days ago",
    lactation: "2nd Lactation",
    dailyYield: "24.5 L/day",
    photo: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C002",
    name: "Laxmi",
    tag: "#C002",
    breed: "Gir Cross",
    status: "monitor",
    statusText: "To monitor",
    lastChecked: "1 day ago",
    lactation: "3rd Lactation",
    dailyYield: "18.0 L/day",
    photo: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C003",
    name: "Rani",
    tag: "#C003",
    breed: "Jersey Cross",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "3 days ago",
    lactation: "1st Lactation",
    dailyYield: "16.2 L/day",
    photo: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C004",
    name: "Kaveri",
    tag: "#C004",
    breed: "Sahiwal",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "4 days ago",
    lactation: "2nd Lactation",
    dailyYield: "15.0 L/day",
    photo: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C005",
    name: "Nandi",
    tag: "#C005",
    breed: "Holstein Friesian",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "5 days ago",
    lactation: "4th Lactation",
    dailyYield: "26.0 L/day",
    photo: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C006",
    name: "Yamuna",
    tag: "#C006",
    breed: "Murrah Cross",
    status: "monitor",
    statusText: "To monitor",
    lastChecked: "Today",
    lactation: "2nd Lactation",
    dailyYield: "19.5 L/day",
    photo: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C007",
    name: "Champa",
    tag: "#C007",
    breed: "Red Sindhi",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "6 days ago",
    lactation: "3rd Lactation",
    dailyYield: "14.0 L/day",
    photo: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C008",
    name: "Ganga",
    tag: "#C008",
    breed: "Gir",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "1 week ago",
    lactation: "2nd Lactation",
    dailyYield: "17.5 L/day",
    photo: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C009",
    name: "Saraswati",
    tag: "#C009",
    breed: "Kankrej",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "1 week ago",
    lactation: "1st Lactation",
    dailyYield: "13.0 L/day",
    photo: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C010",
    name: "Bhavani",
    tag: "#C010",
    breed: "Tharparkar",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "2 weeks ago",
    lactation: "3rd Lactation",
    dailyYield: "16.8 L/day",
    photo: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C011",
    name: "Radha",
    tag: "#C011",
    breed: "Holstein Cross",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "2 weeks ago",
    lactation: "2nd Lactation",
    dailyYield: "22.0 L/day",
    photo: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "C012",
    name: "Mohini",
    tag: "#C012",
    breed: "Jersey Cross",
    status: "healthy",
    statusText: "Healthy",
    lastChecked: "3 weeks ago",
    lactation: "1st Lactation",
    dailyYield: "15.4 L/day",
    photo: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&q=80"
  }
];

// Initial clinical cases queue for veterinary review
let casesList = [
  {
    id: "CASE-2026-081",
    caseId: "CASE-2026-081",
    cowId: "C002",
    cowName: "Laxmi",
    cowTag: "#C002",
    date: "Oct 17, 2026 • 09:15 AM",
    quarters: ["RF (Right Front)"],
    symptoms: ["Udder Swelling or Firmness", "Clots / Flakes / Watery Milk", "Milk Drop (>15%)"],
    notes: "Farmer noted firmness in right front quarter during morning milking. Small flakes seen on strip cup. Milk yield down 3 liters.",
    image: "assets/images/cow_banner.jpeg",
    status: "open",
    urgency: "urgent",
    vetFeedback: null
  },
  {
    id: "CASE-2026-079",
    caseId: "CASE-2026-079",
    cowId: "C006",
    cowName: "Yamuna",
    cowTag: "#C006",
    date: "Oct 16, 2026 • 04:30 PM",
    quarters: ["LR (Left Rear)"],
    symptoms: ["Localized Heat or Redness", "Pain on Milking"],
    notes: "Mild sensitivity on left rear teat. Cow stepped away during cluster attachment.",
    image: null,
    status: "open",
    urgency: "monitor",
    vetFeedback: null
  }
];

// Historical records log
let recordsList = [
  {
    id: "REC-101",
    date: "Oct 17, 2026",
    cowName: "Laxmi (#C002)",
    type: "Udder Assessment Submitted",
    details: "Observed right front quarter firmness & flakes. Case escalated for vet review.",
    status: "Flagged"
  },
  {
    id: "REC-100",
    date: "Oct 16, 2026",
    cowName: "Yamuna (#C006)",
    type: "Routine Strip Cup Observation",
    details: "Mild tenderness noted in LR quarter. Milk appearance clear.",
    status: "To Monitor"
  },
  {
    id: "REC-099",
    date: "Oct 15, 2026",
    cowName: "Gauri (#C001)",
    type: "Herd Health Checkup",
    details: "All 4 quarters pliable and normal. Milk yield optimal at 24.5 L/day.",
    status: "Healthy"
  }
];

let activeRole = 'farmer';
let activeFilter = 'all';
let activeSpecies = 'all';
let currentPage = 0;
const PAGE_SIZE = 8;
let totalCattleCount = 0;
let liveCattleList = [];
let currentSelectedImageBase64 = null;
let authModalMode = 'signup';

// Safe usage controls for Supabase Free tier (DB < 300MB, Storage < 600MB, Egress < 3GB)
const signedUrlCache = new Map(); // storage_path -> { url: string, expiresAt: number }
let lastUploadedImageFingerprint = null;
let currentImageFingerprint = null;

// Dual-Bucket Storage Configuration (Supports both 'bovicare-private-images' and 'udder-images')
const BOVICARE_STORAGE_BUCKET = window.BOVICARE_STORAGE_BUCKET || 'bovicare-private-images';
const FALLBACK_STORAGE_BUCKET = 'udder-images';

async function getSignedUdderImageUrl(storagePath, expiresIn = 3600) {
  if (!supabaseClient || !storagePath) return { data: null, error: new Error('Missing client or path') };
  
  // Try primary bucket first
  let res = await supabaseClient.storage.from(BOVICARE_STORAGE_BUCKET).createSignedUrl(storagePath, expiresIn);
  if (!res.error && res.data?.signedUrl) {
    return res;
  }

  // Fallback to secondary bucket if configured
  if (FALLBACK_STORAGE_BUCKET && FALLBACK_STORAGE_BUCKET !== BOVICARE_STORAGE_BUCKET) {
    const fallbackRes = await supabaseClient.storage.from(FALLBACK_STORAGE_BUCKET).createSignedUrl(storagePath, expiresIn);
    if (!fallbackRes.error && fallbackRes.data?.signedUrl) {
      return fallbackRes;
    }
  }

  return res;
}

async function uploadUdderImageObject(storagePath, fileBlob, options) {
  if (!supabaseClient) throw new Error('Supabase client not initialized');
  
  let res = await supabaseClient.storage.from(BOVICARE_STORAGE_BUCKET).upload(storagePath, fileBlob, options);
  if (!res.error) {
    return res;
  }

  // Fallback to secondary bucket if upload returned error
  if (FALLBACK_STORAGE_BUCKET && FALLBACK_STORAGE_BUCKET !== BOVICARE_STORAGE_BUCKET) {
    console.warn(`[BoviCare] Upload to ${BOVICARE_STORAGE_BUCKET} error (${res.error?.message}), falling back to ${FALLBACK_STORAGE_BUCKET}...`);
    const fallbackRes = await supabaseClient.storage.from(FALLBACK_STORAGE_BUCKET).upload(storagePath, fileBlob, options);
    if (!fallbackRes.error) {
      return fallbackRes;
    }
  }

  return res;
}

// Bilingual Support (English / Marathi मराठी) — Inspired by Flutter frontend
let currentLanguage = localStorage.getItem('bovicare_lang') || 'en';

const I18N = {
  en: {
    greeting: 'Good morning, Farmer <span class="wave-hand">👋</span>',
    greetingSubtitle: "Every cow matters. Let's check in on your herd.",
    tagline: 'YOUR FARM, HEALTHIER',
    heroTag: 'HERD HEALTH',
    heroHeadline: 'Healthy cows,<br>better tomorrow.',
    heroDesc: 'Spot changes early. Record observations. Care better.',
    heroCta: 'Start check',
    cowBadge: 'Healthy Herd',
    toggleLabel: 'मराठी'
  },
  mr: {
    greeting: 'शुभ प्रभात, शेतकरी <span class="wave-hand">👋</span>',
    greetingSubtitle: 'प्रत्येक गाय महत्त्वाची आहे. चला आपल्या कळपाची पाहणी करूया.',
    tagline: 'तुमचे शेत, अधिक निरोगी',
    heroTag: 'कळप आरोग्य',
    heroHeadline: 'निरोगी गाई,<br>उद्याचे सुख.',
    heroDesc: 'बदल लवकर ओळखा. नोंदी ठेवा. चांगली काळजी घ्या.',
    heroCta: 'तपासणी सुरू करा',
    cowBadge: 'निरोगी कळप',
    toggleLabel: 'English'
  }
};

function applyLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('bovicare_lang', lang);
  const dict = I18N[lang] || I18N.en;

  const gTitle = document.getElementById('greetingTitle');
  if (gTitle) gTitle.innerHTML = dict.greeting;

  const gSub = document.getElementById('greetingSubtitle');
  if (gSub) gSub.textContent = dict.greetingSubtitle;

  const hTag = document.getElementById('heroTagText');
  if (hTag) hTag.textContent = dict.heroTag;

  const hHead = document.getElementById('heroHeadline');
  if (hHead) hHead.innerHTML = dict.heroHeadline;

  const hDesc = document.getElementById('heroDesc');
  if (hDesc) hDesc.textContent = dict.heroDesc;

  const hCta = document.getElementById('heroCtaText');
  if (hCta) hCta.textContent = dict.heroCta;

  const cowBadge = document.getElementById('heroCowBadgeText');
  if (cowBadge) cowBadge.textContent = dict.cowBadge;

  const toggleBtn = document.getElementById('langToggleText');
  if (toggleBtn) toggleBtn.textContent = dict.toggleLabel;
}

function toggleLanguage() {
  const nextLang = currentLanguage === 'en' ? 'mr' : 'en';
  applyLanguage(nextLang);
}

// Initialize app on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  applyLanguage(currentLanguage);
  renderHerdSummary();
  renderAllCowsGrid();
  renderRecordsTimeline();
  updateCasesHeaderAndFilters();
  loadCasesFromBackend(0);
  populateCowDropdown();
  updateMetricCounters();

  // Initialize Supabase if available
  await initBoviCareBackend();
});

// Initialize Backend Connection & Session Listener
async function initBoviCareBackend() {
  if (typeof initSupabase === 'function') {
    initSupabase();
  }

  updateCloudStatusUI();

  if (isSupabaseConfigured()) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        currentSession = session;
        await syncUserProfile(session.user);
      }

      // Listen for auth changes
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        currentSession = session;
        if (session) {
          await syncUserProfile(session.user);
        } else {
          currentProfile = null;
          currentFarm = null;
          signedUrlCache.clear();
          renderStorageAdvisory(0);
          updateCloudStatusUI();
          renderHerdSummary();
          renderAllCowsGrid();
          updateMetricCounters();
        }
      });
    } catch (err) {
      console.warn('[BoviCare] Auth session check error:', err);
    }
  }
}

// Sync user profile & active farm
async function syncUserProfile(user) {
  if (!user || !supabaseClient) return;

  try {
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .select('id, full_name, role, is_verified_vet, avatar_url')
      .eq('id', user.id)
      .maybeSingle();

    if (profile) {
      currentProfile = profile;
      if (profile.role === 'veterinarian') {
        switchRole('vet');
      } else {
        switchRole('farmer');
      }
    }

    // Ensure active farm for farmer
    if (!profile || profile.role === 'farmer') {
      await ensureActiveFarm(user.id);
    }

    updateCloudStatusUI();
    await loadCattleFromBackend(0);
    updateCasesHeaderAndFilters();
    await loadCasesFromBackend(0);
    await checkFarmStorageUsage();
    showToast(`Connected as ${currentProfile ? currentProfile.full_name : user.email}`);
  } catch (err) {
    console.error('[BoviCare] Error syncing profile:', err);
    showToast('Failed to sync user profile. Working in offline cache.');
  }
}

// Update Header & Sidebar Connection Badges
function updateCloudStatusUI() {
  const dot = document.getElementById('cloudDot');
  const label = document.getElementById('cloudStatusLabel');
  const sideDot = document.getElementById('sidebarStatusDot');
  const sideText = document.getElementById('sidebarStatusText');

  const configured = isSupabaseConfigured();
  const loggedIn = Boolean(currentSession && currentSession.user);

  if (dot && label) {
    if (loggedIn) {
      dot.className = 'cloud-dot connected';
      label.textContent = currentProfile ? currentProfile.full_name.split(' ')[0] : 'Connected';
    } else if (configured) {
      dot.className = 'cloud-dot';
      label.textContent = 'Sign In';
    } else {
      dot.className = 'cloud-dot';
      label.textContent = 'Local Mode';
    }
  }

  if (sideDot && sideText) {
    if (loggedIn) {
      sideDot.className = 'status-indicator-dot online';
      sideText.textContent = `Cloud: ${currentProfile ? currentProfile.role : 'Active'}`;
    } else if (configured) {
      sideDot.className = 'status-indicator-dot';
      sideText.textContent = 'Supabase: Guest';
    } else {
      sideDot.className = 'status-indicator-dot';
      sideText.textContent = 'Storage: Local Demo';
    }
  }

  // Update Auth Modal Profile Section
  const loggedInView = document.getElementById('authLoggedInView');
  const loginForm = document.getElementById('authLoginForm');
  const userNameEl = document.getElementById('authUserNameDisplay');
  const userEmailEl = document.getElementById('authUserEmailDisplay');
  const userRoleEl = document.getElementById('authUserRoleDisplay');
  const farmMetaEl = document.getElementById('authFarmMeta');

  if (loggedInView && loginForm) {
    if (loggedIn) {
      loggedInView.style.display = 'block';
      loginForm.style.display = 'none';
      if (userNameEl) userNameEl.textContent = currentProfile ? currentProfile.full_name : 'User';
      if (userEmailEl) userEmailEl.textContent = currentSession.user.email;
      if (userRoleEl) userRoleEl.textContent = `● ${currentProfile ? currentProfile.role.toUpperCase() : 'USER'}`;
      if (farmMetaEl) farmMetaEl.innerHTML = `Active Farm: <strong>${currentFarm ? currentFarm.name : 'Primary Farm'}</strong>`;
    } else {
      loggedInView.style.display = 'none';
      loginForm.style.display = 'block';
    }
  }
}

// Monitor Farm Udder Photos Storage Usage for Supabase Free Tier (Internal Target < 600 MB)
async function checkFarmStorageUsage() {
  if (!isSupabaseConfigured() || !currentFarm) return;
  try {
    const { data, error } = await supabaseClient
      .from('udder_images')
      .select('file_size_bytes')
      .eq('farm_id', currentFarm.id);
    if (error || !data) return;

    const totalBytes = data.reduce((acc, row) => acc + (row.file_size_bytes || 0), 0);
    const totalMB = totalBytes / (1024 * 1024);
    renderStorageAdvisory(totalMB);
  } catch (e) {
    console.warn('[BoviCare] Storage check warning:', e);
  }
}

function renderStorageAdvisory(totalMB) {
  const containerFarmer = document.getElementById('storageAdvisoryContainerFarmer');
  const containerCases = document.getElementById('storageAdvisoryContainerCases');
  if (!containerFarmer && !containerCases) return;

  // Safe internal target: 600 MB. Trigger proactive warning when approaching 500 MB (~83%)
  const isApproaching = totalMB >= 500;
  if (!isApproaching || totalMB <= 0) {
    if (containerFarmer) containerFarmer.style.display = 'none';
    if (containerCases) containerCases.style.display = 'none';
    return;
  }

  const html = `
    <div class="storage-advisory-banner">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
      <div>
        <strong>Storage Advisory (Supabase Free Tier):</strong> Farm udder photographs have reached 
        <strong>${totalMB.toFixed(1)} MB</strong>, approaching the internal 600 MB target limit. 
        Please pause optional uploads or archive resolved cases to avoid hitting project limits.
      </div>
    </div>
  `;

  if (containerFarmer) {
    containerFarmer.innerHTML = html;
    containerFarmer.style.display = 'block';
  }
  if (containerCases) {
    containerCases.innerHTML = html;
    containerCases.style.display = 'block';
  }
}

// Fetch Cattle from Supabase with Pagination & Lean Columns
async function loadCattleFromBackend(page = 0, append = false) {
  if (!isSupabaseConfigured() || !currentFarm) {
    // Local memory fallback
    liveCattleList = initialCows;
    totalCattleCount = initialCows.length;
    renderHerdSummary();
    renderAllCowsGrid();
    updateMetricCounters();
    return;
  }

  try {
    let query = supabaseClient
      .from('cows')
      .select('id, farm_id, tag_number, name, breed, lactation_stage, daily_yield_liters, status, photo_storage_path, updated_at', { count: 'exact' })
      .eq('farm_id', currentFarm.id);

    // Health filter
    if (activeFilter !== 'all') {
      query = query.eq('status', activeFilter);
    }

    // Species filter
    if (activeSpecies === 'cow') {
      query = query.not('breed', 'ilike', '%buffalo%');
    } else if (activeSpecies === 'buffalo') {
      query = query.ilike('breed', '%buffalo%');
    }

    // Pagination (fetch only necessary slice)
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    totalCattleCount = count || 0;
    currentPage = page;

    // Transform Supabase rows to client model
    const mapped = (data || []).map(row => ({
      id: row.id,
      name: row.name,
      tag: row.tag_number,
      breed: row.breed,
      status: row.status,
      statusText: row.status === 'healthy' ? 'Healthy' : (row.status === 'to_monitor' || row.status === 'monitor' ? 'To monitor' : 'Under treatment'),
      lastChecked: 'Recently',
      lactation: row.lactation_stage,
      dailyYield: `${row.daily_yield_liters} L/day`,
      photo: row.photo_storage_path || COW_FALLBACK_SVG
    }));

    if (append) {
      liveCattleList = [...liveCattleList, ...mapped];
    } else {
      liveCattleList = mapped;
    }

    renderHerdSummary();
    renderAllCowsGrid();
    updateMetricCounters();
    renderPaginationBar();
  } catch (err) {
    console.error('[BoviCare] Error loading cattle:', err);
    showToast(err.message || 'Error fetching cattle records.');
  }
}

// Render pagination bar
function renderPaginationBar() {
  const bar = document.getElementById('cowsPaginationBar');
  const meta = document.getElementById('paginationMeta');
  const btn = document.getElementById('btnLoadMoreCows');
  if (!bar || !meta || !btn) return;

  if (totalCattleCount <= PAGE_SIZE) {
    bar.style.display = 'none';
    return;
  }

  bar.style.display = 'flex';
  const displayed = liveCattleList.length;
  meta.textContent = `Showing ${displayed} of ${totalCattleCount} animals`;

  if (displayed >= totalCattleCount) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'inline-flex';
  }
}

function loadMoreCows() {
  loadCattleFromBackend(currentPage + 1, true);
}

// Update top statistics counters
function updateMetricCounters() {
  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;
  const total = totalCattleCount || source.length;
  const healthy = source.filter(c => c.status === 'healthy').length;
  const monitor = source.filter(c => c.status === 'monitor' || c.status === 'to_monitor' || c.status === 'treatment').length;

  const totalEl = document.getElementById('statTotalCows');
  const healthyEl = document.getElementById('statHealthyCows');
  const monitorEl = document.getElementById('statMonitorCows');

  if (totalEl) totalEl.textContent = total;
  if (healthyEl) healthyEl.textContent = healthy;
  if (monitorEl) monitorEl.textContent = monitor;

  // Filter count labels
  const filterAllEl = document.getElementById('countFilterAll');
  const filterHealthyEl = document.getElementById('countFilterHealthy');
  const filterMonitorEl = document.getElementById('countFilterMonitor');
  const filterTreatmentEl = document.getElementById('countFilterTreatment');

  if (filterAllEl) filterAllEl.textContent = total;
  if (filterHealthyEl) filterHealthyEl.textContent = healthy;
  if (filterMonitorEl) filterMonitorEl.textContent = monitor;
  if (filterTreatmentEl) filterTreatmentEl.textContent = source.filter(c => c.status === 'treatment').length;

  const pendingCount = casesList.filter(c => c.status === 'Awaiting Review').length;
  const pendingEl = document.getElementById('pendingReviewCount');
  if (pendingEl) pendingEl.textContent = pendingCount;
}

const COW_FALLBACK_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='16' fill='%23EAF6EE'/%3E%3Ccircle cx='50' cy='50' r='32' fill='%23D5EDE0'/%3E%3Ctext x='50' y='60' font-size='34' text-anchor='middle'%3E%F0%9F%90%84%3C/text%3E%3C/svg%3E";

// Render "Your Cows" horizontal scroll on Farmer Home (Exact Reference Replica)
function renderHerdSummary() {
  const container = document.getElementById('cowsSummaryContainer');
  if (!container) return;

  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;

  container.innerHTML = source.slice(0, 5).map(cow => `
    <div class="cow-card-compact" onclick="viewCowDetail('${cow.id}')">
      <img src="${cow.photo}" alt="${cow.name}" class="cow-thumb" onerror="this.src=COW_FALLBACK_SVG">
      <div class="cow-meta">
        <div class="cow-header-row">
          <span class="cow-name">${cow.name}</span>
          <span class="cow-tag">${cow.tag}</span>
        </div>
        <div class="status-badge ${cow.status}">
          <span class="status-dot"></span>
          <span>${cow.statusText}</span>
        </div>
        <span class="cow-last-checked">Last checked ${cow.lastChecked}</span>
      </div>
      <div class="cow-card-chevron">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  `).join('');
}

// Render Full Herd Grid in "My Cows" View
function renderAllCowsGrid() {
  const grid = document.getElementById('allCowsGrid');
  if (!grid) return;

  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;

  let filtered = source;
  if (!isSupabaseConfigured() || !currentFarm) {
    if (activeFilter !== 'all') {
      filtered = filtered.filter(c => c.status === activeFilter);
    }
    if (activeSpecies === 'cow') {
      filtered = filtered.filter(c => !c.breed.toLowerCase().includes('buffalo'));
    } else if (activeSpecies === 'buffalo') {
      filtered = filtered.filter(c => c.breed.toLowerCase().includes('buffalo'));
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 36px 16px; background: #FFFFFF; border-radius: 16px; border: 1px dashed var(--color-border);">
        <p style="font-size: 15px; font-weight: 700; color: var(--color-text-main); margin-bottom: 4px;">No livestock found</p>
        <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 14px;">No animals match the selected filters on this farm.</p>
        <button type="button" class="btn-primary" onclick="openAddCowModal()">Register Animal</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(cow => {
    const isBuffalo = cow.breed.toLowerCase().includes('buffalo');
    return `
      <div class="cattle-card-full" onclick="viewCowDetail('${cow.id}')">
        <img src="${cow.photo}" alt="${cow.name}" class="cattle-card-img" onerror="this.src=COW_FALLBACK_SVG">
        <div class="cattle-card-details">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <span class="cattle-card-tag">${cow.tag}</span>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: #F1F5F2; color: var(--color-text-muted);">
              ${isBuffalo ? '🐃 Buffalo' : '🐄 Cow'}
            </span>
          </div>
          <h4 class="cattle-card-name">${cow.name}</h4>
          <p style="font-size: 11.5px; color: var(--color-text-muted); margin-bottom: 4px;">${cow.breed}</p>
          <div class="status-badge ${cow.status}">
            <span class="status-dot"></span>
            <span>${cow.statusText}</span>
          </div>
          <div class="cattle-specs-row">
            <span>Lactation: ${cow.lactation}</span>
            <span>Yield: ${cow.dailyYield}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Cattle by Health Status
function filterCows(status) {
  activeFilter = status;

  document.querySelectorAll('.status-filters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.filter === status);
  });

  if (isSupabaseConfigured() && currentFarm) {
    loadCattleFromBackend(0);
  } else {
    renderAllCowsGrid();
  }
}

// Filter Cattle by Species (Cow vs Buffalo)
function filterSpecies(species) {
  activeSpecies = species;

  document.querySelectorAll('.species-filters .filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.species === species);
  });

  if (isSupabaseConfigured() && currentFarm) {
    loadCattleFromBackend(0);
  } else {
    renderAllCowsGrid();
  }
}

// Navigation Handler
function navigateTo(viewKey) {
  // Hide all views
  document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active'));

  // Update desktop navigation links
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.nav === viewKey);
  });

  // Update mobile bottom nav tabs
  document.querySelectorAll('.mobile-bottom-nav .nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === viewKey);
  });

  // Show selected view
  const targetMap = {
    home: 'viewFarmer',
    cows: 'viewCows',
    records: 'viewRecords',
    cases: 'viewCases'
  };

  const targetId = targetMap[viewKey] || 'viewFarmer';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Switch Role (Farmer vs Veterinarian)
function switchRole(role) {
  activeRole = role;
  
  // Desktop pill states
  const farmerPill = document.getElementById('roleFarmerBtn');
  const vetPill = document.getElementById('roleVetBtn');
  if (farmerPill && vetPill) {
    farmerPill.classList.toggle('active', role === 'farmer');
    vetPill.classList.toggle('active', role === 'vet');
  }

  // Mobile indicator text
  const mobileText = document.getElementById('mobileRoleText');
  if (mobileText) {
    mobileText.textContent = role === 'farmer' ? '🌾 Farmer' : '🩺 Veterinarian';
  }

  updateCasesHeaderAndFilters();
  loadCasesFromBackend(0);

  if (role === 'vet') {
    navigateTo('cases');
    showToast("Switched to Veterinarian Clinical Portal");
  } else {
    navigateTo('home');
    showToast("Switched to Farmer Dashboard");
  }
}

function toggleMobileRole() {
  switchRole(activeRole === 'farmer' ? 'vet' : 'farmer');
}

let recordsCurrentPage = 0;
const RECORDS_PAGE_SIZE = 6;
let totalFarmRecordsCount = 0;
let liveFarmRecordsList = [];

// Render Historical Timeline in Records (Supabase & Local Fallback)
async function renderRecordsTimeline(page = 0, append = false) {
  const container = document.getElementById('recordsTimelineContainer');
  const paginationBar = document.getElementById('recordsPaginationBar');
  const paginationMeta = document.getElementById('recordsPaginationMeta');
  const btnLoadMore = document.getElementById('btnLoadMoreRecords');
  if (!container) return;

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentFarm) {
    try {
      const from = page * RECORDS_PAGE_SIZE;
      const to = from + RECORDS_PAGE_SIZE - 1;

      const { data, count, error } = await supabaseClient
        .from('health_records')
        .select('id, cow_id, record_type, details, recorded_at, cows:cow_id (name, tag_number, breed)', { count: 'exact' })
        .eq('farm_id', currentFarm.id)
        .order('recorded_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      totalFarmRecordsCount = count || 0;
      recordsCurrentPage = page;

      const mapped = (data || []).map(r => ({
        id: r.id,
        date: new Date(r.recorded_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        cowName: r.cows ? `${r.cows.name} (${r.cows.tag_number})` : 'Animal Record',
        type: r.record_type,
        details: r.details,
        status: r.record_type.toLowerCase().includes('mastitis') || r.record_type.toLowerCase().includes('flagged') ? 'To Monitor' : 'Healthy'
      }));

      if (append) {
        liveFarmRecordsList = [...liveFarmRecordsList, ...mapped];
      } else {
        liveFarmRecordsList = mapped;
      }

      if (liveFarmRecordsList.length === 0) {
        container.innerHTML = `
          <div class="case-card" style="text-align: center; padding: 28px 16px;">
            <p style="font-size: 14px; font-weight: 700; color: var(--color-text-main); margin-bottom: 4px;">No health records yet</p>
            <p style="font-size: 12.5px; color: var(--color-text-muted); margin-bottom: 12px;">Health events and observations for your herd will appear here.</p>
            <button type="button" class="btn-primary" onclick="openAssessmentWizard()">Start First Assessment</button>
          </div>
        `;
        if (paginationBar) paginationBar.style.display = 'none';
        return;
      }

      renderRecordsCards(container, liveFarmRecordsList);

      if (paginationBar && paginationMeta && btnLoadMore) {
        if (totalFarmRecordsCount > RECORDS_PAGE_SIZE) {
          paginationBar.style.display = 'flex';
          paginationMeta.textContent = `Showing ${liveFarmRecordsList.length} of ${totalFarmRecordsCount} records`;
          btnLoadMore.style.display = liveFarmRecordsList.length >= totalFarmRecordsCount ? 'none' : 'inline-flex';
        } else {
          paginationBar.style.display = 'none';
        }
      }
      return;
    } catch (err) {
      console.warn('[BoviCare] Error loading health records from Supabase:', err);
    }
  }

  // LOCAL FALLBACK
  renderRecordsCards(container, recordsList);
  if (paginationBar) paginationBar.style.display = 'none';
}

function renderRecordsCards(container, records) {
  container.innerHTML = records.map(rec => `
    <div class="case-card" style="margin-bottom: 12px;">
      <div class="case-card-header">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: var(--color-primary);">${rec.date}</span>
          <h4 class="case-card-title">${rec.cowName}</h4>
        </div>
        <span class="status-badge ${rec.status === 'Healthy' ? 'healthy' : 'monitor'}">
          <span class="status-dot"></span>
          <span>${rec.status}</span>
        </span>
      </div>
      <p style="font-size: 13px; color: var(--color-text-main); font-weight: 600; margin-bottom: 4px;">${rec.type}</p>
      <p style="font-size: 12.5px; color: var(--color-text-muted);">${rec.details}</p>
    </div>
  `).join('');
}

function loadMoreRecords() {
  renderRecordsTimeline(recordsCurrentPage + 1, true);
}

let casesCurrentPage = 0;
const CASES_PAGE_SIZE = 5;
let totalCasesCount = 0;
let liveCasesList = [];
let activeCaseFilter = 'all';

// Format Case Status for Display
function formatCaseStatus(status) {
  const map = {
    open: 'Awaiting Review',
    under_review: 'Under Review',
    treatment_prescribed: 'Prescription Provided',
    monitoring: 'Under Monitoring',
    resolved: 'Resolved',
    escalated: 'Escalated (Urgent)'
  };
  return map[status] || (status ? status.replace(/_/g, ' ') : 'Open');
}

// Format Urgency for Display
function formatUrgency(urgency) {
  const map = {
    critical: 'CRITICAL',
    urgent: 'URGENT',
    monitor: 'MONITOR',
    routine: 'ROUTINE'
  };
  return map[urgency] || (urgency ? urgency.toUpperCase() : 'ROUTINE');
}

// Update Case Workspace Headers & Filter Chips based on Active Role
function updateCasesHeaderAndFilters() {
  const badge = document.getElementById('casesRoleBadge');
  const title = document.getElementById('casesPageTitle');
  const subtitle = document.getElementById('casesPageSubtitle');
  const filterChips = document.getElementById('caseFilterChips');

  if (activeRole === 'vet') {
    if (badge) {
      badge.className = 'badge-role-vet';
      badge.style.background = '';
      badge.style.color = '';
      badge.textContent = 'VETERINARY CLINICAL WORKSPACE';
    }
    if (title) title.textContent = 'Clinical Case Triage & Review';
    if (subtitle) subtitle.textContent = 'Remote veterinary assistance, symptom evaluation, and prescription portal';

    if (filterChips) {
      filterChips.innerHTML = `
        <button type="button" class="filter-chip ${activeCaseFilter === 'all' ? 'active' : ''}" onclick="filterCases('all')">All Cases</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'urgent' ? 'active' : ''}" onclick="filterCases('urgent')">Urgent Triage</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'open_queue' ? 'active' : ''}" onclick="filterCases('open_queue')">Open Queue</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'my_assigned' ? 'active' : ''}" onclick="filterCases('my_assigned')">My Assigned</button>
      `;
    }
  } else {
    if (badge) {
      badge.className = 'badge-role-vet';
      badge.style.background = '#EAF7EE';
      badge.style.color = '#15803D';
      badge.textContent = 'HERD HEALTH MANAGEMENT';
    }
    if (title) title.textContent = 'Mastitis Cases & Vet Consultations';
    if (subtitle) subtitle.textContent = 'Track case review status, diagnoses, and remote veterinary advice for your herd';

    if (filterChips) {
      filterChips.innerHTML = `
        <button type="button" class="filter-chip ${activeCaseFilter === 'all' ? 'active' : ''}" onclick="filterCases('all')">All Herd Cases</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'open' ? 'active' : ''}" onclick="filterCases('open')">Awaiting Review</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'under_care' ? 'active' : ''}" onclick="filterCases('under_care')">Under Treatment</button>
        <button type="button" class="filter-chip ${activeCaseFilter === 'resolved' ? 'active' : ''}" onclick="filterCases('resolved')">Resolved</button>
      `;
    }
  }
}

function filterCases(filterKey) {
  activeCaseFilter = filterKey;
  updateCasesHeaderAndFilters();
  loadCasesFromBackend(0);
}

// Diagnosis and Treatment Route Formatters (Stage 6)
function formatDiagnosisType(type) {
  const map = {
    clinical_mastitis: 'Acute Clinical Mastitis',
    subclinical_mastitis: 'Subclinical Mastitis (Elevated SCC)',
    trauma_injury: 'Teat / Udder Physical Trauma',
    healthy_non_mastitis: 'Healthy / Non-Mastitis (Cleared)'
  };
  return map[type] || (type ? type.replace(/_/g, ' ') : 'Clinical Mastitis');
}

function formatTreatmentRoute(route) {
  const map = {
    intramammary: 'Intramammary Infusion',
    intramuscular: 'Intramuscular (IM)',
    subcutaneous: 'Subcutaneous (SC)',
    oral: 'Oral Administration',
    topical: 'Topical Application'
  };
  return map[route] || route;
}

// Load Mastitis Cases from Supabase with Diagnoses, Treatment Plans & Follow-ups (Stage 6)
async function loadCasesFromBackend(page = 0, append = false) {
  const container = document.getElementById('vetQueueContainer');
  const paginationBar = document.getElementById('casesPaginationBar');
  const paginationMeta = document.getElementById('casesPaginationMeta');
  const btnLoadMore = document.getElementById('btnLoadMoreCases');
  if (!container) return;

  if (!isSupabaseConfigured()) {
    renderLocalCasesQueue();
    return;
  }

  try {
    const isVet = activeRole === 'vet' || (currentProfile && currentProfile.role === 'veterinarian');

    let query = supabaseClient
      .from('mastitis_cases')
      .select(`
        id,
        cow_id,
        farm_id,
        reported_by,
        assigned_vet_id,
        status,
        urgency,
        affected_quarters,
        symptoms_observed,
        farmer_notes,
        opened_at,
        resolved_at,
        updated_at,
        cows:cow_id (id, name, tag_number, breed),
        farms:farm_id (name),
        assigned_vet:assigned_vet_id (full_name, vet_license_number),
        udder_images (id, storage_path, quarter, image_category),
        consultations (id, consultation_channel, summary, conducted_at, vet_id),
        diagnoses (id, diagnosis, cmt_score, clinical_notes, confirmed_at, vet_id),
        treatment_plans (id, medication_protocol, route, dosage_instructions, milk_withdrawal_hours, meat_withdrawal_days, treatment_start, treatment_end),
        follow_ups (id, scheduled_date, is_completed, outcome_notes)
      `, { count: 'exact' });

    // Farmers are strictly scoped to their farm's records
    if (!isVet) {
      if (!currentFarm) {
        renderLocalCasesQueue();
        return;
      }
      query = query.eq('farm_id', currentFarm.id);

      if (activeCaseFilter === 'open') {
        query = query.in('status', ['open', 'under_review']);
      } else if (activeCaseFilter === 'under_care') {
        query = query.in('status', ['treatment_prescribed', 'monitoring']);
      } else if (activeCaseFilter === 'resolved') {
        query = query.eq('status', 'resolved');
      }
    } else {
      // Veterinarian queue filters
      if (activeCaseFilter === 'urgent') {
        query = query.in('urgency', ['urgent', 'critical']);
      } else if (activeCaseFilter === 'open_queue') {
        query = query.eq('status', 'open');
      } else if (activeCaseFilter === 'my_assigned' && currentSession?.user) {
        query = query.eq('assigned_vet_id', currentSession.user.id);
      }
    }

    const from = page * CASES_PAGE_SIZE;
    const to = from + CASES_PAGE_SIZE - 1;

    query = query
      .order('opened_at', { ascending: false })
      .range(from, to);

    const { data, count, error } = await query;
    if (error) throw error;

    totalCasesCount = count || 0;
    casesCurrentPage = page;

    // Generate time-limited signed URLs (1 hour validity) for private images with in-memory caching to minimize egress
    const casesWithSignedUrls = await Promise.all((data || []).map(async (row) => {
      let signedUrl = null;
      if (row.udder_images && row.udder_images.length > 0) {
        const primaryImage = row.udder_images[0];
        const cacheKey = primaryImage.storage_path;
        const cached = signedUrlCache.get(cacheKey);

        if (cached && cached.expiresAt > Date.now()) {
          signedUrl = cached.url;
        } else {
          try {
            const { data: urlData, error: urlErr } = await getSignedUdderImageUrl(primaryImage.storage_path, 3600);
            if (!urlErr && urlData?.signedUrl) {
              signedUrl = urlData.signedUrl;
              signedUrlCache.set(cacheKey, {
                url: signedUrl,
                expiresAt: Date.now() + 50 * 60 * 1000 // 50-minute cache window for 1-hour signed URL
              });
            }
          } catch (e) {
            console.warn('[BoviCare] Error creating signed URL for', primaryImage.storage_path, e);
          }
        }
      }

      const diagnosisRecord = (row.diagnoses && row.diagnoses.length > 0) ? row.diagnoses[0] : null;
      const treatmentRecord = (row.treatment_plans && row.treatment_plans.length > 0) ? row.treatment_plans[0] : null;
      const followUpRecord = (row.follow_ups && row.follow_ups.length > 0) ? row.follow_ups[0] : null;

      return {
        id: row.id,
        caseId: `CASE-${row.id.slice(0, 8).toUpperCase()}`,
        cowId: row.cow_id,
        farmId: row.farm_id,
        cowName: row.cows ? row.cows.name : 'Animal',
        cowTag: row.cows ? row.cows.tag_number : '—',
        breed: row.cows ? row.cows.breed : '—',
        farmName: row.farms ? row.farms.name : 'Farm',
        date: new Date(row.opened_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        rawDate: row.opened_at,
        quarters: row.affected_quarters || [],
        symptoms: row.symptoms_observed || [],
        notes: row.farmer_notes || '',
        status: row.status,
        urgency: row.urgency,
        assignedVetId: row.assigned_vet_id,
        assignedVetName: row.assigned_vet ? row.assigned_vet.full_name : null,
        image: signedUrl,
        images: row.udder_images || [],
        consultations: row.consultations || [],
        diagnosis: diagnosisRecord,
        treatmentPlan: treatmentRecord,
        followUp: followUpRecord,
        vetFeedback: row.consultations && row.consultations.length > 0 ? row.consultations[0].summary : null
      };
    }));

    if (append) {
      liveCasesList = [...liveCasesList, ...casesWithSignedUrls];
    } else {
      liveCasesList = casesWithSignedUrls;
    }

    renderCasesCards(container, liveCasesList, isVet);
    updateCaseCounters();

    if (paginationBar && paginationMeta && btnLoadMore) {
      paginationBar.style.display = totalCasesCount > CASES_PAGE_SIZE ? 'flex' : 'none';
      const loadedCount = Math.min(totalCasesCount, (page + 1) * CASES_PAGE_SIZE);
      paginationMeta.textContent = `Showing ${loadedCount} of ${totalCasesCount} cases`;
      btnLoadMore.style.display = loadedCount < totalCasesCount ? 'inline-flex' : 'none';
    }
  } catch (err) {
    console.error('[BoviCare] Error loading cases from Supabase:', err);
    container.innerHTML = `
      <div class="case-card" style="text-align: center; padding: 24px;">
        <p style="font-weight: 700; color: #991B1B;">Unable to load clinical cases</p>
        <p style="font-size: 12.5px; color: var(--color-text-muted); margin-top: 4px;">${err.message || 'Please check network connection or permissions.'}</p>
        <button type="button" class="btn-secondary" style="margin-top: 12px;" onclick="loadCasesFromBackend(0)">Retry</button>
      </div>
    `;
  }
}

function loadMoreCases() {
  loadCasesFromBackend(casesCurrentPage + 1, true);
}

// Render Cases List to DOM (Stage 6)
function renderCasesCards(container, cases, isVet) {
  if (cases.length === 0) {
    container.innerHTML = `
      <div class="case-card" style="text-align: center; padding: 28px 16px;">
        <p style="font-size: 14px; font-weight: 700; color: var(--color-text-main); margin-bottom: 4px;">No cases found in this category</p>
        <p style="font-size: 12.5px; color: var(--color-text-muted); margin-bottom: 12px;">All cattle in this filter are healthy or have no pending reviews.</p>
        ${!isVet ? `<button type="button" class="btn-primary" onclick="openAssessmentWizard()">Start New Assessment</button>` : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = cases.map(c => {
    const caseId = c.id || c.caseId;
    const consultationHtml = (c.consultations && c.consultations.length > 0)
      ? `
        <div class="consultation-thread-box">
          <div class="consultation-thread-header">
            <span>🩺 <strong>Veterinary Telehealth Summary</strong></span>
            <span style="font-size: 11px; color: var(--color-text-subtle);">${c.consultations[0].conducted_at ? new Date(c.consultations[0].conducted_at).toLocaleDateString() : 'Recent'}</span>
          </div>
          <p class="consultation-thread-summary">${c.consultations[0].summary}</p>
        </div>
      `
      : `
        <div class="consultation-pending-note">
          <span>⏳ <em>Awaiting veterinarian triage & remote evaluation</em></span>
        </div>
      `;

    const diagnosisHtml = c.diagnosis
      ? `
        <div class="diagnosis-summary-badge">
          🩺 <strong>Confirmed Diagnosis:</strong> ${formatDiagnosisType(c.diagnosis.diagnosis)} ${c.diagnosis.cmt_score ? `• CMT: ${c.diagnosis.cmt_score}` : ''}
        </div>
      `
      : '';

    const treatmentHtml = c.treatmentPlan
      ? `
        <div class="treatment-plan-card">
          <div class="treatment-plan-header">
            <strong>💊 Prescribed Rx: ${c.treatmentPlan.medication_protocol} (${formatTreatmentRoute(c.treatmentPlan.route)})</strong>
            <span class="withdrawal-badge">🥛 MILK WITHDRAWAL: ${c.treatmentPlan.milk_withdrawal_hours}H</span>
          </div>
          <p style="font-size: 12px; margin-top: 4px; color: var(--color-text-main);"><strong>Dosage:</strong> ${c.treatmentPlan.dosage_instructions}</p>
          <div style="font-size: 11px; color: #92400E; margin-top: 3px;">
            Meat Withdrawal: ${c.treatmentPlan.meat_withdrawal_days}d • ${c.treatmentPlan.treatment_start} to ${c.treatmentPlan.treatment_end || 'End of Regimen'}
          </div>
        </div>
      `
      : '';

    const followUpHtml = c.followUp
      ? `
        <div class="follow-up-badge">
          <span>📅 <strong>Scheduled Follow-Up:</strong> ${c.followUp.scheduled_date} ${c.followUp.is_completed ? '✅ (Completed)' : '⏳ (Pending Re-evaluation)'}</span>
          ${(isVet && !c.followUp.is_completed) ? `
            <button type="button" class="btn-secondary" style="font-size: 10.5px; padding: 2px 7px; background: #FFFFFF;" onclick="completeFollowUp('${c.id}', '${c.followUp.id}')">
              Mark Completed
            </button>
          ` : ''}
        </div>
      `
      : '';

    return `
      <div class="case-card ${c.urgency || 'routine'}">
        <div class="case-card-header">
          <div>
            <div class="case-header-meta-row">
              <span style="font-size: 11.5px; color: var(--color-text-subtle); font-weight: 700;">${c.caseId} • ${c.date} ${c.farmName ? `• ${c.farmName}` : ''}</span>
            </div>
            <h4 class="case-card-title">${c.cowName} (${c.cowTag}) — ${c.breed}</h4>
          </div>
          <div class="case-badges-group">
            <span class="case-badge-${c.urgency}">${formatUrgency(c.urgency)}</span>
            <span class="case-status-pill ${c.status}">${formatCaseStatus(c.status)}</span>
          </div>
        </div>

        <div class="case-body-preview">
          ${c.image ? `
            <img src="${c.image}" class="case-img-preview" alt="Private udder photo" loading="lazy" decoding="async" onclick="openCaseDetailsModal('${caseId}')" title="Click to view full photo">
          ` : ''}
          <div class="case-summary-text">
            <p><strong>Affected Quarters:</strong> ${c.quarters.length > 0 ? c.quarters.join(', ') : 'All / General'}</p>
            <div class="case-tags-wrap">
              ${c.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}
            </div>
            ${c.notes ? `<p style="margin-top: 6px;"><em>"${c.notes}"</em></p>` : ''}
            ${diagnosisHtml}
            ${treatmentHtml}
            ${followUpHtml}
            ${consultationHtml}
          </div>
        </div>

        <div class="case-card-actions">
          ${isVet ? `
            ${c.status === 'open' ? `
              <button type="button" class="btn-secondary" onclick="claimCase('${caseId}')">
                <span>Claim Case</span>
              </button>
            ` : ''}
            <button type="button" class="btn-primary" onclick="openVetReviewModal('${caseId}')">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>Clinical Evaluation & Treatment Plan</span>
            </button>
          ` : `
            <button type="button" class="btn-secondary" onclick="openCaseDetailsModal('${caseId}')">
              <span>View Case Details</span>
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

// Local Memory Fallback for Offline Queue
function renderLocalCasesQueue() {
  const container = document.getElementById('vetQueueContainer');
  if (!container) return;
  const isVet = activeRole === 'vet';
  renderCasesCards(container, casesList, isVet);
  updateCaseCounters();
}

// Update Case Metric Counters in Header
function updateCaseCounters() {
  const pendingEl = document.getElementById('pendingReviewCount');
  const resolvedEl = document.getElementById('resolvedReviewCount');
  const list = liveCasesList.length > 0 ? liveCasesList : casesList;

  if (list && list.length > 0) {
    const pending = list.filter(c => c.status === 'open' || c.status === 'under_review' || c.status === 'Awaiting Review').length;
    const completed = list.filter(c => c.status === 'resolved' || c.status === 'monitoring' || c.status === 'Resolved' || c.status === 'Healthy').length;
    if (pendingEl) pendingEl.textContent = pending;
    if (resolvedEl) resolvedEl.textContent = completed;
  } else {
    if (pendingEl) pendingEl.textContent = '0';
    if (resolvedEl) resolvedEl.textContent = '0';
  }
}

// Veterinarian Claims Open Case
async function claimCase(caseId) {
  if (!isSupabaseConfigured() || !currentSession?.user) {
    const localCase = casesList.find(c => c.id === caseId || c.caseId === caseId);
    if (localCase) {
      localCase.status = 'under_review';
      renderLocalCasesQueue();
      showToast('Demo: Case claimed and set to Under Review.');
      return;
    }
    showToast('Signed in veterinarian session required.');
    return;
  }

  try {
    const { error } = await supabaseClient
      .from('mastitis_cases')
      .update({
        assigned_vet_id: currentSession.user.id,
        status: 'under_review',
        updated_at: new Date().toISOString()
      })
      .eq('id', caseId);

    if (error) throw error;
    showToast('Case claimed and set to Under Review.');
    await loadCasesFromBackend(0);
  } catch (err) {
    console.error('[BoviCare] Error claiming case:', err);
    showToast(err.message || 'Error claiming case.');
  }
}

// Populate Cow Dropdown in Assessment Modal
function populateCowDropdown() {
  const select = document.getElementById('cowSelect');
  if (!select) return;

  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;
  select.innerHTML = '<option value="">Select cow from herd...</option>' + 
    source.map(cow => `<option value="${cow.id}">${cow.name} (${cow.tag}) — ${cow.breed}</option>`).join('');
}

function handleCowSelectChange(selectEl) {
  const cowId = selectEl.value;
  const metaContainer = document.getElementById('selectedCowMeta');
  if (!metaContainer) return;

  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;
  const cow = source.find(c => c.id === cowId) || initialCows.find(c => c.id === cowId);
  if (cow) {
    setWizardStep(2);
    metaContainer.style.display = 'block';
    metaContainer.innerHTML = `
      <div style="background: var(--color-mint-bg); padding: 8px 12px; border-radius: 8px; font-size: 12px; margin-top: 6px; color: var(--color-primary-dark);">
        <strong>${cow.name}</strong> • ${cow.breed} • Current Status: <strong>${cow.statusText}</strong> • Yield: ${cow.dailyYield}
      </div>
    `;
  } else {
    setWizardStep(1);
    metaContainer.style.display = 'none';
  }
}

// Quarter Selection Toggle
function toggleQuarter(btn) {
  btn.classList.toggle('selected');
  const statusSpan = btn.querySelector('.quarter-status');
  if (statusSpan) {
    statusSpan.textContent = btn.classList.contains('selected') ? 'Affected' : 'Normal';
  }
  const hasSelectedQuarters = document.querySelectorAll('.quarter-box.selected').length > 0;
  if (hasSelectedQuarters) {
    setWizardStep(3);
  }
}

// File Upload Handling & WebP Compression (Stage 4)
let currentCompressedImageBlob = null;
let currentCompressedImageMetadata = null;

// HTML5 Canvas client-side compression targeting 200–350 KB WebP (strictly <= 1MB)
function compressImageToWebP(file, maxDimension = 1200) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image data.'));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Downscale while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas 2D context not available.'));
        }

        ctx.drawImage(img, 0, 0, width, height);

        // First attempt: WebP at 0.78 quality (aiming for 200–350 KB)
        const tryEncode = (mime, quality) => {
          return new Promise((res) => {
            canvas.toBlob((blob) => {
              if (blob) {
                res({ blob, mime });
              } else {
                // If WebP is unsupported, fallback to JPEG
                canvas.toBlob((jpegBlob) => {
                  res({ blob: jpegBlob, mime: 'image/jpeg' });
                }, 'image/jpeg', quality);
              }
            }, mime, quality);
          });
        };

        tryEncode('image/webp', 0.78).then(({ blob, mime }) => {
          if (!blob) {
            return reject(new Error('Image compression returned empty blob.'));
          }

          // If over 1MB hard cap (1048576 bytes), re-encode with lower quality (0.55)
          if (blob.size > 1048576) {
            return tryEncode(mime, 0.55).then(({ blob: smallerBlob, mime: smallerMime }) => {
              if (!smallerBlob || smallerBlob.size > 1048576) {
                return reject(new Error('Image exceeds the strict 1 MB limit for Supabase Free plan even after compression. Please crop or choose a smaller image.'));
              }
              const dataUrl = canvas.toDataURL(smallerMime, 0.55);
              resolve({
                blob: smallerBlob,
                mimeType: smallerMime,
                sizeBytes: smallerBlob.size,
                width,
                height,
                dataUrl
              });
            });
          }

          const dataUrl = canvas.toDataURL(mime, 0.78);
          resolve({
            blob,
            mimeType: mime,
            sizeBytes: blob.size,
            width,
            height,
            dataUrl
          });
        }).catch(reject);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function triggerFileUpload() {
  const input = document.getElementById('udderImageInput');
  if (input) input.click();
}

async function handleImageFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Duplicate upload check
    const fingerprint = `${file.name}_${file.size}_${file.lastModified}`;
    if (lastUploadedImageFingerprint && fingerprint === lastUploadedImageFingerprint) {
      if (!confirm('This exact photograph was already uploaded in your recent assessment. Do you want to select it again?')) {
        removeSelectedImage();
        return;
      }
    }
    currentImageFingerprint = fingerprint;

    const badge = document.getElementById('compressionBadge');
    const previewEl = document.getElementById('imagePreviewEl');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const dropzoneContent = document.getElementById('dropzoneContent');

    if (badge) badge.textContent = 'Compressing...';
    if (previewContainer) previewContainer.style.display = 'block';
    if (dropzoneContent) dropzoneContent.style.display = 'none';

    try {
      const result = await compressImageToWebP(file);
      currentCompressedImageBlob = result.blob;
      currentCompressedImageMetadata = {
        mimeType: result.mimeType,
        sizeBytes: result.sizeBytes,
        width: result.width,
        height: result.height
      };
      currentSelectedImageBase64 = result.dataUrl;

      if (previewEl) previewEl.src = result.dataUrl;
      setWizardStep(5);
      if (badge) {
        const kb = (result.sizeBytes / 1024).toFixed(0);
        const origKb = (file.size / 1024).toFixed(0);
        const formatLabel = result.mimeType === 'image/webp' ? 'WebP' : 'JPEG';
        badge.textContent = `Optimized: ${kb} KB (${formatLabel}) [was ${origKb} KB]`;
      }
    } catch (err) {
      console.error('[BoviCare] Image compression error:', err);
      alert(err.message || 'Unable to process the selected image. Please try a different photo.');
      removeSelectedImage();
    }
  }
}

function removeSelectedImage(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  currentSelectedImageBase64 = null;
  currentCompressedImageBlob = null;
  currentCompressedImageMetadata = null;
  const input = document.getElementById('udderImageInput');
  const previewContainer = document.getElementById('imagePreviewContainer');
  const dropzoneContent = document.getElementById('dropzoneContent');

  if (input) input.value = '';
  if (previewContainer) previewContainer.style.display = 'none';
  if (dropzoneContent) dropzoneContent.style.display = 'block';
  setWizardStep(4);
}

// Real-time body temperature validation against normal bovine range (38.0 - 39.2°C)
function validateBodyTemp(input) {
  const badge = document.getElementById('bodyTempStatusBadge');
  if (!badge) return;

  const val = parseFloat(input.value);
  if (isNaN(val) || !input.value) {
    badge.className = 'vital-badge-status';
    badge.textContent = 'Normal';
    return;
  }

  setWizardStep(4);

  if (val > 39.2) {
    badge.className = 'vital-badge-status fever';
    badge.textContent = `Fever (>39.2°C)`;
  } else if (val < 38.0) {
    badge.className = 'vital-badge-status subnormal';
    badge.textContent = `Subnormal (<38.0°C)`;
  } else {
    badge.className = 'vital-badge-status';
    badge.textContent = `Normal (38.0–39.2°C)`;
  }
}

// Submit Udder Assessment, Create Mastitis Case & Upload Private Image (Stage 4)
async function submitAssessment(event) {
  event.preventDefault();
  const cowId = document.getElementById('cowSelect').value;
  if (!cowId) {
    alert("Please select an animal from your herd.");
    return;
  }

  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;
  const cow = source.find(c => c.id === cowId) || initialCows.find(c => c.id === cowId);
  if (!cow) return;

  const selectedBoxes = Array.from(document.querySelectorAll('.quarter-box.selected'));
  const validEnums = ['LF', 'RF', 'LR', 'RR'];
  const quarterEnums = selectedBoxes
    .map(el => el.dataset.quarter)
    .filter(q => validEnums.includes(q));

  const quarterNames = selectedBoxes.map(el => `${el.dataset.quarter} (${el.querySelector('.quarter-name').textContent})`);

  const bodyTemp = parseFloat(document.getElementById('inputBodyTemp')?.value) || 38.6;
  const udderTemp = document.getElementById('selectUdderTemp')?.value || 'Normal';
  const milkAppearance = document.getElementById('selectMilkAppearance')?.value || 'Normal';
  const udderSwelling = document.getElementById('selectUdderSwelling')?.value || 'None';
  const milkingPain = document.getElementById('selectMilkingPain')?.value || 'None';
  const yieldChange = document.getElementById('selectYieldChange')?.value || 'No Change';
  const notes = document.getElementById('assessmentNotes')?.value.trim() || '';
  const imageCategory = document.getElementById('selectImageCategory')?.value || 'udder_exterior';

  // Determine if clinical signs of mastitis or systemic illness are present
  const hasFever = bodyTemp > 39.2;
  const hasMilkAbnormality = milkAppearance !== 'Normal';
  const hasSwelling = udderSwelling !== 'None';
  const hasPain = milkingPain !== 'None';
  const hasYieldDrop = yieldChange !== 'No Change';
  const hasAffectedQuarter = quarterEnums.length > 0;
  const hasImage = Boolean(currentCompressedImageBlob);

  const isFlagged = hasAffectedQuarter || hasMilkAbnormality || hasSwelling || hasPain || hasYieldDrop || hasFever;
  const isUrgent = hasFever || hasMilkAbnormality || (udderSwelling === 'Severe Swelling & Stone-Hard') || (milkingPain === 'Severe Pain');
  const urgency = isUrgent ? 'urgent' : (isFlagged ? 'monitor' : 'routine');

  // Compose structured symptoms array for Postgres enum & query filtering
  const observedSymptoms = [];
  if (hasFever) observedSymptoms.push(`Elevated body temperature (${bodyTemp}°C)`);
  if (udderTemp !== 'Normal') observedSymptoms.push(`Udder surface heat: ${udderTemp}`);
  if (milkAppearance !== 'Normal') observedSymptoms.push(`Milk appearance: ${milkAppearance}`);
  if (udderSwelling !== 'None') observedSymptoms.push(`Udder swelling: ${udderSwelling}`);
  if (milkingPain !== 'None') observedSymptoms.push(`Milking discomfort: ${milkingPain}`);
  if (yieldChange !== 'No Change') observedSymptoms.push(`Yield change: ${yieldChange}`);
  if (quarterEnums.length > 0) observedSymptoms.push(`Quarters: ${quarterEnums.join(', ')}`);

  // Compose structured clinical observation record for health_records
  const vitalsLog = `[Vitals] Temp: ${bodyTemp}°C${hasFever ? ' (Fever)' : ''} | Udder Surface: ${udderTemp} | [Milk] ${milkAppearance} | [Udder] Swelling: ${udderSwelling}, Pain: ${milkingPain} | [Yield] ${yieldChange}${quarterNames.length > 0 ? ` | Quarters: ${quarterNames.join(', ')}` : ''}`;
  const fullDetails = notes ? `${vitalsLog} | Notes: ${notes}` : vitalsLog;

  // Prevent duplicate submissions
  const btnSubmit = document.getElementById('btnSubmitAssessment');
  const btnText = document.getElementById('btnSubmitAssessmentText');
  if (btnSubmit) btnSubmit.disabled = true;
  if (btnText) btnText.textContent = 'Saving Assessment...';

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentFarm) {
    try {
      const caseId = crypto.randomUUID();
      const shouldCreateCase = hasImage || isFlagged;

      if (shouldCreateCase) {
        // 1. Insert into public.mastitis_cases FIRST (required by storage RLS validation)
        const { error: caseErr } = await supabaseClient
          .from('mastitis_cases')
          .insert({
            id: caseId,
            cow_id: cow.id,
            farm_id: currentFarm.id,
            reported_by: currentSession ? currentSession.user.id : null,
            status: 'open',
            urgency: urgency,
            affected_quarters: quarterEnums.length > 0 ? quarterEnums : ['ALL'],
            symptoms_observed: observedSymptoms,
            farmer_notes: notes || null
          });

        if (caseErr) throw caseErr;

        // 2. Upload private image to bovicare-private-images Storage Bucket
        if (hasImage && currentCompressedImageMetadata) {
          if (btnText) btnText.textContent = 'Uploading Udder Photo...';

          const ext = currentCompressedImageMetadata.mimeType === 'image/webp' ? 'webp' : 'jpg';
          const filename = `${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
          const storagePath = `${currentFarm.id}/${cow.id}/${caseId}/${filename}`;

          const { error: uploadErr } = await uploadUdderImageObject(
            storagePath, 
            currentCompressedImageBlob, 
            {
              contentType: currentCompressedImageMetadata.mimeType,
              upsert: false
            }
          );

          if (uploadErr) {
            console.error('[BoviCare] Storage upload failed:', uploadErr);
            throw new Error(`Failed to upload private udder image: ${uploadErr.message}`);
          }

          // 3. Insert metadata record into public.udder_images
          const primaryQuarter = quarterEnums.length === 1 ? quarterEnums[0] : 'ALL';
          const { data: imgRecord, error: imgDbErr } = await supabaseClient
            .from('udder_images')
            .insert({
              case_id: caseId,
              cow_id: cow.id,
              farm_id: currentFarm.id,
              uploaded_by: currentSession ? currentSession.user.id : null,
              storage_path: storagePath,
              file_size_bytes: currentCompressedImageBlob.size,
              mime_type: currentCompressedImageMetadata.mimeType,
              quarter: primaryQuarter,
              image_category: imageCategory
            })
            .select()
            .single();

          if (imgDbErr) throw imgDbErr;

          // 4. Stage record in public.screening_results (Model Staged, no fake AI predictions)
          if (imgRecord) {
            await supabaseClient
              .from('screening_results')
              .insert({
                image_id: imgRecord.id,
                case_id: caseId,
                model_version: 'staged_v0',
                status: 'staged',
                is_mastitis_detected: null,
                confidence_score: null,
                is_active_model: false
              });
          }
        }
      }

      // 5. Insert into public.health_records for clinical history
      const recordType = shouldCreateCase
        ? (hasImage ? 'Mastitis Case & Udder Photograph' : 'Clinical Mastitis Observation')
        : 'Routine Health & Vital Check';

      const { error: recordErr } = await supabaseClient
        .from('health_records')
        .insert({
          cow_id: cow.id,
          farm_id: currentFarm.id,
          recorded_by: currentSession ? currentSession.user.id : null,
          record_type: recordType,
          details: fullDetails
        });

      if (recordErr) throw recordErr;

      // 6. If clinical symptoms observed, update cattle status to 'to_monitor'
      if (isFlagged && (cow.status === 'healthy' || cow.status === 'Healthy')) {
        await supabaseClient
          .from('cows')
          .update({ 
            status: 'to_monitor',
            updated_at: new Date().toISOString()
          })
          .eq('id', cow.id);
        
        cow.status = 'to_monitor';
        cow.statusText = 'To monitor';
      }

      if (hasImage && currentImageFingerprint) {
        lastUploadedImageFingerprint = currentImageFingerprint;
      }

      closeAssessmentWizard();
      await loadCattleFromBackend(0);
      await renderRecordsTimeline(0);
      updateMetricCounters();
      await checkFarmStorageUsage();
      showToast(hasImage 
        ? `Mastitis case & private udder photograph recorded securely.` 
        : `Assessment recorded for ${cow.name}. Logged in cloud.`
      );
      return;
    } catch (err) {
      console.error('[BoviCare] Error logging clinical assessment to Supabase:', err);
      showToast(err.message || 'Error saving assessment to database.');
    } finally {
      if (btnSubmit) btnSubmit.disabled = false;
      if (btnText) btnText.textContent = 'Save Assessment & Notify Vet';
    }
  }

  // LOCAL MEMORY FALLBACK
  const newCaseId = `CASE-2026-${String(casesList.length + 82).padStart(3, '0')}`;
  const newCase = {
    caseId: newCaseId,
    cowId: cow.id,
    cowName: cow.name,
    cowTag: cow.tag,
    date: "Just now",
    quarters: quarterNames.length > 0 ? quarterNames : ["All quarters inspected"],
    symptoms: observedSymptoms.length > 0 ? observedSymptoms : [milkAppearance, udderSwelling, milkingPain, yieldChange].filter(s => s !== 'Normal' && s !== 'None' && s !== 'No Change'),
    notes: fullDetails,
    image: currentSelectedImageBase64,
    status: isFlagged ? "Awaiting Review" : "Healthy",
    urgency: urgency,
    vetFeedback: null
  };

  casesList.unshift(newCase);

  if (isFlagged) {
    cow.status = 'monitor';
    cow.statusText = 'To monitor';
  }
  cow.lastChecked = 'Today';

  recordsList.unshift({
    id: `REC-${Date.now().toString().slice(-3)}`,
    date: "Today",
    cowName: `${cow.name} (${cow.tag})`,
    type: (hasImage || isFlagged) ? "Clinical Mastitis Case Filed" : "Routine Health Check",
    details: fullDetails,
    status: isFlagged ? "To Monitor" : "Healthy"
  });

  closeAssessmentWizard();
  renderHerdSummary();
  renderAllCowsGrid();
  renderRecordsTimeline();
  renderVetQueue();
  updateMetricCounters();

  if (btnSubmit) btnSubmit.disabled = false;
  if (btnText) btnText.textContent = 'Save Assessment & Notify Vet';

  showToast(`Assessment saved for ${cow.name}. Logged in herd records.`);
}

// Assessment Wizard Step Progress Tracker (UI Enhancement)
function setWizardStep(stepNumber) {
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`wizardStep${i}`);
    const lineEl = document.getElementById(`wizardLine${i}`);
    if (stepEl) {
      if (i < stepNumber) {
        stepEl.className = 'wizard-step completed';
      } else if (i === stepNumber) {
        stepEl.className = 'wizard-step active';
      } else {
        stepEl.className = 'wizard-step';
      }
    }
    if (lineEl) {
      lineEl.className = i < stepNumber ? 'wizard-step-line active' : 'wizard-step-line';
    }
  }
}

// Modal Handlers
function openAssessmentWizard() {
  populateCowDropdown();
  setWizardStep(1);
  const modal = document.getElementById('modalAssessment');
  if (modal) modal.classList.add('open');
}

function closeAssessmentWizard() {
  const modal = document.getElementById('modalAssessment');
  if (modal) {
    modal.classList.remove('open');
    setWizardStep(1);
    document.getElementById('assessmentForm').reset();
    document.querySelectorAll('.quarter-box').forEach(b => {
      b.classList.remove('selected');
      const st = b.querySelector('.quarter-status');
      if (st) st.textContent = 'Normal';
    });
    const tempBadge = document.getElementById('bodyTempStatusBadge');
    if (tempBadge) {
      tempBadge.className = 'vital-badge-status';
      tempBadge.textContent = 'Normal';
    }
    removeSelectedImage({ stopPropagation: () => {} });
  }
}

// Veterinarian Review & Telehealth Consultation Modal (Stage 5)
function openVetReviewModal(caseId) {
  if (!caseId || caseId === 'undefined') {
    caseId = (liveCasesList[0]?.id || liveCasesList[0]?.caseId || casesList[0]?.id || casesList[0]?.caseId);
  }
  const caseItem = (liveCasesList.find(c => c.id === caseId || c.caseId === caseId)) || (casesList.find(c => c.caseId === caseId || c.id === caseId));
  if (!caseItem) {
    console.warn('[BoviCare] Case item not found for ID:', caseId);
    return;
  }

  const titleEl = document.getElementById('vetModalCaseTitle');
  if (titleEl) titleEl.textContent = `Clinical Review: ${caseItem.cowName} (${caseItem.cowTag})`;

  const bodyEl = document.getElementById('vetCaseDetailsBody');
  if (bodyEl) {
    const consultationsHtml = (caseItem.consultations && caseItem.consultations.length > 0)
      ? caseItem.consultations.map(cons => `
          <div class="consultation-thread-box" style="margin-bottom: 8px;">
            <div class="consultation-thread-header">
              <span>🩺 <strong>Previous Telehealth Advice</strong></span>
              <span style="font-size: 11px; color: var(--color-text-subtle);">${cons.conducted_at ? new Date(cons.conducted_at).toLocaleDateString() : 'Recent'}</span>
            </div>
            <p class="consultation-thread-summary">${cons.summary}</p>
          </div>
        `).join('')
      : '';

    bodyEl.innerHTML = `
      <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 12px; color: var(--color-text-subtle);">Ref: <strong>${caseItem.caseId}</strong> • Logged: ${caseItem.date} ${caseItem.farmName ? `• Farm: <strong>${caseItem.farmName}</strong>` : ''}</span>
        <div class="case-badges-group">
          <span class="case-badge-${caseItem.urgency}">${formatUrgency(caseItem.urgency)}</span>
          <span class="case-status-pill ${caseItem.status}">${formatCaseStatus(caseItem.status)}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 18px;">
        <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
          <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 6px;">Reported Quarters & Observations</h4>
          <p style="font-size: 13px;"><strong>Quarters:</strong> ${caseItem.quarters.length > 0 ? caseItem.quarters.join(', ') : 'All / General'}</p>
          <div class="case-tags-wrap" style="margin: 8px 0;">
            ${caseItem.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}
          </div>
          <p style="font-size: 13px; margin-top: 4px;"><strong>Farmer Notes:</strong> <em>"${caseItem.notes || 'No field notes provided'}"</em></p>
        </div>

        ${caseItem.image ? `
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark);">Private Udder / Fore-Milk Photograph</h4>
              <span class="compression-pill">Authorized Signed Access</span>
            </div>
            <img src="${caseItem.image}" alt="Clinical photograph" loading="lazy" decoding="async" style="max-height: 240px; border-radius: 8px; width: 100%; object-fit: contain; background: #000;">
          </div>
        ` : ''}

        ${consultationsHtml ? `
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 6px;">Previous Consultation Log</h4>
            ${consultationsHtml}
          </div>
        ` : ''}

        <div class="ai-staged-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <div>
            <strong>AI screening is not yet available. Please consult a veterinarian.</strong> Automated computer-vision screening inferences will be displayed in this panel once the pre-trained deep learning inference service is connected.
          </div>
        </div>

        <form onsubmit="submitVetPrescription(event, '${caseItem.id}')" style="margin-top: 8px;">
          <!-- Section 1: Clinical Diagnosis -->
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md); margin-bottom: 12px;">
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 10px;">
              1. Clinical Diagnosis & Mastitis Evaluation
            </h4>
            <div class="treatment-fields-grid">
              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetDiagnosisType">Diagnosis Classification</label>
                <select id="vetDiagnosisType" class="form-input" required>
                  <option value="clinical_mastitis">Acute Clinical Mastitis</option>
                  <option value="subclinical_mastitis">Subclinical Mastitis (High SCC)</option>
                  <option value="trauma_injury">Teat / Udder Physical Trauma</option>
                  <option value="healthy_non_mastitis">Healthy / Physiological (Non-Mastitis)</option>
                </select>
              </div>

              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetCmtScore">California Mastitis Test (CMT)</label>
                <select id="vetCmtScore" class="form-input">
                  <option value="Negative">Negative (0) — No gel</option>
                  <option value="Trace">Trace (T) — Slight slime</option>
                  <option value="1 (Weak Positive)">1 (Weak Positive) — Thickens</option>
                  <option value="2 (Distinct Positive)">2 (Distinct Positive) — Immediate gel</option>
                  <option value="3 (Strong Positive)">3 (Strong Positive) — Heavy fried-egg gel</option>
                </select>
              </div>
            </div>

            <div class="form-section" style="margin-bottom: 0;">
              <label class="form-label" for="vetClinicalNotes">Clinical Examination Findings & Pathology Notes</label>
              <textarea id="vetClinicalNotes" class="form-textarea" rows="2" required placeholder="Describe quarter palpation (heat, pain, induration), strip-cup findings, and clinical evaluation..."></textarea>
            </div>
          </div>

          <!-- Section 2: Treatment Plan & Withdrawal Protocols -->
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px;">
              <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark);">
                2. Prescription & Treatment Protocol
              </h4>
              <span class="withdrawal-badge">Food Safety Mandatory</span>
            </div>

            <div class="treatment-fields-grid">
              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetMedicationProtocol">Medication / Active Drug Regimen</label>
                <input type="text" id="vetMedicationProtocol" class="form-input" required placeholder="e.g. Cephapirin sodium 300mg + Meloxicam 0.5mg/kg">
              </div>

              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetTreatmentRoute">Route of Administration</label>
                <select id="vetTreatmentRoute" class="form-input" required>
                  <option value="intramammary">Intramammary Infusion</option>
                  <option value="intramuscular">Intramuscular (IM)</option>
                  <option value="subcutaneous">Subcutaneous (SC)</option>
                  <option value="oral">Oral Administration</option>
                  <option value="topical">Topical Application</option>
                </select>
              </div>
            </div>

            <div class="form-section" style="margin-bottom: 8px;">
              <label class="form-label" for="vetDosageInstructions">Dosage & Milking Directions</label>
              <textarea id="vetDosageInstructions" class="form-textarea" rows="2" required placeholder="e.g. Infuse 1 tube in affected quarter every 12h for 3 milkings after complete milk-out. Teat-dip after infusion."></textarea>
            </div>

            <div class="treatment-fields-grid">
              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetMilkWithdrawal">Milk Withdrawal (Hours)</label>
                <input type="number" id="vetMilkWithdrawal" class="form-input" value="72" min="0" max="720" required>
              </div>

              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetMeatWithdrawal">Meat Withdrawal (Days)</label>
                <input type="number" id="vetMeatWithdrawal" class="form-input" value="14" min="0" max="365" required>
              </div>
            </div>

            <div class="treatment-fields-grid">
              <div class="form-section" style="margin-bottom: 0;">
                <label class="form-label" for="vetTreatmentStart">Treatment Start Date</label>
                <input type="date" id="vetTreatmentStart" class="form-input" value="${new Date().toISOString().split('T')[0]}">
              </div>

              <div class="form-section" style="margin-bottom: 0;">
                <label class="form-label" for="vetTreatmentEnd">Expected End Date</label>
                <input type="date" id="vetTreatmentEnd" class="form-input" value="${new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().split('T')[0]}">
              </div>
            </div>
          </div>

          <!-- Section 3: Follow-Up & Consultation Mode -->
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md); margin-bottom: 12px;">
            <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 10px;">
              3. Scheduled Follow-up & Telehealth Mode
            </h4>

            <div class="treatment-fields-grid">
              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetFollowUpDate">Follow-up Re-assessment Date</label>
                <input type="date" id="vetFollowUpDate" class="form-input" value="${new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0]}" required>
              </div>

              <div class="form-section" style="margin-bottom: 8px;">
                <label class="form-label" for="vetConsultChannelSelect">Consultation Mode</label>
                <select id="vetConsultChannelSelect" class="form-input">
                  <option value="remote_telehealth">Remote Telehealth (App Prescription)</option>
                  <option value="chat">Tele-Chat / Phone Follow-up</option>
                  <option value="farm_visit">Physical On-Farm Examination</option>
                </select>
              </div>
            </div>

            <div class="form-section" style="margin-bottom: 0;">
              <label class="form-label" for="vetFollowUpNotes">Follow-up Clinical Plan</label>
              <input type="text" id="vetFollowUpNotes" class="form-input" value="Repeat CMT strip test, verify milk clarity and firmness resolution">
            </div>
          </div>

          <div class="modal-footer" style="padding-top: 10px; margin-top: 10px;">
            <button type="button" class="btn-ghost" onclick="closeVetReviewModal()">Close</button>
            <button type="submit" class="btn-primary" id="btnSubmitVetPrescription">
              <span id="btnSubmitVetPrescriptionText">Transmit Confirmed Diagnosis & Treatment Plan</span>
            </button>
          </div>
        </form>
      </div>
    `;
  }

  const modal = document.getElementById('modalVetReview');
  if (modal) modal.classList.add('open');
}

// Record Confirmed Diagnosis, Treatment Plan, and Follow-up (Stage 6)
async function submitVetPrescription(e, caseId) {
  e.preventDefault();
  const caseItem = (liveCasesList.find(c => c.id === caseId || c.caseId === caseId)) || (casesList.find(c => c.caseId === caseId));
  if (!caseItem) return;

  const diagnosisType = document.getElementById('vetDiagnosisType')?.value || 'clinical_mastitis';
  const cmtScore = document.getElementById('vetCmtScore')?.value || 'Negative';
  const clinicalNotes = document.getElementById('vetClinicalNotes')?.value.trim() || '';

  const medicationProtocol = document.getElementById('vetMedicationProtocol')?.value.trim() || '';
  const treatmentRoute = document.getElementById('vetTreatmentRoute')?.value || 'intramammary';
  const dosageInstructions = document.getElementById('vetDosageInstructions')?.value.trim() || '';
  const milkWithdrawalHours = parseInt(document.getElementById('vetMilkWithdrawal')?.value, 10) || 72;
  const meatWithdrawalDays = parseInt(document.getElementById('vetMeatWithdrawal')?.value, 10) || 14;
  const treatmentStart = document.getElementById('vetTreatmentStart')?.value || new Date().toISOString().split('T')[0];
  const treatmentEnd = document.getElementById('vetTreatmentEnd')?.value || null;

  const followUpDate = document.getElementById('vetFollowUpDate')?.value || null;
  const followUpNotes = document.getElementById('vetFollowUpNotes')?.value.trim() || '';
  const consultChannel = document.getElementById('vetConsultChannelSelect')?.value || 'remote_telehealth';

  const btn = document.getElementById('btnSubmitVetPrescription');
  const btnText = document.getElementById('btnSubmitVetPrescriptionText');

  if (!clinicalNotes || !medicationProtocol || !dosageInstructions) {
    alert('Please fill out all required clinical diagnosis and treatment fields.');
    return;
  }

  const isHealthyCleared = diagnosisType === 'healthy_non_mastitis';
  const targetCaseStatus = isHealthyCleared ? 'resolved' : 'treatment_prescribed';
  const cowTargetStatus = isHealthyCleared ? 'healthy' : 'under_treatment';

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Recording Diagnosis & Treatment...';

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentSession?.user) {
    try {
      // 1. Insert into public.diagnoses
      const { data: diagData, error: diagErr } = await supabaseClient
        .from('diagnoses')
        .insert({
          case_id: caseItem.id,
          vet_id: currentSession.user.id,
          diagnosis: diagnosisType,
          cmt_score: cmtScore,
          clinical_notes: clinicalNotes
        })
        .select()
        .single();

      if (diagErr) throw diagErr;

      // 2. Insert into public.treatment_plans
      const { data: treatData, error: treatErr } = await supabaseClient
        .from('treatment_plans')
        .insert({
          case_id: caseItem.id,
          diagnosis_id: diagData.id,
          prescribed_by: currentSession.user.id,
          medication_protocol: medicationProtocol,
          route: treatmentRoute,
          dosage_instructions: dosageInstructions,
          milk_withdrawal_hours: milkWithdrawalHours,
          meat_withdrawal_days: meatWithdrawalDays,
          treatment_start: treatmentStart,
          treatment_end: treatmentEnd
        })
        .select()
        .single();

      if (treatErr) throw treatErr;

      // 3. Schedule follow-up in public.follow_ups
      if (followUpDate) {
        const { error: fupErr } = await supabaseClient
          .from('follow_ups')
          .insert({
            case_id: caseItem.id,
            scheduled_date: followUpDate,
            is_completed: false,
            outcome_notes: followUpNotes || 'Scheduled clinical follow-up examination'
          });

        if (fupErr) throw fupErr;
      }

      // 4. Insert into public.consultations for telehealth log
      await supabaseClient
        .from('consultations')
        .insert({
          case_id: caseItem.id,
          vet_id: currentSession.user.id,
          consultation_channel: consultChannel,
          summary: `${formatDiagnosisType(diagnosisType)} confirmed. Prescribed: ${medicationProtocol}. Milk withdrawal: ${milkWithdrawalHours}h.`
        });

      // 5. Update public.mastitis_cases
      const { error: caseErr } = await supabaseClient
        .from('mastitis_cases')
        .update({
          status: targetCaseStatus,
          assigned_vet_id: currentSession.user.id,
          resolved_at: isHealthyCleared ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', caseItem.id);

      if (caseErr) throw caseErr;

      // 6. Update cow status in public.cows
      await supabaseClient
        .from('cows')
        .update({
          status: cowTargetStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', caseItem.cowId);

      // 7. Log comprehensive event in public.health_records
      await supabaseClient
        .from('health_records')
        .insert({
          cow_id: caseItem.cowId,
          farm_id: caseItem.farmId || (currentFarm ? currentFarm.id : null),
          recorded_by: currentSession.user.id,
          record_type: `Confirmed Diagnosis & Prescription (${formatDiagnosisType(diagnosisType)})`,
          details: `CMT: ${cmtScore} | Rx: ${medicationProtocol} (${formatTreatmentRoute(treatmentRoute)}) | 🥛 Milk Withdrawal: ${milkWithdrawalHours}h | Meat: ${meatWithdrawalDays}d | Follow-up: ${followUpDate}`
        });

      closeVetReviewModal();
      await loadCasesFromBackend(0);
      await loadCattleFromBackend(0);
      await renderRecordsTimeline(0);
      showToast(`Diagnosis confirmed & Rx transmitted. 🥛 Milk withdrawal active: ${milkWithdrawalHours} hours.`);
      return;
    } catch (err) {
      console.error('[BoviCare] Error recording diagnosis & treatment:', err);
      showToast(err.message || 'Error transmitting veterinary diagnosis.');
      return;
    } finally {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Transmit Confirmed Diagnosis & Treatment Plan';
    }
  }

  // LOCAL MEMORY FALLBACK
  caseItem.diagnosis = {
    diagnosis: diagnosisType,
    cmt_score: cmtScore,
    clinical_notes: clinicalNotes,
    confirmed_at: new Date().toISOString()
  };
  caseItem.treatmentPlan = {
    medication_protocol: medicationProtocol,
    route: treatmentRoute,
    dosage_instructions: dosageInstructions,
    milk_withdrawal_hours: milkWithdrawalHours,
    meat_withdrawal_days: meatWithdrawalDays,
    treatment_start: treatmentStart,
    treatment_end: treatmentEnd
  };
  caseItem.followUp = {
    scheduled_date: followUpDate,
    is_completed: false,
    outcome_notes: followUpNotes
  };
  caseItem.status = isHealthyCleared ? 'resolved' : 'treatment_prescribed';
  caseItem.vetFeedback = `${formatDiagnosisType(diagnosisType)}: ${medicationProtocol}`;

  const cow = initialCows.find(c => c.id === caseItem.cowId);
  if (cow) {
    cow.status = cowTargetStatus;
    cow.statusText = isHealthyCleared ? 'Healthy' : 'Under treatment';
  }

  recordsList.unshift({
    id: `REC-${Date.now().toString().slice(-3)}`,
    date: "Today",
    cowName: `${caseItem.cowName} (${caseItem.cowTag})`,
    type: `Confirmed Diagnosis (${formatDiagnosisType(diagnosisType)})`,
    details: `Rx: ${medicationProtocol} | 🥛 Milk Withdrawal: ${milkWithdrawalHours}h`,
    status: isHealthyCleared ? 'Healthy' : 'Under Treatment'
  });

  closeVetReviewModal();
  renderLocalCasesQueue();
  renderHerdSummary();
  renderAllCowsGrid();
  renderRecordsTimeline();
  updateMetricCounters();
  showToast(`Diagnosis & prescription saved. Milk withdrawal active: ${milkWithdrawalHours} hours.`);
}

function closeVetReviewModal() {
  const modal = document.getElementById('modalVetReview');
  if (modal) modal.classList.remove('open');
}

// Complete Scheduled Follow-Up (Stage 6)
async function completeFollowUp(caseId, followUpId) {
  if (!confirm('Mark clinical follow-up as completed? This will verify recovery and resolve the case.')) return;

  if (isSupabaseConfigured() && currentSession?.user) {
    try {
      // 1. Update follow_up record
      const { error: fupErr } = await supabaseClient
        .from('follow_ups')
        .update({
          is_completed: true,
          outcome_notes: 'Follow-up examination completed. Quarter swelling resolved; milk appearance normal.'
        })
        .eq('id', followUpId);

      if (fupErr) throw fupErr;

      // 2. Update case status to resolved
      const { error: caseErr } = await supabaseClient
        .from('mastitis_cases')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', caseId);

      if (caseErr) throw caseErr;

      // 3. Update cow health status back to healthy
      const caseItem = liveCasesList.find(c => c.id === caseId);
      if (caseItem) {
        await supabaseClient
          .from('cows')
          .update({
            status: 'healthy',
            updated_at: new Date().toISOString()
          })
          .eq('id', caseItem.cowId);

        await supabaseClient
          .from('health_records')
          .insert({
            cow_id: caseItem.cowId,
            farm_id: caseItem.farmId || (currentFarm ? currentFarm.id : null),
            recorded_by: currentSession.user.id,
            record_type: 'Clinical Follow-Up Completed',
            details: 'Follow-up re-assessment completed. Mastitis resolved; animal cleared for normal milking.'
          });
      }

      showToast('Follow-up completed. Animal marked healthy & cleared.');
      await loadCasesFromBackend(0);
      await loadCattleFromBackend(0);
      await renderRecordsTimeline(0);
      return;
    } catch (err) {
      console.error('[BoviCare] Error completing follow-up:', err);
      showToast(err.message || 'Error updating follow-up.');
    }
  } else {
    showToast('Follow-up completed in demo mode.');
  }
}

// Farmer Case Details, Diagnosis & Prescription View Modal (Stage 5 & 6)
function openCaseDetailsModal(caseId) {
  if (!caseId || caseId === 'undefined') {
    caseId = (liveCasesList[0]?.id || liveCasesList[0]?.caseId || casesList[0]?.id || casesList[0]?.caseId);
  }
  const caseItem = (liveCasesList.find(c => c.id === caseId || c.caseId === caseId)) || (casesList.find(c => c.caseId === caseId || c.id === caseId));
  if (!caseItem) {
    console.warn('[BoviCare] Case item not found for ID:', caseId);
    return;
  }

  const titleEl = document.getElementById('caseDetailsTitle');
  if (titleEl) titleEl.textContent = `${caseItem.cowName} (${caseItem.cowTag}) — Clinical Case Details`;

  const bodyEl = document.getElementById('caseDetailsBody');
  if (bodyEl) {
    const consultationsHtml = (caseItem.consultations && caseItem.consultations.length > 0)
      ? caseItem.consultations.map(cons => `
          <div class="consultation-thread-box" style="margin-top: 10px;">
            <div class="consultation-thread-header">
              <span>🩺 <strong>Veterinary Telehealth Summary</strong></span>
              <span style="font-size: 11px; color: var(--color-text-subtle);">${cons.conducted_at ? new Date(cons.conducted_at).toLocaleDateString() : 'Recent'}</span>
            </div>
            <p class="consultation-thread-summary">${cons.summary}</p>
          </div>
        `).join('')
      : `
        <div class="consultation-pending-note" style="margin-top: 10px;">
          <span>⏳ <em>Your consultation request has been queued. A remote veterinarian will review these observations and provide recommendations.</em></span>
        </div>
      `;

    const diagnosisBlock = caseItem.diagnosis
      ? `
        <div style="background: #EFF6FF; border: 1.5px solid #BFDBFE; border-radius: var(--radius-md); padding: 14px;">
          <h4 style="font-size: 13.5px; font-weight: 700; color: #1E40AF; margin-bottom: 6px;">🩺 Confirmed Veterinary Diagnosis</h4>
          <p style="font-size: 13px;"><strong>Condition:</strong> ${formatDiagnosisType(caseItem.diagnosis.diagnosis)}</p>
          <p style="font-size: 13px; margin-top: 4px;"><strong>CMT Score:</strong> ${caseItem.diagnosis.cmt_score || 'Not recorded'}</p>
          ${caseItem.diagnosis.clinical_notes ? `<p style="font-size: 12.5px; color: #1E3A8A; margin-top: 6px;"><em>"${caseItem.diagnosis.clinical_notes}"</em></p>` : ''}
        </div>
      `
      : '';

    const treatmentBlock = caseItem.treatmentPlan
      ? `
        <div class="treatment-plan-card" style="margin-top: 0;">
          <div class="treatment-plan-header">
            <strong style="font-size: 13px;">💊 Prescribed Treatment Protocol</strong>
            <span class="withdrawal-badge">🥛 MILK WITHDRAWAL: ${caseItem.treatmentPlan.milk_withdrawal_hours} HOURS</span>
          </div>
          <p style="font-size: 13px; font-weight: 700; color: #92400E; margin-top: 6px;">
            ${caseItem.treatmentPlan.medication_protocol} (${formatTreatmentRoute(caseItem.treatmentPlan.route)})
          </p>
          <p style="font-size: 12.5px; margin-top: 4px;"><strong>Dosage & Instructions:</strong> ${caseItem.treatmentPlan.dosage_instructions}</p>
          <div style="background: rgba(254, 226, 226, 0.7); padding: 8px 10px; border-radius: 6px; margin-top: 8px; font-size: 11.5px; color: #991B1B;">
            ⚠️ <strong>FOOD SAFETY WITHDRAWAL:</strong> Discard all milk during treatment and for ${caseItem.treatmentPlan.milk_withdrawal_hours} hours afterwards. Meat withdrawal: ${caseItem.treatmentPlan.meat_withdrawal_days} days.
          </div>
          <div style="font-size: 11.5px; color: var(--color-text-subtle); margin-top: 6px;">
            Treatment window: ${caseItem.treatmentPlan.treatment_start} to ${caseItem.treatmentPlan.treatment_end || 'Regimen completion'}
          </div>
        </div>
      `
      : '';

    const followUpBlock = caseItem.followUp
      ? `
        <div class="follow-up-badge" style="padding: 10px 14px;">
          <div>
            <span>📅 <strong>Scheduled Follow-Up:</strong> ${caseItem.followUp.scheduled_date}</span>
            <p style="font-size: 12px; margin: 2px 0 0; color: #6B21A8;">${caseItem.followUp.outcome_notes || 'Clinical re-assessment scheduled'}</p>
          </div>
          <span style="font-weight: 700;">${caseItem.followUp.is_completed ? '✅ Completed' : '⏳ Scheduled'}</span>
        </div>
      `
      : '';

    bodyEl.innerHTML = `
      <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 12px; color: var(--color-text-subtle);">Ref: <strong>${caseItem.caseId}</strong> • Logged: ${caseItem.date}</span>
        <div class="case-badges-group">
          <span class="case-badge-${caseItem.urgency}">${formatUrgency(caseItem.urgency)}</span>
          <span class="case-status-pill ${caseItem.status}">${formatCaseStatus(caseItem.status)}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr; gap: 14px;">
        <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
          <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 6px;">Reported Clinical Symptoms</h4>
          <p style="font-size: 13px;"><strong>Affected Quarters:</strong> ${caseItem.quarters.length > 0 ? caseItem.quarters.join(', ') : 'All Quarters'}</p>
          <div class="case-tags-wrap" style="margin: 8px 0;">
            ${caseItem.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}
          </div>
          <p style="font-size: 13px; margin-top: 6px;"><strong>Field Notes:</strong> <em>"${caseItem.notes || 'No notes provided'}"</em></p>
        </div>

        ${caseItem.image ? `
          <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
              <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark);">Private Udder / Fore-Milk Photograph</h4>
              <span class="compression-pill">Authorized Signed Access</span>
            </div>
            <img src="${caseItem.image}" alt="Clinical photograph" loading="lazy" decoding="async" style="max-height: 240px; border-radius: 8px; width: 100%; object-fit: contain; background: #000;">
          </div>
        ` : ''}

        <div class="ai-staged-notice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <div>
            <strong>AI screening is not yet available. Please consult a veterinarian.</strong> Automated computer-vision screening inferences will be displayed in this panel once the pre-trained deep learning inference service is connected.
          </div>
        </div>

        ${diagnosisBlock}
        ${treatmentBlock}
        ${followUpBlock}

        <div style="background: var(--color-canvas); padding: 14px; border-radius: var(--radius-md);">
          <h4 style="font-size: 13.5px; font-weight: 700; color: var(--color-primary-dark); margin-bottom: 6px;">Veterinarian Telehealth & Consultation Records</h4>
          ${consultationsHtml}
        </div>
      </div>

      <div class="modal-footer" style="padding-top: 14px; margin-top: 14px; display: flex; justify-content: space-between;">
        ${(caseItem.status === 'open' || caseItem.status === 'under_review') ? `
          <button type="button" class="btn-secondary" style="color: #991B1B; border-color: #FCA5A5;" onclick="requestExpeditedReview('${caseItem.id}')">
            ⚠️ Request Urgent Escalation
          </button>
        ` : '<div></div>'}
        <button type="button" class="btn-ghost" onclick="closeCaseDetailsModal()">Close</button>
      </div>
    `;
  }

  const modal = document.getElementById('modalCaseDetails');
  if (modal) modal.classList.add('open');
}

function closeCaseDetailsModal() {
  const modal = document.getElementById('modalCaseDetails');
  if (modal) modal.classList.remove('open');
}

async function requestExpeditedReview(caseId) {
  if (!confirm('Flag this case as urgent for expedited veterinarian review?')) return;

  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabaseClient
        .from('mastitis_cases')
        .update({
          urgency: 'urgent',
          updated_at: new Date().toISOString()
        })
        .eq('id', caseId);

      if (error) throw error;
      showToast('Case updated. Urgency escalated for veterinary review.');
      closeCaseDetailsModal();
      await loadCasesFromBackend(0);
      return;
    } catch (err) {
      console.error('[BoviCare] Error escalating case:', err);
      showToast(err.message || 'Error updating case urgency.');
    }
  } else {
    const caseItem = casesList.find(c => c.caseId === caseId || c.id === caseId);
    if (caseItem) caseItem.urgency = 'urgent';
    showToast('Case escalated for urgent review.');
    closeCaseDetailsModal();
    loadCasesFromBackend(0);
  }
}

let currentProfileAnimal = null;
let animalHistoryPage = 0;
const ANIMAL_HISTORY_PAGE_SIZE = 5;
let totalAnimalHistoryCount = 0;
let liveAnimalHistoryList = [];

// Cow / Buffalo Details Profile & History View
async function viewCowDetail(cowId) {
  const source = liveCattleList.length > 0 ? liveCattleList : initialCows;
  const cow = source.find(c => c.id === cowId) || initialCows.find(c => c.id === cowId);
  if (!cow) return;

  currentProfileAnimal = cow;

  // Set Profile Elements
  const modal = document.getElementById('modalCowProfile');
  const nameDisplay = document.getElementById('profileNameDisplay');
  const tagDisplay = document.getElementById('profileTagDisplay');
  const titleDisplay = document.getElementById('cowProfileName');
  const thumb = document.getElementById('profileCowThumb');
  const statusBadge = document.getElementById('profileStatusBadge');
  const statusText = document.getElementById('profileStatusText');
  const breedDisplay = document.getElementById('profileBreedDisplay');
  const lactationDisplay = document.getElementById('profileLactationDisplay');
  const yieldDisplay = document.getElementById('profileYieldDisplay');
  const speciesDisplay = document.getElementById('profileSpeciesDisplay');
  const speciesBadge = document.getElementById('profileBadgeSpecies');
  const farmDisplay = document.getElementById('profileFarmDisplay');

  const isBuffalo = cow.breed.toLowerCase().includes('buffalo');

  if (titleDisplay) titleDisplay.textContent = `${cow.name} (${cow.tag})`;
  if (nameDisplay) nameDisplay.textContent = cow.name;
  if (tagDisplay) tagDisplay.textContent = cow.tag;
  if (thumb) {
    thumb.src = cow.photo || COW_FALLBACK_SVG;
    thumb.onerror = () => { thumb.src = COW_FALLBACK_SVG; };
  }
  if (statusBadge && statusText) {
    statusBadge.className = `status-badge ${cow.status}`;
    statusText.textContent = cow.statusText;
  }
  if (breedDisplay) breedDisplay.textContent = cow.breed;
  if (lactationDisplay) lactationDisplay.textContent = cow.lactation;
  if (yieldDisplay) yieldDisplay.textContent = cow.dailyYield;
  if (speciesDisplay) speciesDisplay.textContent = isBuffalo ? '🐃 Buffalo (Murrah/Cross)' : '🐄 Cow (Cattle)';
  if (speciesBadge) speciesBadge.textContent = isBuffalo ? '🐃 Buffalo Profile' : '🐄 Cow Profile';
  if (farmDisplay) farmDisplay.textContent = currentFarm ? currentFarm.name : 'Primary Farm';

  if (modal) modal.classList.add('open');

  // Load history records with pagination
  await loadAnimalHealthHistory(cow.id, 0);
}

function closeCowProfileModal() {
  const modal = document.getElementById('modalCowProfile');
  if (modal) modal.classList.remove('open');
  currentProfileAnimal = null;
}

// Fetch animal health history from Supabase with pagination & lean columns
async function loadAnimalHealthHistory(cowId, page = 0, append = false) {
  const container = document.getElementById('profileHistoryContainer');
  const countLabel = document.getElementById('profileHistoryCount');
  const loadMoreWrap = document.getElementById('profileHistoryLoadMore');
  if (!container) return;

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentFarm) {
    try {
      const from = page * ANIMAL_HISTORY_PAGE_SIZE;
      const to = from + ANIMAL_HISTORY_PAGE_SIZE - 1;

      const { data, count, error } = await supabaseClient
        .from('health_records')
        .select('id, record_type, details, recorded_at', { count: 'exact' })
        .eq('farm_id', currentFarm.id)
        .eq('cow_id', cowId)
        .order('recorded_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      totalAnimalHistoryCount = count || 0;
      animalHistoryPage = page;

      const mapped = (data || []).map(r => ({
        id: r.id,
        date: new Date(r.recorded_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        type: r.record_type,
        details: r.details
      }));

      if (append) {
        liveAnimalHistoryList = [...liveAnimalHistoryList, ...mapped];
      } else {
        liveAnimalHistoryList = mapped;
      }

      if (countLabel) {
        countLabel.textContent = `${totalAnimalHistoryCount} event${totalAnimalHistoryCount === 1 ? '' : 's'} logged`;
      }

      if (liveAnimalHistoryList.length === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 18px 12px; background: #FFFFFF; border-radius: 8px; border: 1px dashed var(--color-border);">
            <p style="font-size: 12.5px; color: var(--color-text-muted);">No health records logged yet for this animal.</p>
          </div>
        `;
        if (loadMoreWrap) loadMoreWrap.style.display = 'none';
        return;
      }

      container.innerHTML = liveAnimalHistoryList.map(item => `
        <div class="history-card-mini">
          <div class="history-card-mini-header">
            <span class="history-date">${item.date}</span>
            <span class="history-type-badge">${item.type}</span>
          </div>
          <p class="history-details">${item.details}</p>
        </div>
      `).join('');

      if (loadMoreWrap) {
        loadMoreWrap.style.display = liveAnimalHistoryList.length < totalAnimalHistoryCount ? 'block' : 'none';
      }
      return;
    } catch (err) {
      console.warn('[BoviCare] Error loading animal health history:', err);
    }
  }

  // LOCAL MEMORY FALLBACK
  const localMatched = recordsList.filter(r => 
    currentProfileAnimal && r.cowName.toLowerCase().includes(currentProfileAnimal.name.toLowerCase())
  );

  const displayList = localMatched.length > 0 ? localMatched : [
    {
      date: 'Recent',
      type: 'Routine Strip Cup Check',
      details: 'All four quarters inspected. Normal milk appearance.'
    }
  ];

  if (countLabel) countLabel.textContent = `${displayList.length} recorded events`;

  container.innerHTML = displayList.map(item => `
    <div class="history-card-mini">
      <div class="history-card-mini-header">
        <span class="history-date">${item.date}</span>
        <span class="history-type-badge">${item.type}</span>
      </div>
      <p class="history-details">${item.details}</p>
    </div>
  `).join('');

  if (loadMoreWrap) loadMoreWrap.style.display = 'none';
}

function loadMoreAnimalHistory() {
  if (currentProfileAnimal) {
    loadAnimalHealthHistory(currentProfileAnimal.id, animalHistoryPage + 1, true);
  }
}

// Quick action to start udder check for the currently inspected animal
function startCheckForCurrentAnimal() {
  if (!currentProfileAnimal) return;
  const animalId = currentProfileAnimal.id;
  closeCowProfileModal();
  openAssessmentWizard();

  const cowSelect = document.getElementById('cowSelect');
  if (cowSelect) {
    cowSelect.value = animalId;
    handleCowSelectChange(cowSelect);
  }
}

// Symptom Guide Modal
function openSymptomGuide() {
  showToast("Opening Clinical Mastitis Diagnostic Guide...");
  openAssessmentWizard();
}

function openRemindersModal() {
  showToast("Upcoming Milking & Udder Hygiene Checks: All Up-to-Date");
}

function openNotifications() {
  showToast("2 Pending notifications: Laxmi morning assessment pending review");
}

// Toast helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// Species selection change in registration modal
function handleSpeciesChange(species) {
  const breedSelect = document.getElementById('newCowBreed');
  const tagInput = document.getElementById('newCowTag');
  if (!breedSelect) return;

  const cowGroup = document.getElementById('breedGroupCow');
  const buffaloGroup = document.getElementById('breedGroupBuffalo');

  if (species === 'buffalo') {
    if (cowGroup) cowGroup.style.display = 'none';
    if (buffaloGroup) buffaloGroup.style.display = 'block';
    breedSelect.value = 'Murrah Buffalo';
    if (tagInput && (!tagInput.value || tagInput.value.startsWith('#C'))) {
      tagInput.placeholder = 'e.g. #B001';
    }
  } else {
    if (cowGroup) cowGroup.style.display = 'block';
    if (buffaloGroup) buffaloGroup.style.display = 'none';
    breedSelect.value = 'Holstein Friesian';
    if (tagInput && (!tagInput.value || tagInput.value.startsWith('#B'))) {
      tagInput.placeholder = 'e.g. #C013';
    }
  }
}

// Cattle Registration Modal Handlers
function openAddCowModal() {
  const modal = document.getElementById('modalAddCow');
  const errorEl = document.getElementById('addCowErrorMsg');
  if (errorEl) errorEl.style.display = 'none';
  if (modal) modal.classList.add('open');
}

function closeAddCowModal() {
  const modal = document.getElementById('modalAddCow');
  if (modal) {
    modal.classList.remove('open');
    const form = document.getElementById('addCowForm');
    if (form) form.reset();
    const btn = document.getElementById('btnSubmitCow');
    const btnText = document.getElementById('btnSubmitCowText');
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Register Animal';
  }
}

// Register Animal (Cows & Buffaloes) with Duplicate Prevention & Supabase Integration
async function submitAddCow(e) {
  e.preventDefault();
  const name = document.getElementById('newCowName').value.trim();
  const rawTag = document.getElementById('newCowTag').value.trim();
  const breed = document.getElementById('newCowBreed').value;
  const lactation = document.getElementById('newCowLactation').value;
  const yieldVal = document.getElementById('newCowYield').value;
  const errorEl = document.getElementById('addCowErrorMsg');
  const btn = document.getElementById('btnSubmitCow');
  const btnText = document.getElementById('btnSubmitCowText');

  if (errorEl) errorEl.style.display = 'none';
  if (!name || !rawTag) return;

  const cleanTag = rawTag.startsWith('#') ? rawTag : `#${rawTag}`;

  // Prevent duplicate submissions by disabling button
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Registering animal...';

  // LIVE SUPABASE PERSISTENCE
  if (isSupabaseConfigured() && currentFarm) {
    try {
      const { data, error } = await supabaseClient
        .from('cows')
        .insert({
          farm_id: currentFarm.id,
          tag_number: cleanTag,
          name: name,
          breed: breed,
          lactation_stage: lactation,
          daily_yield_liters: parseFloat(yieldVal) || 0,
          status: 'healthy'
        })
        .select('id, farm_id, tag_number, name, breed, lactation_stage, daily_yield_liters, status, photo_storage_path, updated_at')
        .single();

      if (error) {
        // Unique constraint violation (UNIQUE (farm_id, tag_number))
        if (error.code === '23505') {
          throw new Error(`An animal with ear tag "${cleanTag}" already exists on this farm.`);
        } else if (error.code === '42501') {
          throw new Error('Permission denied. You must be an authorized member of this farm to register cattle.');
        } else {
          throw error;
        }
      }

      closeAddCowModal();
      await loadCattleFromBackend(0);
      populateCowDropdown();
      showToast(`Registered ${name} (${cleanTag}) in cloud herd.`);
      return;
    } catch (err) {
      console.error('[BoviCare] Error inserting cattle:', err);
      if (errorEl) {
        errorEl.textContent = err.message || 'Failed to register animal in database.';
        errorEl.style.display = 'block';
      }
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Register Animal';
      return;
    }
  }

  // LOCAL MEMORY FALLBACK
  const isDuplicate = initialCows.some(c => c.tag.toLowerCase() === cleanTag.toLowerCase());
  if (isDuplicate) {
    if (errorEl) {
      errorEl.textContent = `An animal with ear tag "${cleanTag}" already exists in the herd.`;
      errorEl.style.display = 'block';
    }
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Register Animal';
    return;
  }

  const newCow = {
    id: `C${String(initialCows.length + 1).padStart(3, '0')}`,
    name: name,
    tag: cleanTag,
    breed: breed,
    status: 'healthy',
    statusText: 'Healthy',
    lastChecked: 'Today',
    lactation: lactation,
    dailyYield: `${yieldVal} L/day`,
    photo: COW_FALLBACK_SVG
  };

  initialCows.unshift(newCow);
  closeAddCowModal();
  renderHerdSummary();
  renderAllCowsGrid();
  populateCowDropdown();
  updateMetricCounters();
  showToast(`Registered ${name} (${cleanTag}) locally.`);
}

// ============================================================================
// SUPABASE AUTH & CONNECTION MODAL HANDLERS
// ============================================================================
function openSupabaseAuthModal() {
  const modal = document.getElementById('modalSupabaseAuth');
  if (modal) {
    modal.classList.add('open');
    const inputUrl = document.getElementById('inputSupabaseUrl');
    const inputKey = document.getElementById('inputSupabaseAnonKey');
    if (inputUrl && BOVICARE_CONFIG.SUPABASE_URL) inputUrl.value = BOVICARE_CONFIG.SUPABASE_URL;
    if (inputKey && BOVICARE_CONFIG.SUPABASE_ANON_KEY) inputKey.value = BOVICARE_CONFIG.SUPABASE_ANON_KEY;
  }
}

function closeSupabaseAuthModal() {
  const modal = document.getElementById('modalSupabaseAuth');
  if (modal) modal.classList.remove('open');
}

function switchAuthTab(tab) {
  const sessionTab = document.getElementById('authTabSession');
  const configTab = document.getElementById('authTabConfig');
  const sessionBtn = document.getElementById('tabAuthSessionBtn');
  const configBtn = document.getElementById('tabAuthConfigBtn');

  if (tab === 'session') {
    if (sessionTab) sessionTab.style.display = 'block';
    if (configTab) configTab.style.display = 'none';
    if (sessionBtn) sessionBtn.classList.add('active');
    if (configBtn) configBtn.classList.remove('active');
  } else {
    if (sessionTab) sessionTab.style.display = 'none';
    if (configTab) configTab.style.display = 'block';
    if (sessionBtn) sessionBtn.classList.remove('active');
    if (configBtn) configBtn.classList.add('active');
  }
}

function toggleAuthMode() {
  authModalMode = authModalMode === 'signup' ? 'signin' : 'signup';
  const btnToggle = document.getElementById('btnToggleAuthMode');
  const btnSubmit = document.getElementById('btnSubmitAuthText');
  const fullNameField = document.getElementById('authFullName')?.closest('.form-section');
  const roleField = document.querySelector('input[name="authRole"]')?.closest('.form-section');

  if (authModalMode === 'signin') {
    if (btnToggle) btnToggle.textContent = 'Switch to Create Account';
    if (btnSubmit) btnSubmit.textContent = 'Sign In';
    if (fullNameField) fullNameField.style.display = 'none';
    if (roleField) roleField.style.display = 'none';
  } else {
    if (btnToggle) btnToggle.textContent = 'Switch to Sign In';
    if (btnSubmit) btnSubmit.textContent = 'Create Account';
    if (fullNameField) fullNameField.style.display = 'block';
    if (roleField) roleField.style.display = 'block';
  }
}

// Handle Sign In or Sign Up
async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const fullName = document.getElementById('authFullName')?.value.trim() || 'Farmer';
  const roleEl = document.querySelector('input[name="authRole"]:checked');
  const role = roleEl ? roleEl.value : 'farmer';
  const errorEl = document.getElementById('authErrorMsg');
  const btn = document.getElementById('btnSubmitAuth');

  if (errorEl) errorEl.style.display = 'none';

  if (!isSupabaseConfigured()) {
    if (errorEl) {
      errorEl.textContent = 'Please configure your Supabase URL and Publishable Anon Key first in the "Connection Settings" tab.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (btn) btn.disabled = true;

  try {
    if (authModalMode === 'signup') {
      const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      if (error) throw error;

      showToast('Account created. Checking session...');
      if (data.session) {
        currentSession = data.session;
        await syncUserProfile(data.user);
        closeSupabaseAuthModal();
      } else {
        showToast('Confirmation email sent. Please check your inbox.');
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw error;

      currentSession = data.session;
      await syncUserProfile(data.user);
      closeSupabaseAuthModal();
      showToast('Signed in successfully.');
    }
  } catch (err) {
    console.error('[BoviCare] Auth error:', err);
    if (errorEl) {
      errorEl.textContent = err.message || 'Authentication failed. Please verify credentials.';
      errorEl.style.display = 'block';
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Handle Sign Out
async function handleSignOut() {
  if (supabaseClient) {
    try {
      await supabaseClient.auth.signOut();
      currentSession = null;
      currentProfile = null;
      currentFarm = null;
      updateCloudStatusUI();
      closeSupabaseAuthModal();
      showToast('Signed out of BoviCare cloud.');
    } catch (err) {
      console.error('[BoviCare] Sign out error:', err);
    }
  }
}

// Save connection settings (URL and Anon Key)
function handleSaveConfig(e) {
  e.preventDefault();
  const url = document.getElementById('inputSupabaseUrl').value.trim();
  const key = document.getElementById('inputSupabaseAnonKey').value.trim();
  const msgEl = document.getElementById('configStatusMsg');

  if (!url || !key) return;

  const saved = setSupabaseCredentials(url, key);
  if (saved) {
    if (msgEl) {
      msgEl.style.display = 'block';
      msgEl.style.background = '#EAF7EE';
      msgEl.style.borderColor = '#A3E635';
      msgEl.style.color = '#15803D';
      msgEl.textContent = 'Settings saved! Client initialized.';
    }
    updateCloudStatusUI();
    showToast('Supabase connection initialized.');
    setTimeout(() => {
      switchAuthTab('session');
    }, 800);
  }
}
