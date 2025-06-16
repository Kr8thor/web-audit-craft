
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, History, Settings, Zap } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Audit History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 pt-20">
      <nav className="px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Zap size={20} />
            <span className="font-medium">Upgrade to Pro</span>
          </div>
          <p className="text-sm text-blue-100 mb-3">
            Get unlimited audits and advanced features
          </p>
          <button className="w-full bg-white/20 hover:bg-white/30 rounded px-3 py-2 text-sm font-medium transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
