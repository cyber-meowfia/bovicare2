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

  if (selectedRole === 'vet') {
    if (hintBox) {
      hintBox.className = 'role-hint-box vet';
      hintBox.innerHTML = `🩺 <strong>Veterinarian Access:</strong> Priority clinical triage queue, quarter-specific udder localization (LF, RF, LR, RR), and digital prescription plans.`;
    }
    if (submitText) submitText.textContent = 'Sign In as Veterinarian →';
    if (heroBadge) heroBadge.textContent = '🩺 Veterinarian Portal Mode';
  } else {
    if (hintBox) {
      hintBox.className = 'role-hint-box';
      hintBox.innerHTML = `🌾 <strong>Farmer Access:</strong> Cattle catalog, daily milk yield, udder photo logging, and withdrawal safety timers.`;
    }
    if (submitText) submitText.textContent = 'Sign In as Dairy Farmer →';
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

      if (supabase && typeof supabase.auth?.signInWithPassword === 'function') {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) {
            console.warn('Supabase auth warning, proceeding in demo mode:', error.message);
          }
        } catch (authErr) {
          console.warn('Supabase connection error:', authErr);
        }
      }

      showLoginToast(`Welcome! Opening ${role === 'vet' ? 'Veterinary Portal' : 'Farmer Dashboard'}...`);

      // Smooth redirection to live application
      setTimeout(() => {
        window.location.href = `/app?role=${encodeURIComponent(role)}`;
      }, 750);
    } catch (err) {
      console.error('Login error:', err);
      showLoginToast('Login completed in offline mode.');
      setTimeout(() => {
        window.location.href = `/app?role=${encodeURIComponent(role)}`;
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
