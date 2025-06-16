
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart3, Zap, Shield, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LandingPage() {
  const { user } = useAuth()

  if (user) {
    return <Link to="/dashboard" />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="relative px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white/80 ring-1 ring-white/20 hover:ring-white/30">
                Trusted by 10,000+ websites worldwide
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Optimize Your Website's
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                SEO Performance
              </span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
              Get comprehensive SEO audits with AI-powered recommendations. 
              Identify issues, track improvements, and boost your search rankings effortlessly.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
                  Start Free Audit
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white/30 hover:bg-white/10 px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything you need for SEO success
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Comprehensive SEO analysis with actionable insights powered by advanced AI
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  name: 'Comprehensive Analysis',
                  description: 'Deep SEO audits covering technical issues, on-page optimization, and performance metrics.'
                },
                {
                  icon: Zap,
                  name: 'AI-Powered Insights',
                  description: 'Get intelligent recommendations and priority fixes based on your specific website needs.'
                },
                {
                  icon: Shield,
                  name: 'Real-time Monitoring',
                  description: 'Track your progress with automated monitoring and instant notifications for critical issues.'
                }
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col glass dark:glass-dark rounded-2xl p-8">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900 dark:text-white">
                    <feature.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Ready to boost your SEO?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Join thousands of websites already using our platform to improve their search rankings.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
