
import React from 'react'
import { Link } from 'react-router-dom'
import { Clock, ExternalLink } from 'lucide-react'
import { formatDate, getScoreColor, getScoreBgColor } from '@/lib/utils'

interface Audit {
  id: string
  url: string
  status: 'pending' | 'completed' | 'failed'
  score?: number
  created_at: string
  completed_at?: string
}

interface RecentAuditsProps {
  audits: Audit[]
}

export default function RecentAudits({ audits }: RecentAuditsProps) {
  console.log('RecentAudits rendering with:', audits.length, 'audits')

  if (audits.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="mx-auto text-slate-400 dark:text-slate-500 mb-4" size={48} />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
          No audits yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Start your first SEO audit to see results here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        Recent Audits
      </h3>
      
      <div className="space-y-3">
        {audits.map((audit) => (
          <div
            key={audit.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <ExternalLink size={16} className="text-slate-400 dark:text-slate-500" />
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {audit.url}
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {formatDate(audit.created_at)}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {audit.status === 'completed' && audit.score !== undefined ? (
                <div className={`px-2 py-1 rounded text-xs font-medium ${getScoreBgColor(audit.score)} ${getScoreColor(audit.score)}`}>
                  {audit.score}/100
                </div>
              ) : (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  audit.status === 'pending' 
                    ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {audit.status}
                </span>
              )}
              
              {audit.status === 'completed' && (
                <Link
                  to={`/audit/${audit.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                >
                  View Results
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
