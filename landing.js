/**
 * BoviCare Website Landing Page — Interactive Controller
 * Handles hero cow animations, AI scan HUD, clinical simulator, and navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCowInteractions();
  initClinicalSimulator();
  initMobileMenu();
  initScrollHeader();
  initVideoMotionFlow();
});

// 1. Hero Cow Animations & AI Scan Mode
let isAiScanActive = false;

function initHeroCowInteractions() {
  const cowWrapper = document.getElementById('heroCowWrapper');
  const hud = document.getElementById('aiScanHud');
  const toggleBtn = document.getElementById('btnToggleAiScan');
  const soundBtn = document.getElementById('btnCowSound');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isAiScanActive = !isAiScanActive;
      updateAiScanState(hud, toggleBtn);
    });
  }

  if (cowWrapper) {
    cowWrapper.addEventListener('mouseenter', () => {
      if (!isAiScanActive && hud) hud.classList.add('active');
    });

    cowWrapper.addEventListener('mouseleave', () => {
      if (!isAiScanActive && hud) hud.classList.remove('active');
    });

    cowWrapper.addEventListener('click', () => {
      playSynthesizedMoo();
      // Brief ripple effect
      cowWrapper.style.transform = 'scale(1.04)';
      setTimeout(() => { cowWrapper.style.transform = ''; }, 250);
    });
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      playSynthesizedMoo();
    });
  }
}

function updateAiScanState(hud, toggleBtn) {
  if (isAiScanActive) {
    if (hud) hud.classList.add('active');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.innerHTML = '<span>🟢 Clinical AI Scan: ON</span>';
    }
  } else {
    if (hud) hud.classList.remove('active');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.innerHTML = '<span>✨ Toggle Clinical AI Scan</span>';
    }
  }
}

// Gentle Web Audio API Sound for the Cow / Chime
function playSynthesizedMoo() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Low frequency warm resonant wave mimicking low pitch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(145, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5);
    osc.frequency.exponentialRampToValueAtTime(85, ctx.currentTime + 1.1);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.25);
  } catch (e) {
    // Audio Context not permitted or blocked
  }
}

// 2. Interactive Clinical Simulator
const SIM_CASES = {
  healthy: {
    title: 'Gauri (#101) — Normal Health Baseline',
    badgeText: '● Healthy / Normal',
    badgeClass: 'normal',
    cowBreed: 'Holstein Friesian Cross',
    temp: '38.6°C (Normal Bovine)',
    milkYield: '22.5 L/day',
    cmt: 'Negative (Clear)',
    scc: '< 150,000 / mL (Premium Grade)',
    quarters: [
      { name: 'LF', status: 'Clear', cls: 'clear' },
      { name: 'RF', status: 'Clear', cls: 'clear' },
      { name: 'LR', status: 'Clear', cls: 'clear' },
      { name: 'RR', status: 'Clear', cls: 'clear' }
    ],
    statusText: 'All 4 quarters pliable. Fore-stripping clear. Milk approved for dairy collection.',
    recommendation: 'Next routine check in 7 days.'
  },
  subclinical: {
    title: 'Laxmi (#102) — Subclinical Mastitis Detected',
    badgeText: '⚠️ High Risk / Monitor',
    badgeClass: 'alert',
    cowBreed: 'Gir Indigenous Cross',
    temp: '39.3°C (Slight Elevation)',
    milkYield: '17.2 L/day (↓ 15%)',
    cmt: 'Trace (+1 Gelation in RF)',
    scc: '480,000 / mL (High Risk)',
    quarters: [
      { name: 'LF', status: 'Clear', cls: 'clear' },
      { name: 'RF', status: 'Firmness', cls: 'affected' },
      { name: 'LR', status: 'Clear', cls: 'clear' },
      { name: 'RR', status: 'Clear', cls: 'clear' }
    ],
    statusText: 'Early inflammation detected in Right Front (RF). No visible clots yet.',
    recommendation: 'Alert dispatched to attending veterinarian for prompt evaluation.'
  },
  prescribed: {
    title: 'Rani (#103) — Clinical Review & Rx Active',
    badgeText: '💊 Prescription Active',
    badgeClass: 'normal',
    cowBreed: 'Jersey Dairy Cross',
    temp: '38.7°C (Controlled)',
    milkYield: '19.0 L/day (Stabilized)',
    cmt: 'Improving (+0.5)',
    scc: '220,000 / mL',
    quarters: [
      { name: 'LF', status: 'Clear', cls: 'clear' },
      { name: 'RF', status: 'Clear', cls: 'clear' },
      { name: 'LR', status: 'Rx Active', cls: 'affected' },
      { name: 'RR', status: 'Clear', cls: 'clear' }
    ],
    statusText: 'Rx: Cefquinome 75mg Intramammary. 72h milk withholding timer running.',
    recommendation: 'Strict discard protocol active. Recovery on schedule.'
  }
};

function initClinicalSimulator() {
  const buttons = document.querySelectorAll('.sim-case-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const caseKey = btn.getAttribute('data-case');
      renderSimulatorCase(caseKey);
    });
  });
}

function renderSimulatorCase(key) {
  const data = SIM_CASES[key];
  if (!data) return;

  const titleEl = document.getElementById('simDisplayTitle');
  const badgeEl = document.getElementById('simDisplayBadge');
  const tempEl = document.getElementById('simDisplayTemp');
  const sccEl = document.getElementById('simDisplayScc');
  const yieldEl = document.getElementById('simDisplayYield');
  const cmtEl = document.getElementById('simDisplayCmt');
  const quartersEl = document.getElementById('simQuartersContainer');
  const descEl = document.getElementById('simDisplayStatusText');

  if (titleEl) titleEl.textContent = data.title;
  if (badgeEl) {
    badgeEl.textContent = data.badgeText;
    badgeEl.className = `display-badge ${data.badgeClass}`;
  }
  if (tempEl) tempEl.textContent = data.temp;
  if (sccEl) sccEl.textContent = data.scc;
  if (yieldEl) yieldEl.textContent = data.milkYield;
  if (cmtEl) cmtEl.textContent = data.cmt;
  if (descEl) descEl.textContent = `${data.statusText} ${data.recommendation}`;

  if (quartersEl) {
    quartersEl.innerHTML = data.quarters.map(q => `
      <div class="quarter-cell ${q.cls}">
        <div class="quarter-name">${q.name}</div>
        <div class="quarter-status ${q.cls}">${q.status}</div>
      </div>
    `).join('');
  }
}

// 3. Mobile Navigation Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('desktopNav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '70px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = '#FAF9F5';
      nav.style.padding = '20px';
      nav.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      menuBtn.textContent = isOpen ? '☰' : '✕';
    });
  }
}

// 4. Header Shadow on Scroll
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 5. Video-Inspired Moving Landing Page Simulator Controller
let currentFlowStage = 1;
let isFlowAutoPlaying = true;
let flowTimer = null;
let typingInterval = null;

function initVideoMotionFlow() {
  const container = document.getElementById('flowSimulatorViewport');
  const stepButtons = document.querySelectorAll('.flow-step-btn');
  const autoPlayBtn = document.getElementById('btnAutoPlay');
  const progressBar = document.getElementById('flowProgressBar');
  const loginBtn = document.getElementById('simBtnLogin');
  const catPills = document.querySelectorAll('.dash-cat-pill');

  if (!container) return;

  function goToStage(stageNum, manual = false) {
    if (manual && isFlowAutoPlaying) {
      stopAutoPlay();
    }

    currentFlowStage = stageNum;
    container.className = `phone-screen stage-${stageNum === 1 ? 'splash' : stageNum === 2 ? 'welcome' : 'dashboard'}`;

    stepButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-stage')) === stageNum);
    });

    if (progressBar) {
      progressBar.style.width = stageNum === 1 ? '33.3%' : stageNum === 2 ? '66.6%' : '100%';
    }

    if (stageNum === 2) {
      simulateTypingInputs();
    } else {
      clearInterval(typingInterval);
    }
  }

  function simulateTypingInputs() {
    const emailInput = document.getElementById('simEmailInput');
    const passInput = document.getElementById('simPassInput');
    if (!emailInput || !passInput) return;

    emailInput.value = '';
    passInput.value = '';

    const targetEmail = 'farmer@sahyadridairy.com';
    const targetPass = '••••••••';
    let emailIdx = 0;
    let passIdx = 0;

    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
      if (emailIdx < targetEmail.length) {
        emailInput.value += targetEmail[emailIdx];
        emailIdx++;
      } else if (passIdx < targetPass.length) {
        passInput.value += targetPass[passIdx];
        passIdx++;
      } else {
        clearInterval(typingInterval);
      }
    }, 45);
  }

  // Handle stage buttons
  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = parseInt(btn.getAttribute('data-stage'));
      goToStage(stage, true);
    });
  });

  // Handle login click with video-style spinner
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginBtn.classList.add('spinning');
      setTimeout(() => {
        loginBtn.classList.remove('spinning');
        goToStage(3, true);
      }, 700);
    });
  }

  // Handle category pills in dashboard stage
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Auto-play loop
  function startAutoPlay() {
    isFlowAutoPlaying = true;
    if (autoPlayBtn) {
      autoPlayBtn.innerHTML = '<span>⏸️ Pause Flow</span>';
      autoPlayBtn.style.borderColor = '#22C55E';
    }
    clearInterval(flowTimer);
    flowTimer = setInterval(() => {
      let nextStage = currentFlowStage + 1;
      if (nextStage > 3) nextStage = 1;
      goToStage(nextStage, false);
    }, 4200);
  }

  function stopAutoPlay() {
    isFlowAutoPlaying = false;
    clearInterval(flowTimer);
    if (autoPlayBtn) {
      autoPlayBtn.innerHTML = '<span>▶️ Resume Flow</span>';
      autoPlayBtn.style.borderColor = '#E2E8F0';
    }
  }

  if (autoPlayBtn) {
    autoPlayBtn.addEventListener('click', () => {
      if (isFlowAutoPlaying) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  }

  // Start initial auto-play
  startAutoPlay();
}

// 6. Landing Page Multi-Language Localization System (EN, MR, HI)
const LANDING_I18N = {
  en: {
    navFarmer: "🌾 Farmer Login",
    navVet: "🩺 Vet Login",
    navSignIn: "Sign In / Start →",
    badge: "Next-Gen Bovine Care · AI Mastitis Screening & Triage",
    headline: "Healthier Herds Start with <span class=\"highlight\">Early Detection.</span>",
    desc: "Support better udder health with early mastitis screening, non-invasive image records, and rapid veterinary follow-up — all united in one intelligent platform.",
    getStarted: "Get Started Free →",
    features: "Explore Features",
    vetTriage: "🩺 Open Vet Triage"
  },
  mr: {
    navFarmer: "🌾 शेतकरी लॉगिन",
    navVet: "🩺 पशुवैद्यक लॉगिन",
    navSignIn: "प्रवेश करा / सुरू करा →",
    badge: "आधुनिक गोवंश आरोग्य · AI कासदाह तपासणी व ट्रायज",
    headline: "निरोगी कळपाची सुरुवात होते <span class=\"highlight\">लवकर निदानापासून.</span>",
    desc: "लवकर कासदाह चाचणी, बिनधास्त छायाचित्र नोंदी आणि तात्काळ पशुवैद्यकीय सहाय्यासह दुग्ध उत्पादनात भरभराट आणा — एकाच स्मार्ट प्लॅटफॉर्मवर.",
    getStarted: "विनामूल्य सुरू करा →",
    features: "वैशिष्ट्ये पहा",
    vetTriage: "🩺 पशुवैद्यकीय ट्रायज उघडा"
  },
  hi: {
    navFarmer: "🌾 किसान लॉगिन",
    navVet: "🩺 पशु चिकित्सक लॉगिन",
    navSignIn: "साइन इन / शुरू करें →",
    badge: "अगली पीढ़ी का गोवंश स्वास्थ्य · AI थनैल जांच व ट्राइएज",
    headline: "स्वस्थ झुंड की शुरुआत होती है <span class=\"highlight\">शीघ्र पहचान से।</span>",
    desc: "प्रारंभिक थनैल जांच, सुरक्षित फोटो रिकॉर्ड और तत्काल पशु चिकित्सा सहायता के साथ अपने डेयरी फार्म को सशक्त बनाएं — एक ही मंच पर।",
    getStarted: "निःशुल्क शुरू करें →",
    features: "सुविधाएं देखें",
    vetTriage: "🩺 पशु चिकित्सा ट्राइएज खोलें"
  }
};

let currentLandingLang = localStorage.getItem('bovicare_lang') || 'en';

function setLandingLanguage(lang) {
  if (!LANDING_I18N[lang]) lang = 'en';
  currentLandingLang = lang;
  localStorage.setItem('bovicare_lang', lang);

  document.querySelectorAll('.landing-lang-picker .lang-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const d = LANDING_I18N[lang];
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

  setText('btnNavFarmerLogin', d.navFarmer);
  setText('btnNavVetLogin', d.navVet);
  setText('btnNavSignIn', d.navSignIn);
  setText('heroPillBadgeText', d.badge);
  setHtml('landingHeroHeadline', d.headline);
  setText('landingHeroDesc', d.desc);
  setText('btnHeroGetStarted', d.getStarted);
  setText('btnHeroFeatures', d.features);
  setText('btnHeroVetTriage', d.vetTriage);
}

document.addEventListener('DOMContentLoaded', () => {
  setLandingLanguage(currentLandingLang);
});
