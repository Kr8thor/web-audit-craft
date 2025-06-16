
// Mock API client for demo purposes
export const apiClient = {
  async createAudit(url: string) {
    // In a real app, this would call your backend API
    console.log('Creating audit for:', url)
    
    // Mock audit creation
    const mockAudit = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      status: 'pending' as const,
      created_at: new Date().toISOString()
    }
    
    return mockAudit
  },

  async getAudits() {
    // Mock data for demo
    return [
      {
        id: '1',
        url: 'https://example.com',
        status: 'completed' as const,
        score: 85,
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        url: 'https://test.com',
        status: 'pending' as const,
        created_at: new Date(Date.now() - 3600000).toISOString()
      }
    ]
  },

  async getAudit(id: string) {
    // Mock single audit data
    return {
      id,
      url: 'https://example.com',
      status: 'completed' as const,
      score: 85,
      results: {
        technicalIssues: [],
        onPageIssues: [],
        recommendations: [],
        metrics: {}
      },
      created_at: new Date().toISOString(),
      completed_at: new Date().toISOString()
    }
  },

  async getUserProfile() {
    // Mock user profile
    return {
      id: '1',
      email: 'user@example.com',
      plan: 'free' as const
    }
  }
}

// Types
export interface Audit {
  id: string
  url: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
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
  created_at: string
  completed_at?: string
}

export interface User {
  id: string
  email: string
  plan: 'free' | 'pro' | 'agency'
}
