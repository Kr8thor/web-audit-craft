import { supabase } from './supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Auth API calls
export const authAPI = {
  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  async logout(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.json()
  }
}

// Audit API calls
export const auditAPI = {
  async createAudit(url: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/api/audits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
    return response.json()
  },

  async getAudits(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/audits`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.json()
  },

  async getAudit(id: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/api/audits/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.json()
  },

  // Server-Sent Events for real-time progress
  createProgressStream(auditId: string, token: string) {
    return new EventSource(`${API_BASE_URL}/api/audits/${auditId}/progress`, {
      withCredentials: false,
      // Note: EventSource doesn't support custom headers, so we'll need to handle auth differently
      // For now, we'll use query params for the token
    })
  }
}

// Usage API calls
export const usageAPI = {
  async getUsage(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/usage`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return response.json()
  }
}

// Helper function to handle API errors
export function handleAPIError(error: any) {
  console.error('API Error:', error)
  
  if (error.status === 401) {
    // Unauthorized - redirect to login
    window.location.href = '/auth'
    return
  }
  
  if (error.status === 429) {
    // Rate limited
    throw new Error('Rate limit exceeded. Please upgrade your plan or try again later.')
  }
  
  if (error.message) {
    throw new Error(error.message)
  }
  
  throw new Error('An unexpected error occurred. Please try again.')
}

// Types
export interface Audit {
  id: string
  url: string
  status: 'processing' | 'completed' | 'failed'
  score?: number
  results?: {
    technicalIssues: string[]
    onPageIssues: string[]
    recommendations: string[]
    metrics: {
      title?: string
      metaDescription?: string
      h1Count?: number
      imagesWithoutAlt?: number
      loadTime?: number
    }
  }
  error?: string
  createdAt: string
  completedAt?: string
}

export interface User {
  id: string
  email: string
  plan: 'free' | 'pro' | 'agency'
  usage?: {
    today: number
    limit: number
  }
}

export interface Usage {
  used: number
  limit: number
  resetDate: string
}