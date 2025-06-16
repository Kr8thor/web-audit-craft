import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        // Variants
        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
        'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'text-primary underline-offset-4 hover:underline': variant === 'link',
      },
      {
        // Sizes
        'h-10 px-4 py-2': size === 'default',
        'h-9 rounded-md px-3': size === 'sm',
        'h-11 rounded-md px-8': size === 'lg',
        'h-10 w-10': size === 'icon',
      },
      className
    )

    // Modern glassmorphism variants
    const modernVariants = cn({
      'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600': variant === 'default',
      'bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600': variant === 'destructive',
      'border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800': variant === 'outline',
      'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600': variant === 'secondary',
      'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300': variant === 'ghost',
      'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300': variant === 'link',
    })

    return (
      <button
        className={cn(baseClasses, modernVariants)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button