
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import RecentAudits from '@/components/audit/RecentAudits'

export default function AuditHistory() {
  const { data: audits = [], isLoading } = useQuery({
    queryKey: ['audits'],
    queryFn: apiClient.getAudits,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Audit History
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          View all your previous SEO audits and their results
        </p>
      </div>

      <div className="glass dark:glass-dark rounded-xl p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <RecentAudits audits={audits} />
        )}
      </div>
    </div>
  )
}
