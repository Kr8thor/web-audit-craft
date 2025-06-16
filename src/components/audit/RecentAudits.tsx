
import React from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { formatRelativeTime, getScoreColor } from '@/lib/utils'

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
          <Clock className="text-slate-400" size={24} />
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={18} />
      case 'failed':
        return <AlertCircle className="text-red-500" size={18} />
      case 'processing':
      case 'pending':
        return <Loader className="text-blue-500 animate-spin" size={18} />
      default:
        return <Clock className="text-slate-400" size={18} />
    }
  }

  return (
    <div className="space-y-3">
      {audits.map((audit) => (
        <div key={audit.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {getStatusIcon(audit.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {audit.url}
                </p>
                <a
                  href={audit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {formatRelativeTime(audit.created_at)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {audit.status === 'completed' && audit.score && (
              <div className={`text-sm font-medium ${getScoreColor(audit.score)}`}>
                {audit.score}
              </div>
            )}
            
            <Link
              to={`/audit/${audit.id}`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
