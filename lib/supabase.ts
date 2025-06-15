import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      audits: {
        Row: {
          id: string
          url: string
          status: 'processing' | 'completed' | 'failed'
          score: number | null
          results: Json | null
          error: string | null
          user_id: string
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          url: string
          status?: 'processing' | 'completed' | 'failed'
          score?: number | null
          results?: Json | null
          error?: string | null
          user_id: string
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          url?: string
          status?: 'processing' | 'completed' | 'failed'
          score?: number | null
          results?: Json | null
          error?: string | null
          user_id?: string
          created_at?: string
          completed_at?: string | null
        }
      }
      usage: {
        Row: {
          id: string
          user_id: string
          date: string
          count: number
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          count?: number
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          count?: number
        }
      }
    }
  }
}

// Create a Supabase client for server-side operations
export function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Create an admin client for background operations
export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
