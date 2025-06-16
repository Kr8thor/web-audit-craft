
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cehtwnfdqjehmztnnbch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaHR3bmZkcWplaG16dG5uYmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjM2MDgsImV4cCI6MjA2NTUzOTYwOH0.2Y2h_VpTnVlPVwbMzQaz2-f0Hgtrd_fWp5i1Z6-KkVk'

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
