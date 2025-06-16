
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Zap, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'

interface UsageStatsProps {
  userProfile: any
  userPlan: string
}

export default function UsageStats({ userProfile, userPlan }: UsageStatsProps) {
  const planLimits = {
    free: 5,
    pro: 100,
    agency: 1000
  }

  const used = userProfile?.usage?.today || 0
  const limit = planLimits[userPlan as keyof typeof planLimits] || 5
  const percentage = Math.min((used / limit) * 100, 100)

  return (
    <div className="glass dark:glass-dark rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Daily Usage
        </h3>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          userPlan === 'agency' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
            : userPlan === 'pro'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }`}>
          {userPlan.toUpperCase()} PLAN
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Audits used today
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {used} / {limit}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                percentage >= 90 
                  ? 'bg-red-500' 
                  : percentage >= 70 
                  ? 'bg-yellow-500' 
                  : 'bg-blue-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {userPlan === 'free' && percentage >= 80 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Zap className="text-blue-600 dark:text-blue-400 mt-0.5" size={18} />
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                  Upgrade to Pro
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Get 100 daily audits and advanced features
                </p>
                <Button size="sm" className="text-xs">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
