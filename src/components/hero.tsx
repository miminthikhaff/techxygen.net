'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, TrendingUp, Users, Zap, Shield, Globe, Code, Database, Cloud } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const stats = [
    { value: '50+', label: 'Projects Delivered', icon: TrendingUp },
    { value: '3x', label: 'Average Growth', icon: Users },
    { value: '24/7', label: 'Support', icon: Zap },
    { value: '99.9%', label: 'Uptime SLA', icon: Shield }
  ]

  const techStack = [
    { name: 'React', icon: Code },
    { name: 'Node.js', icon: Database },
    { name: 'AWS', icon: Cloud },
    { name: 'Docker', icon: Globe }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section data-component="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30">
      {/* Enterprise Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Geometric Shapes */}
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-[#3A0519]/20 to-[#A53860]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-[#670D2F]/20 to-[#EF88AD]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#3A0519]/5 to-[#EF88AD]/5 rounded-full blur-3xl"></div>
        
        {/* Enterprise Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float">
          <Code className="h-6 w-6 text-[#3A0519]/60" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-1000">
          <Database className="h-6 w-6 text-[#A53860]/60" />
        </div>
        <div className="absolute bottom-32 left-32 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-2000">
          <Cloud className="h-6 w-6 text-[#670D2F]/60" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left">

              {/* Enhanced Typography */}
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                  Enterprise-Grade
                </span>
                <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">
                  Software Solutions
                </span>
              </h1>

              {/* Enhanced Subtitle */}
              <p className={`text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed font-light transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Full-stack development, cloud infrastructure, and DevOps automation using 
                <span className="font-semibold text-slate-900 dark:text-white"> industry-standard</span> technologies. 
                <span className="font-semibold text-slate-900 dark:text-white"> Scalable</span>, 
                <span className="font-semibold text-slate-900 dark:text-white"> secure</span>, and 
                <span className="font-semibold text-slate-900 dark:text-white"> maintainable</span> solutions for enterprise clients.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button asChild size="lg" className="text-lg px-10 py-6 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <Link href="/contact">
                    Request Technical Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-full border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] transition-all duration-300 transform hover:scale-105 group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  View Case Studies
                </Button>
              </div>

              {/* Tech Stack Indicators */}
              <div className={`flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {techStack.map((tech) => {
                  const IconComponent = tech.icon
                  return (
                    <div key={tech.name} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
                      <IconComponent className="h-4 w-4 text-[#3A0519] dark:text-[#A53860]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Enterprise Stats Dashboard */}
            <div className="lg:col-span-5">
              <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  const isActive = currentStat === index
                  return (
                    <div 
                      key={index}
                      className={`group p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer ${isActive ? 'ring-2 ring-[#A53860]/50 shadow-lg' : ''}`}
                      onClick={() => setCurrentStat(index)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <IconComponent className={`h-6 w-6 transition-colors duration-300 ${isActive ? 'text-[#3A0519] dark:text-[#A53860]' : 'text-slate-400'}`} />
                        <div className={`h-2 w-2 rounded-full transition-all duration-300 ${isActive ? 'bg-[#A53860] scale-125' : 'bg-slate-300'}`}></div>
                      </div>
                      <div className={`text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-2 transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Enterprise Trust Indicators */}
              <div className={`mt-8 p-6 rounded-2xl bg-gradient-to-br from-white/60 to-[#EF88AD]/10 dark:from-slate-800/60 dark:to-[#3A0519]/20 backdrop-blur-sm border border-white/20 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Enterprise Standards</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">SOC 2 Type II</span>
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">ISO 27001</span>
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#670D2F] to-[#EF88AD] rounded-full animate-pulse delay-500"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">GDPR Compliant</span>
                    <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#A53860] to-[#EF88AD] rounded-full animate-pulse delay-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
