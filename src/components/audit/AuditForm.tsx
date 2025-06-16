
import React, { useState } from 'react'
import { X, Globe, AlertCircle } from 'lucide-react'
import { apiClient } from '@/lib/api'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

interface AuditFormProps {
  onClose: () => void
  onAuditCreated: () => void
}

export default function AuditForm({ onClose, onAuditCreated }: AuditFormProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    
    if (!validateUrl(fullUrl)) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)

    try {
      await apiClient.createAudit(fullUrl)
      onAuditCreated()
    } catch (error: any) {
      setError(error.message || 'Failed to create audit')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Start New SEO Audit
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Website URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="example.com or https://example.com"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !url.trim()}
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Start Audit'}
            </Button>
          </div>
        </form>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>What we'll analyze:</strong> Technical SEO, on-page optimization, 
            performance metrics, and accessibility issues.
          </p>
        </div>
      </div>
    </div>
  )
}
