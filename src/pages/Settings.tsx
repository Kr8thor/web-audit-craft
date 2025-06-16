
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import Button from '@/components/ui/Button'
import { Moon, Sun, User, Shield } from 'lucide-react'

export default function Settings() {
  const { user, userPlan } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Account Information */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Account Information
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <p className="text-slate-900 dark:text-white">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Plan
              </label>
              <p className="text-slate-900 dark:text-white capitalize">{userPlan}</p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-purple-600 dark:text-purple-400" size={20} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Appearance
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">Theme</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Switch between light and dark mode
              </p>
            </div>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
