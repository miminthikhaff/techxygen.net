'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  LoadingSpinner, 
  PulseLoader, 
  CardSkeleton, 
  TeamMemberSkeleton, 
  ProjectSkeleton,
  ProgressBar,
  LoadingOverlay,
  InlineLoading
} from '@/components/ui/loading'
import { 
  FormSubmissionLoading, 
  ButtonLoading, 
  InputLoading 
} from '@/components/ui/form-loading'
import { 
  NavigationLoading, 
  PageTransitionLoading, 
  RouteLoadingIndicator 
} from '@/components/ui/navigation-loading'
import { Play, RefreshCw, Zap, Code, Database, Cloud, Shield, Send } from 'lucide-react'

export default function LoadingDemoPage() {
  const [showPageLoading, setShowPageLoading] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const [showFormLoading, setShowFormLoading] = useState(false)
  const [showNavigationLoading, setShowNavigationLoading] = useState(false)
  const [showPageTransition, setShowPageTransition] = useState(false)
  const [showRouteLoading, setShowRouteLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const demoComponents = [
    {
      title: 'Loading Spinners',
      description: 'Various sizes and styles of loading spinners',
      component: (
        <div className="flex items-center space-x-6">
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="default" />
          <LoadingSpinner size="lg" />
          <LoadingSpinner size="xl" />
        </div>
      )
    },
    {
      title: 'Pulse Loader',
      description: 'Modern pulse animation with brand colors',
      component: <PulseLoader />
    },
    {
      title: 'Progress Bar',
      description: 'Animated progress bar with smooth transitions',
      component: (
        <div className="w-full">
          <ProgressBar progress={progress} />
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 text-center">
            {progress}% Complete
          </p>
        </div>
      )
    },
    {
      title: 'Card Skeleton',
      description: 'Skeleton loader for service cards',
      component: <CardSkeleton />
    },
    {
      title: 'Team Member Skeleton',
      description: 'Skeleton loader for team member cards',
      component: <TeamMemberSkeleton />
    },
    {
      title: 'Project Skeleton',
      description: 'Skeleton loader for project cards',
      component: <ProjectSkeleton />
    },
    {
      title: 'Inline Loading',
      description: 'Inline loading state with message',
      component: <InlineLoading message="Loading content..." />
    },
    {
      title: 'Button Loading',
      description: 'Button with integrated loading state',
      component: (
        <ButtonLoading
          isLoading={isSubmitting}
          loadingText="Processing..."
          className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6"
        >
          <Play className="mr-2 h-4 w-4" />
          Start Process
        </ButtonLoading>
      )
    }
  ]

  const interactiveDemos = [
    {
      title: 'Page Loading Overlay',
      description: 'Full-page loading overlay with progress',
      action: () => {
        setShowPageLoading(true)
        setTimeout(() => setShowPageLoading(false), 3000)
      },
      icon: Zap
    },
    {
      title: 'Modal Loading Overlay',
      description: 'Modal-style loading overlay',
      action: () => {
        setShowOverlay(true)
        setTimeout(() => setShowOverlay(false), 2000)
      },
      icon: Code
    },
    {
      title: 'Form Submission Loading',
      description: 'Form submission with loading state',
      action: () => {
        setShowFormLoading(true)
        setTimeout(() => setShowFormLoading(false), 2500)
      },
      icon: Database
    },
    {
      title: 'Navigation Loading',
      description: 'Navigation bar loading state',
      action: () => {
        setShowNavigationLoading(true)
        setTimeout(() => setShowNavigationLoading(false), 2000)
      },
      icon: Cloud
    },
    {
      title: 'Page Transition',
      description: 'Page transition loading',
      action: () => {
        setShowPageTransition(true)
        setTimeout(() => setShowPageTransition(false), 2000)
      },
      icon: Shield
    },
    {
      title: 'Route Loading',
      description: 'Route change loading indicator',
      action: () => {
        setShowRouteLoading(true)
        setTimeout(() => setShowRouteLoading(false), 1500)
      },
      icon: RefreshCw
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 2))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleFormSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
      {/* Loading Overlays */}
      {showPageLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 z-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-[#3A0519] to-[#A53860] flex items-center justify-center mb-4">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-4">
                  Loading Demo
                </h1>
                <ProgressBar progress={progress} />
                <p className="text-slate-600 dark:text-slate-300 mt-4">
                  Demonstrating page loading experience...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoadingOverlay isVisible={showOverlay} message="Processing your request..." />
      <FormSubmissionLoading isSubmitting={showFormLoading} message="Submitting form data..." />
      <NavigationLoading isLoading={showNavigationLoading} />
      <PageTransitionLoading isLoading={showPageTransition} message="Transitioning to new page..." />
      <RouteLoadingIndicator isLoading={showRouteLoading} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-[#A53860]/50 bg-[#EF88AD]/10 dark:border-[#A53860]/50 dark:bg-[#3A0519]/20 backdrop-blur-sm px-6 py-3 text-sm font-medium mb-8">
              <span className="h-2 w-2 bg-[#A53860] rounded-full mr-3 animate-pulse"></span>
              Loading Components Showcase
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Enterprise Loading System
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Comprehensive loading components built with modern UI/UX principles using only Tailwind CSS. 
              Designed for enterprise applications with smooth animations and professional aesthetics.
            </p>
          </div>

          {/* Interactive Demos */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                Interactive Loading Demos
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interactiveDemos.map((demo, index) => {
                const IconComponent = demo.icon
                return (
                  <Card 
                    key={index}
                    className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-[#A53860]/50 dark:hover:border-[#EF88AD]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A53860]/10 hover:-translate-y-2"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-5 w-5 text-[#3A0519] dark:text-[#A53860]" />
                        </div>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                          {demo.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-slate-600 dark:text-slate-300">
                        {demo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        onClick={demo.action}
                        className="w-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Try Demo
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Component Showcase */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                Loading Components
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demoComponents.map((demo, index) => (
                <Card 
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {demo.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300">
                      {demo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                      {demo.component}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Form Demo */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  <span className="bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                    Form Loading Demo
                  </span>
                </CardTitle>
                <CardDescription className="text-center text-slate-600 dark:text-slate-300">
                  Experience form submission with integrated loading states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <InputLoading isLoading={isSubmitting}>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                        required
                      />
                    </InputLoading>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                    <textarea
                      placeholder="Your message here..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  
                  <ButtonLoading
                    isLoading={isSubmitting}
                    loadingText="Sending..."
                    className="w-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full h-12"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </ButtonLoading>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
