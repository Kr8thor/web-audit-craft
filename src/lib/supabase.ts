import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cehtwnfdqjehmztnnbch.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseAnonKey) {
  console.warn('Missing Supabase anon key. Please set VITE_SUPABASE_ANON_KEY environment variable.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  signUp: (email: string, password: string) => 
    supabase.auth.signUp({ email, password }),
  
  signIn: (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
  
  getCurrentUser: () => supabase.auth.getUser(),
  
  getSession: () => supabase.auth.getSession(),
  
  onAuthStateChange: (callback: (event: string, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback)
}

// Database helpers
export const db = {
  // Audits
  getAudits: (userId: string) =>
    supabase
      .from('audits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false }),
  
  getAudit: (id: string, userId: string) =>
    supabase
      .from('audits')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single(),
  
  createAudit: (audit: any) =>
    supabase.from('audits').insert(audit),
  
  updateAudit: (id: string, updates: any) =>
    supabase.from('audits').update(updates).eq('id', id),
  
  // Usage tracking
  getUsage: (userId: string, date: string) =>
    supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single(),
  
  incrementUsage: (userId: string, date: string) =>
    supabase.rpc('increment_usage', { user_id: userId, usage_date: date })
}

export default supabase