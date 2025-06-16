import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
}

export default function LoadingSpinner({ 
  size = 'md', 
  className, 
  text 
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Loader2 
        className={cn(
          'animate-spin text-blue-600 dark:text-blue-400',
          sizeMap[size]
        )} 
      />
      {text && (
        <p className="text-sm text-slate-600 dark:text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

// Alternative spinner with custom SVG for variety
export function DotSpinner({ 
  className, 
  size = 'md' 
}: { 
  className?: string
  size?: 'sm' | 'md' | 'lg' 
}) {
  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce',
            dotSize[size]
          )}
          style={{
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

// Full page loading overlay
export function LoadingOverlay({ 
  text = 'Loading...',
  backdrop = true 
}: { 
  text?: string
  backdrop?: boolean 
}) {
  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      backdrop && 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
    )}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
          {text}
        </p>
      </div>
    </div>
  )
}

// Inline loading for buttons and small spaces
export function InlineSpinner({ 
  className 
}: { 
  className?: string 
}) {
  return (
    <Loader2 
      className={cn(
        'h-4 w-4 animate-spin text-current',
        className
      )} 
    />
  )
}

// Skeleton loader for content placeholders
export function SkeletonLoader({ 
  className,
  lines = 3 
}: { 
  className?: string
  lines?: number 
}) {
  return (
    <div className={cn('animate-pulse space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 dark:bg-slate-700 rounded"
          style={{
            width: `${Math.random() * 40 + 60}%`
          }}
        />
      ))}
    </div>
  )
}