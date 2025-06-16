
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import AuditForm from '@/components/audit/AuditForm'
import RecentAudits from '@/components/audit/RecentAudits'
import UsageStats from '@/components/dashboard/UsageStats'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Dashboard() {
  const { user } = useAuth()
  
  const { data: audits = [], isLoading } = useQuery({
    queryKey: ['audits'],
    queryFn: apiClient.getAudits,
  })

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: apiClient.getUserProfile,
  })

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Start a new SEO audit or review your recent results
          </p>
        </div>

        {/* Usage Stats */}
        <UsageStats plan={profile?.plan || 'free'} />

        {/* Audit Form */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Start New SEO Audit
          </h2>
          <AuditForm />
        </div>

        {/* Recent Audits */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Recent Audits
          </h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <RecentAudits audits={audits} />
          )}
        </div>
      </div>
    </Layout>
  )
}
