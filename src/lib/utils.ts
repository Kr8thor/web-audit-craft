
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function getScoreColor(score: number) {
  if (score >= 90) return 'text-green-600 dark:text-green-400'
  if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

export function getScoreBgColor(score: number) {
  if (score >= 90) return 'bg-green-100 dark:bg-green-900/20'
  if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/20'
  return 'bg-red-100 dark:bg-red-900/20'
}
