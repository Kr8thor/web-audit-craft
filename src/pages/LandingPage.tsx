
import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-blue-600" size={32} />
            <span className="font-bold text-2xl text-slate-900 dark:text-white">SEO Audit</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Boost Your Website's SEO Performance
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Get comprehensive SEO audits powered by AI. Identify issues, improve rankings, 
            and drive more organic traffic to your website.
          </p>
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Free Audit
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="glass dark:glass-dark rounded-xl p-8 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Comprehensive Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Deep technical SEO analysis covering all critical ranking factors
            </p>
          </div>
          
          <div className="glass dark:glass-dark rounded-xl p-8 text-center">
            <Star className="text-yellow-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              AI-Powered Insights
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get intelligent recommendations powered by advanced AI technology
            </p>
          </div>
          
          <div className="glass dark:glass-dark rounded-xl p-8 text-center">
            <BarChart3 className="text-blue-500 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Actionable Reports
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Clear, actionable insights to improve your search rankings
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
