
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate, getScoreColor } from '@/lib/utils'
import { ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Audit {
  id: string
  url: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  score?: number
  created_at: string
}

interface RecentAuditsProps {
  audits: Audit[]
}

export default function RecentAudits({ audits }: RecentAuditsProps) {
  if (audits.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <ExternalLink className="text-slate-400" size={24} />
        </div>
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
    <div className="space-y-3">
      {audits.map((audit) => (
        <div key={audit.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {audit.status === 'completed' && (
                <CheckCircle className="text-green-500" size={20} />
              )}
              {audit.status === 'failed' && (
                <AlertCircle className="text-red-500" size={20} />
              )}
              {(audit.status === 'pending' || audit.status === 'processing') && (
                <Clock className="text-blue-500" size={20} />
              )}
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {audit.url}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {formatDate(audit.created_at)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {audit.status === 'completed' && audit.score && (
              <span className={`font-bold ${getScoreColor(audit.score)}`}>
                {audit.score}
              </span>
            )}
            <Link
              to={`/audit/${audit.id}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
