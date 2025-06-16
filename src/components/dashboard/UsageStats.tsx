
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart, Activity, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'

interface UsageStatsProps {
  userProfile: any
  userPlan: string
}

export default function UsageStats({ userProfile, userPlan }: UsageStatsProps) {
  const { user } = useAuth()

  const planLimits = {
    free: { audits: 5, name: 'Free' },
    pro: { audits: 50, name: 'Pro' },
    agency: { audits: 500, name: 'Agency' }
  }

  const currentPlan = planLimits[userPlan as keyof typeof planLimits] || planLimits.free
  const usedAudits = userProfile?.audits_used || 0

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Usage Statistics
        </h3>
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <Zap size={16} />
          <span>{currentPlan.name} Plan</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Audits this month
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {usedAudits} / {currentPlan.audits}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{
                width: `${Math.min((usedAudits / currentPlan.audits) * 100, 100)}%`
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          {usedAudits >= currentPlan.audits && (
            <Button size="sm" className="flex items-center space-x-2">
              <Activity size={16} />
              <span>Upgrade Plan</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
