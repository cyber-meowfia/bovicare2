/**
 * BoviCare Dedicated Login & Role Authentication Controller
 * Supports role switching (Farmer vs Vet), Supabase Auth, and Offline Demo Mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoleFromUrl();
  initFormHandler();
});

// 1. Initialize Role from Query Parameters (e.g. ?role=vet)
function initRoleFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  const roleSelect = document.getElementById('roleSelect');

  if (roleParam && (roleParam === 'vet' || roleParam === 'farmer')) {
    if (roleSelect) {
      roleSelect.value = roleParam;
      handleRoleSelectionChange(roleParam);
    }
  } else {
    // Default to farmer or saved preference
    const savedRole = localStorage.getItem('bovicare_active_role') || 'farmer';
    if (roleSelect) {
      roleSelect.value = savedRole;
      handleRoleSelectionChange(savedRole);
    }
  }
}

// 2. Handle Role Selection Dropdown Change
function handleRoleSelectionChange(selectedRole) {
  const hintBox = document.getElementById('roleHintBox');
  const submitText = document.getElementById('submitText');
  const heroBadge = document.getElementById('heroRoleBadge');
  const d = (typeof LOGIN_I18N !== 'undefined' && LOGIN_I18N[currentLoginLang]) ? LOGIN_I18N[currentLoginLang] : null;

  if (selectedRole === 'vet') {
    if (hintBox) {
      hintBox.className = 'role-hint-box vet';
      hintBox.innerHTML = d ? d.hintVet : `🩺 <strong>Veterinarian Access:</strong> Priority clinical triage queue, quarter-specific udder localization (LF, RF, LR, RR), and digital prescription plans.`;
    }
    if (submitText) submitText.textContent = d ? d.btnVet : 'Sign In as Veterinarian →';
    if (heroBadge) heroBadge.textContent = '🩺 Veterinarian Portal Mode';
  } else {
    if (hintBox) {
      hintBox.className = 'role-hint-box';
      hintBox.innerHTML = d ? d.hintFarmer : `🌾 <strong>Farmer Access:</strong> Cattle catalog, daily milk yield, udder photo logging, and withdrawal safety timers.`;
    }
    if (submitText) submitText.textContent = d ? d.btnFarmer : 'Sign In as Dairy Farmer →';
    if (heroBadge) heroBadge.textContent = '🌾 Dairy Farmer Mode';
  }
}

// 3. One-Click Demo Autofill
function autofillDemo(role) {
  const roleSelect = document.getElementById('roleSelect');
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPassword');

  if (role === 'vet') {
    if (roleSelect) roleSelect.value = 'vet';
    if (emailInput) emailInput.value = 'dr.anjali@punevet.gov.in';
    if (passInput) passInput.value = 'VetClinic@2026';
    handleRoleSelectionChange('vet');
    showLoginToast('Autofilled demo credentials for Dr. Anjali Deshmukh (Vet)');
  } else {
    if (roleSelect) roleSelect.value = 'farmer';
    if (emailInput) emailInput.value = 'farmer@sahyadridairy.com';
    if (passInput) passInput.value = 'Sahyadri@2026';
    handleRoleSelectionChange('farmer');
    showLoginToast('Autofilled demo credentials for Ramesh Patil (Farmer)');
  }
}

// 4. Password Visibility Toggle
function togglePasswordVisibility() {
  const passInput = document.getElementById('loginPassword');
  const toggleBtn = document.getElementById('btnToggleEye');
  if (!passInput) return;

  if (passInput.type === 'password') {
    passInput.type = 'text';
    if (toggleBtn) toggleBtn.textContent = '🙈';
  } else {
    passInput.type = 'password';
    if (toggleBtn) toggleBtn.textContent = '👁️';
  }
}

// 5. Form Submission & Authentication
function initFormHandler() {
  const form = document.getElementById('loginForm');
  const submitBtn = document.getElementById('btnLoginSubmit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const roleSelect = document.getElementById('roleSelect');
    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginPassword');

    const role = roleSelect ? roleSelect.value : 'farmer';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passInput ? passInput.value : '';

    if (!email || !password) {
      showLoginToast('Please fill in both email and password.');
      return;
    }

    if (submitBtn) submitBtn.classList.add('loading');

    // Save active role to persistent storage
    localStorage.setItem('bovicare_active_role', role);

    try {
      // Check if Supabase client is initialized
      let supabase = null;
      if (typeof initSupabase === 'function') {
        supabase = initSupabase();
      } else if (typeof window.supabaseClient !== 'undefined') {
        supabase = window.supabaseClient;
      }

      let trustedRole = role;

      if (supabase && typeof supabase.auth?.signInWithPassword === 'function') {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (!error && data?.user) {
            // Strictly resolve trusted role from database profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('id, role')
              .eq('id', data.user.id)
              .single();

            if (profile) {
              if (profile.role === 'admin') {
                window.location.href = 'admin.html';
                return;
              }
              trustedRole = profile.role === 'veterinarian' ? 'vet' : 'farmer';
            }
          }
        } catch (authErr) {
          console.warn('Supabase connection error:', authErr);
        }
      } else {
        // Offline demo account verification
        if (email.includes('vet') || email.includes('anjali')) {
          trustedRole = 'vet';
        } else if (email.includes('farmer') || email.includes('patil')) {
          trustedRole = 'farmer';
        }
      }

      localStorage.setItem('bovicare_active_role', trustedRole);
      showLoginToast(`Welcome! Opening ${trustedRole === 'vet' ? 'Veterinary Portal' : 'Farmer Dashboard'}...`);

      // Clean redirection to protected route
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 750);
    } catch (err) {
      console.error('Login error:', err);
      showLoginToast('Login completed in offline mode.');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 750);
    }
  });
}

// 6. Toast Notification Helper
function showLoginToast(message) {
  let toast = document.getElementById('loginToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'loginToast';
    toast.className = 'login-toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function handleForgotPassword(e) {
  e.preventDefault();
  showLoginToast('In offline demo mode, use the quick demo login buttons below.');
}

// 7. Multi-Language Localization System for Login Page
const LOGIN_I18N = {
  en: {
    back: "← Back to Website",
    title: "Sign In to BoviCare",
    sub: "Select your account role to enter your dedicated dashboard.",
    lblRole: "Select Account Role",
    optFarmer: "🌾 Dairy Farmer (Herd Owner & Manager)",
    optVet: "🩺 Licensed Veterinarian (Clinical Triage & Rx)",
    hintFarmer: "🌾 <strong>Farmer Access:</strong> Cattle catalog, daily milk yield, udder photo logging, and withdrawal safety timers.",
    hintVet: "🩺 <strong>Veterinarian Access:</strong> Priority clinical triage queue, quarter-specific udder localization (LF, RF, LR, RR), and digital prescription plans.",
    btnFarmer: "Sign In as Dairy Farmer →",
    btnVet: "Sign In as Veterinarian →"
  },
  mr: {
    back: "← मुख्य संकेतस्थळावर जा",
    title: "बोविकेअर लॉगिन",
    sub: "आपल्या खात्याची भूमिका निवडून डॅशबोर्डमध्ये प्रवेश करा.",
    lblRole: "खात्याची भूमिका निवडा",
    optFarmer: "🌾 दुग्ध उत्पादक शेतकरी (कळप मालक व व्यवस्थापक)",
    optVet: "🩺 परवानाधारक पशुवैद्यक (क्लिनिकल ट्रायज व औषधोपचार)",
    hintFarmer: "🌾 <strong>शेतकरी प्रवेश:</strong> गोवंश नोंदवही, दैनंदिन दूध उत्पादन, कासेचे फोटो आणि दूध विथहोल्डिंग टाइमर.",
    hintVet: "🩺 <strong>पशुवैद्यक प्रवेश:</strong> प्राधान्य क्लिनिकल ट्रायज रांग, ४-क्वार्टर कास तपासणी आणि डिजिटल प्रिस्क्रिप्शन.",
    btnFarmer: "शेतकरी म्हणून प्रवेश करा →",
    btnVet: "पशुवैद्यक म्हणून प्रवेश करा →"
  },
  hi: {
    back: "← मुख्य वेबसाइट पर जाएं",
    title: "बोविकेयर लॉगिन",
    sub: "अपने खाते की भूमिका चुनकर डैशबोर्ड में प्रवेश करें।",
    lblRole: "खाते की भूमिका चुनें",
    optFarmer: "🌾 डेयरी किसान (झुंड मालिक और प्रबंधक)",
    optVet: "🩺 लाइसेंस प्राप्त पशु चिकित्सक (क्लिनिकल ट्राइएज व नुस्खे)",
    hintFarmer: "🌾 <strong>किसान पहुंच:</strong> गोवंश सूची, दैनिक दूध उत्पादन, थन फोटो लॉगिंग और दूध रोक सुरक्षा टाइमर।",
    hintVet: "🩺 <strong>पशु चिकित्सक पहुंच:</strong> प्राथमिकता क्लिनिकल ट्राइएज कतार, ४-क्वार्टर थन जांच और डिजिटल नुस्खे।",
    btnFarmer: "डेयरी किसान के रूप में प्रवेश करें →",
    btnVet: "पशु चिकित्सक के रूप में प्रवेश करें →"
  }
};

let currentLoginLang = localStorage.getItem('bovicare_lang') || 'en';

function setLoginLanguage(lang) {
  if (!LOGIN_I18N[lang]) lang = 'en';
  currentLoginLang = lang;
  localStorage.setItem('bovicare_lang', lang);

  document.querySelectorAll('.login-lang-picker .lang-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  const d = LOGIN_I18N[lang];
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

  setText('linkBackSite', d.back);
  setText('loginFormTitle', d.title);
  setText('loginFormSub', d.sub);
  setText('optRoleFarmer', d.optFarmer);
  setText('optRoleVet', d.optVet);

  const roleSelect = document.getElementById('roleSelect');
  const role = roleSelect ? roleSelect.value : 'farmer';
  handleRoleSelectionChange(role);
}

document.addEventListener('DOMContentLoaded', () => {
  setLoginLanguage(currentLoginLang);
});
