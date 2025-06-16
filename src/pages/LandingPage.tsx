
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { ArrowRight, CheckCircle, BarChart3, Search, Globe } from 'lucide-react'

export default function LandingPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 dark:text-white">
              SEO Audit
            </span>
          </div>
          <Link to="/auth">
            <Button variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Optimize Your Website's{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SEO Performance
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Get comprehensive SEO audits, actionable insights, and AI-powered recommendations 
            to boost your website's search engine rankings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="flex items-center space-x-2">
                <span>Start Free Audit</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Everything you need to improve your SEO
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Technical Analysis
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Deep technical SEO analysis including site speed, mobile-friendliness, and crawlability.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Performance Metrics
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Track your SEO score improvements and monitor key performance indicators.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                AI Recommendations
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Get personalized, AI-powered recommendations to fix SEO issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
