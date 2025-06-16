
import { supabase } from './supabase'

const API_BASE = 'http://localhost:3000'

class ApiClient {
  private async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    return {
      'Content-Type': 'application/json',
      'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
    }
  }

  async createAudit(url: string) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${API_BASE}/api/audits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url }),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create audit')
    }
    
    return response.json()
  }

  async getAudits() {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${API_BASE}/api/audits`, {
      method: 'GET',
      headers,
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch audits')
    }
    
    return response.json()
  }

  async getAudit(id: string) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${API_BASE}/api/audits/${id}`, {
      method: 'GET',
      headers,
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch audit')
    }
    
    return response.json()
  }

  async getUserProfile() {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      method: 'GET',
      headers,
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }
    
    return response.json()
  }

  createProgressStream(auditId: string) {
    return new EventSource(`${API_BASE}/api/audits/${auditId}/progress`)
  }
}

export const apiClient = new ApiClient()
