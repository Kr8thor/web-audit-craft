
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { apiClient } from '@/lib/api'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Globe } from 'lucide-react'

export default function AuditForm() {
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()

  const createAuditMutation = useMutation({
    mutationFn: (url: string) => apiClient.createAudit(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audits'] })
      toast.success('Audit started successfully!')
      setUrl('')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to start audit')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error('Please enter a valid URL')
      return
    }
    
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`)
      createAuditMutation.mutate(url)
    } catch {
      toast.error('Please enter a valid URL')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-3">
        <Globe className="text-blue-600 dark:text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Start New Audit
        </h3>
      </div>
      
      <div className="flex space-x-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., example.com)"
          className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={createAuditMutation.isPending}
        />
        <Button
          type="submit"
          disabled={createAuditMutation.isPending || !url.trim()}
          className="flex items-center space-x-2"
        >
          {createAuditMutation.isPending ? (
            <LoadingSpinner size="sm" />
          ) : (
            <span>Start Audit</span>
          )}
        </Button>
      </div>
    </form>
  )
}
