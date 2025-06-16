
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, auth } from '@/integrations/supabase/client'
import { User } from '@/lib/api'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  userPlan: 'free' | 'pro' | 'agency'
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session)
      setToken(session?.access_token || null)
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        plan: session.user.user_metadata?.plan || 'free'
      } : null)
      setLoading(false)
    })

    // THEN check for existing session
    auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session)
      setToken(session?.access_token || null)
      setUser(session?.user ? {
        id: session.user.id,
        email: session.user.email!,
        plan: session.user.user_metadata?.plan || 'free'
      } : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        throw new Error(error.message)
      }

      toast.success('Successfully signed in!')
    } catch (error: any) {
      console.error('Sign in error:', error)
      toast.error(error.message || 'Failed to sign in')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const redirectUrl = `${window.location.origin}/`
      
      const { data, error } = await auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      })
      
      if (error) {
        throw new Error(error.message)
      }

      if (data.user && !data.session) {
        toast.success('Check your email for the confirmation link!')
      } else if (data.session) {
        toast.success('Account created successfully!')
      }
    } catch (error: any) {
      console.error('Sign up error:', error)
      toast.error(error.message || 'Failed to create account')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await auth.signOut()
      
      if (error) {
        throw new Error(error.message)
      }

      toast.success('Successfully signed out!')
    } catch (error: any) {
      console.error('Sign out error:', error)
      toast.error(error.message || 'Failed to sign out')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value = {
    user,
    token,
    loading,
    userPlan: user?.plan || 'free',
    signIn,
    signUp,
    signOut,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
