
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Moon, Sun, LogOut, User } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Header() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              SEO Audit Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-600 dark:text-slate-400"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-sm">
                <User size={16} className="text-slate-500 dark:text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {user?.email}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
              >
                <LogOut size={16} />
                <span className="ml-1">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
