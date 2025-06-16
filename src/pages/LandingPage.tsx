
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { CheckCircle, BarChart3, Zap, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  const { user } = useAuth()

  const features = [
    {
      icon: BarChart3,
      title: 'Comprehensive Analysis',
      description: 'Get detailed insights into your website\'s SEO performance'
    },
    {
      icon: Zap,
      title: 'Fast Results',
      description: 'Receive audit results in minutes, not hours'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your data is protected with enterprise-grade security'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-blue-600" size={32} />
            <span className="font-bold text-2xl text-slate-900 dark:text-white">SEO Audit</span>
          </div>
          <div className="space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Optimize Your Website's
              <span className="text-blue-600"> SEO Performance</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              Get comprehensive SEO audits with actionable insights to improve your search rankings
              and drive more organic traffic to your website.
            </p>
            {!user && (
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Free Audit
                </Button>
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="glass dark:glass-dark rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="glass dark:glass-dark rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to boost your SEO?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Join thousands of websites already improving their search rankings
            </p>
            {!user && (
              <Link to="/auth">
                <Button size="lg">
                  Get Started Today
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
