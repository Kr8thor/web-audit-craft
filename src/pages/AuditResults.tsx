
import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AuditResults() {
  const { id } = useParams()

  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Loading audit results for ID: {id}
        </p>
      </div>
    </div>
  )
}
