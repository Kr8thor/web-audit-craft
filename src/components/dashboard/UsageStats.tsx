
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart3, Zap, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

interface UsageStatsProps {
  userProfile?: any
  userPlan: 'free' | 'pro' | 'agency'
}

export default function UsageStats({ userProfile, userPlan }: UsageStatsProps) {
  const planLimits = {
    free: { audits: 5, used: 2 },
    pro: { audits: 100, used: 23 },
    agency: { audits: 1000, used: 156 },
  }

  const currentPlan = planLimits[userPlan as keyof typeof planLimits]
  const usagePercentage = (currentPlan.used / currentPlan.audits) * 100

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="text-blue-600 dark:text-blue-400" size={20} />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Usage Statistics
          </h2>
        </div>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium capitalize">
          {userPlan} Plan
        </span>
      </div>

      <div className="space-y-6">
        {/* Audits Usage */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Monthly Audits
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {currentPlan.used} / {currentPlan.audits}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Clock className="mx-auto text-green-600 dark:text-green-400 mb-2" size={20} />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentPlan.used}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              This Month
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <Zap className="mx-auto text-yellow-600 dark:text-yellow-400 mb-2" size={20} />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentPlan.audits - currentPlan.used}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Remaining
            </p>
          </div>
        </div>

        {/* Upgrade CTA for free users */}
        {userPlan === 'free' && usagePercentage > 60 && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              You're using {Math.round(usagePercentage)}% of your monthly limit. Upgrade for unlimited audits!
            </p>
            <Button size="sm" className="w-full">
              Upgrade Plan
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
