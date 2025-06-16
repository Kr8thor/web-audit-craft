
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cehtwnfdqjehmztnnbch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaHR3bmZkcWplaG16dG5uYmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjM2MDgsImV4cCI6MjA2NTUzOTYwOH0.2Y2h_VpTnVlPVwbMzQaz2-f0Hgtrd_fWp5i1Z6-KkVk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})

export const auth = supabase.auth
