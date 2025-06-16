
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, User, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Header() {
  const { user, signOut, userPlan } = useAuth()
  const { effectiveTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SEO Audit Pro
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {user?.email}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                userPlan === 'agency' 
                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  : userPlan === 'pro'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}>
                {userPlan.toUpperCase()}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {effectiveTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="p-2 text-slate-600 hover:text-red-600"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
