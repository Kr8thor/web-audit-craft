
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Globe, Plus, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import AuditForm from '@/components/audit/AuditForm'
import RecentAudits from '@/components/audit/RecentAudits'
import UsageStats from '@/components/dashboard/UsageStats'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { userPlan } = useAuth()
  const [showAuditForm, setShowAuditForm] = useState(false)

  const { data: userProfile, isLoading: loadingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: apiClient.getUserProfile,
  })

  const { data: audits = [], isLoading: loadingAudits, refetch: refetchAudits } = useQuery({
    queryKey: ['audits'],
    queryFn: apiClient.getAudits,
  })

  const handleAuditCreated = () => {
    setShowAuditForm(false)
    refetchAudits()
    toast.success('Audit started! You can track its progress below.')
  }

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const recentAudits = audits.slice(0, 5)
  const totalAudits = audits.length
  const completedAudits = audits.filter((audit: any) => audit.status === 'completed').length
  const averageScore = completedAudits > 0 
    ? Math.round(audits.filter((audit: any) => audit.status === 'completed').reduce((sum: number, audit: any) => sum + (audit.score || 0), 0) / completedAudits)
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Monitor your website's SEO performance and track improvements
          </p>
        </div>
        <Button
          onClick={() => setShowAuditForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>New Audit</span>
        </Button>
      </div>

      {/* Usage Stats */}
      <UsageStats userProfile={userProfile} userPlan={userPlan} />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Globe className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Audits</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalAudits}</p>
            </div>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedAudits}</p>
            </div>
          </div>
        </div>

        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Score</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{averageScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Audits */}
      <div className="glass dark:glass-dark rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recent Audits
          </h2>
          {totalAudits > 5 && (
            <Button variant="outline" size="sm">
              View All
            </Button>
          )}
        </div>
        
        {loadingAudits ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <RecentAudits audits={recentAudits} />
        )}
      </div>

      {/* Audit Form Modal */}
      {showAuditForm && (
        <AuditForm
          onClose={() => setShowAuditForm(false)}
          onAuditCreated={handleAuditCreated}
        />
      )}
    </div>
  )
}
