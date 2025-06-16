
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/Button'
import { User, Moon, Sun, Shield } from 'lucide-react'

export default function Settings() {
  const { user, userPlan } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const planFeatures = {
    free: ['5 audits per day', 'Basic SEO analysis', 'Email support'],
    pro: ['100 audits per day', 'Advanced AI recommendations', 'Priority support', 'Custom reports'],
    agency: ['1000 audits per day', 'White-label reports', 'API access', 'Dedicated support']
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your account preferences and subscription
          </p>
        </div>

        {/* Account Information */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <User className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Account Information
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <p className="text-slate-900 dark:text-white">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Current Plan
              </label>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 capitalize">
                  {userPlan}
                </span>
                {userPlan === 'free' && (
                  <Button size="sm" variant="outline">
                    Upgrade to Pro
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="text-green-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Plan Features
            </h2>
          </div>
          
          <ul className="space-y-2">
            {planFeatures[userPlan].map((feature, index) => (
              <li key={index} className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preferences */}
        <div className="glass dark:glass-dark rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Preferences
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Theme</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Choose your preferred theme
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
