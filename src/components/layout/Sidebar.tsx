
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarChart3, History, Settings, Home } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/history', icon: History, label: 'History' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <BarChart3 className="text-blue-600" size={24} />
          <span className="font-bold text-xl text-slate-900 dark:text-white">SEO Audit</span>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
