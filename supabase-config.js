/**
 * BoviCare — Centralized Supabase Client Configuration & State Helper
 * Injected centrally via environment variables (SUPABASE_URL, SUPABASE_ANON_KEY).
 * Farmers and veterinarians are never asked to enter connection details manually.
 * Strictly uses publishable anon key architecture. Service-role keys and database passwords
 * are never exposed to browser-accessible code.
 */

const BOVICARE_CONFIG = {
  SUPABASE_URL: (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) || 
                (typeof process !== 'undefined' && (process.env?.SUPABASE_URL || process.env?.BOVICARE_SUPABASE_URL)) || 
                (typeof localStorage !== 'undefined' && localStorage.getItem('bovicare_supabase_url')) || '',
  SUPABASE_ANON_KEY: (typeof window !== 'undefined' && window.ENV_SUPABASE_ANON_KEY) || 
                     (typeof process !== 'undefined' && (process.env?.SUPABASE_ANON_KEY || process.env?.BOVICARE_SUPABASE_ANON_KEY)) || 
                     (typeof localStorage !== 'undefined' && localStorage.getItem('bovicare_supabase_anon_key')) || ''
};

let supabaseClient = null;
let currentSession = null;
let currentProfile = null;
let currentFarm = null;

// Centralized Supabase Client Initialization
function initSupabase() {
  const url = BOVICARE_CONFIG.SUPABASE_URL;
  const key = BOVICARE_CONFIG.SUPABASE_ANON_KEY;

  if (url && key && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return supabaseClient;
    } catch (err) {
      console.error('[BoviCare] Supabase initialization failed:', err);
      return null;
    }
  }
  return null;
}

// Check if Supabase backend is configured and ready
function isSupabaseConfigured() {
  return Boolean(BOVICARE_CONFIG.SUPABASE_URL && BOVICARE_CONFIG.SUPABASE_ANON_KEY && supabaseClient);
}

// Ensure active farm for authenticated farmer
async function ensureActiveFarm(userId) {
  if (!supabaseClient || !userId) return null;

  try {
    // 1. Check if user is already a member of a farm
    const { data: membership, error: memberErr } = await supabaseClient
      .from('farm_members')
      .select('farm_id, member_role, farms:farm_id (*)')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle();

    if (membership && membership.farms) {
      currentFarm = membership.farms;
      return currentFarm;
    }

    // 2. If no farm exists, create default farm for the farmer
    const defaultRegCode = `FARM-${Date.now().toString().slice(-6)}`;
    const { data: newFarm, error: farmErr } = await supabaseClient
      .from('farms')
      .insert({
        name: 'My BoviCare Dairy Farm',
        registration_code: defaultRegCode,
        created_by: userId
      })
      .select('*')
      .single();

    if (farmErr) throw farmErr;

    // 3. Link user as owner in farm_members
    const { error: linkErr } = await supabaseClient
      .from('farm_members')
      .insert({
        farm_id: newFarm.id,
        user_id: userId,
        member_role: 'owner'
      });

    if (linkErr) throw linkErr;

    currentFarm = newFarm;
    return currentFarm;
  } catch (err) {
    console.error('[BoviCare] Failed to ensure active farm:', err);
    throw err;
  }
}
