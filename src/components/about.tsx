'use client'

import { useState, useEffect } from 'react'
//
import { Button } from '@/components/ui/button'
import { Award, Users, TrendingUp, Star, Code, Database, Cloud, Shield, CheckCircle } from 'lucide-react'
//

export function About() {
  const [isVisible, setIsVisible] = useState(false)

  const enterpriseStats = [
    { label: 'Years Experience', value: '5+', icon: Award },
    { label: 'Team Members', value: '12+', icon: Users },
    { label: 'Projects Delivered', value: '50+', icon: TrendingUp },
    { label: 'Client Satisfaction', value: '98%', icon: Star }
  ]

  const certifications = [
    { name: 'AWS Certified', icon: Cloud },
    { name: 'Microsoft Azure', icon: Database },
    { name: 'Google Cloud', icon: Code },
    { name: 'Security Certified', icon: Shield }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section data-component="about" id="about" className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise About Header */}
        <div className="max-w-6xl mx-auto text-center mb-20">
          <div className={`inline-flex items-center rounded-full border border-[#A53860]/50 bg-[#EF88AD]/10 dark:border-[#A53860]/50 dark:bg-[#3A0519]/20 backdrop-blur-sm px-6 py-3 text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="h-2 w-2 bg-[#A53860] rounded-full mr-3 animate-pulse"></span>
            Enterprise Software Development Team
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Expert Engineering Team
            </span>
            <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">
              Delivering Excellence
            </span>
          </h2>
          <p className={`text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-5xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Founded in 2020 by senior software engineers in Colombo, TechXygen has evolved into a premier enterprise software development company. 
            Our team combines <span className="font-semibold text-slate-900 dark:text-white">deep technical expertise</span> with 
            <span className="font-semibold text-slate-900 dark:text-white"> industry best practices</span> to deliver 
            <span className="font-semibold text-slate-900 dark:text-white"> mission-critical solutions</span> for global enterprises.
          </p>
          <p className={`text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            We specialize in full-stack development, cloud architecture, DevOps automation, and enterprise integration. 
            Our certified professionals have delivered solutions for Fortune 500 companies, startups, and government organizations worldwide.
          </p>
        </div>

        {/* Enterprise Stats Dashboard */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {enterpriseStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860] group-hover:scale-110 transition-transform duration-300" />
                  <div className="h-2 w-2 rounded-full bg-[#A53860] animate-pulse"></div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Enterprise Team Section - removed per request */}

        {/* Enterprise Certifications */}
        <div className={`mb-20 transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                Industry Certifications
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Our team holds industry-leading certifications ensuring enterprise-grade expertise
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon
              return (
                <div key={index} className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-[#3A0519] dark:text-[#A53860]" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{cert.name}</h4>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enterprise Values Section */}
        <div className={`mb-20 transition-all duration-1000 delay-1600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                Enterprise Excellence Principles
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Core values that drive our commitment to delivering enterprise-grade solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-8 w-8 text-[#3A0519] dark:text-[#A53860]" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Quality Assurance</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Rigorous testing, code reviews, and quality gates ensure enterprise-grade reliability and performance in every deliverable.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#670D2F]/10 to-[#EF88AD]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-[#670D2F] dark:text-[#EF88AD]" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Security First</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Enterprise-grade security practices, compliance standards, and data protection protocols built into every solution.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
              <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#A53860]/10 to-[#EF88AD]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-[#A53860] dark:text-[#EF88AD]" />
              </div>
              <h4 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Scalable Architecture</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Future-proof solutions designed to scale with your business growth and adapt to evolving enterprise requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/80 to-[#EF88AD]/10 dark:from-slate-800/80 dark:to-[#3A0519]/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
              Ready to Partner with Enterprise Experts?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              Let&apos;s discuss your enterprise requirements and design a comprehensive technology strategy that drives business growth.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <a href="/contact">Schedule Enterprise Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
