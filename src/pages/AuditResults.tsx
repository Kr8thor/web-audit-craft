
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { ArrowLeft, ExternalLink, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

export default function AuditResults() {
  const { id } = useParams<{ id: string }>()

  const { data: audit, isLoading, error } = useQuery({
    queryKey: ['audit', id],
    queryFn: () => apiClient.getAudit(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !audit) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Audit Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The audit you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-slate-600 dark:text-slate-400" size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Audit Results
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-slate-600 dark:text-slate-400">{audit.url}</span>
              <a
                href={audit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Status and Score */}
      <div className="glass dark:glass-dark rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {audit.status === 'completed' && (
                <CheckCircle className="text-green-500" size={24} />
              )}
              {audit.status === 'failed' && (
                <AlertCircle className="text-red-500" size={24} />
              )}
              {(audit.status === 'pending' || audit.status === 'processing') && (
                <LoadingSpinner size="sm" />
              )}
              <span className="text-lg font-medium text-slate-900 dark:text-white capitalize">
                {audit.status}
              </span>
            </div>
          </div>
          {audit.status === 'completed' && audit.score && (
            <div className="text-right">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {audit.score}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                SEO Score
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Content */}
      {audit.status === 'completed' && audit.results && (
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Detailed Results
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(audit.results, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {audit.status === 'failed' && audit.error && (
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Error Details
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {audit.error}
          </p>
        </div>
      )}

      {(audit.status === 'pending' || audit.status === 'processing') && (
        <div className="glass dark:glass-dark rounded-xl p-6 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Audit in Progress
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Your SEO audit is being processed. This usually takes a few minutes.
          </p>
        </div>
      )}
    </div>
  )
}
