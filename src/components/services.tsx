'use client'

import { useState, useEffect } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Smartphone, Palette, Cloud, Check, ArrowRight, Star, TrendingUp, Shield, Zap } from 'lucide-react'

const iconMap = {
  Globe,
  Smartphone,
  Palette,
  Cloud,
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

interface ServicesProps {
  services: Service[]
}

export function Services({ services }: ServicesProps) {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const enterpriseMetrics = [
    { label: 'Uptime SLA', value: '99.9%', icon: Shield },
    { label: 'Response Time', value: '< 100ms', icon: Zap },
    { label: 'Client Satisfaction', value: '98%', icon: Star },
    { label: 'Growth Rate', value: '+150%', icon: TrendingUp }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [services.length])

  return (
    <section data-component="services" id="services" className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Header */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className={`inline-flex items-center rounded-full border border-[#A53860]/50 bg-[#EF88AD]/10 dark:border-[#A53860]/50 dark:bg-[#3A0519]/20 backdrop-blur-sm px-6 py-3 text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="h-2 w-2 bg-[#A53860] rounded-full mr-3 animate-pulse"></span>
            Enterprise Technology Solutions
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Comprehensive Technology
            </span>
            <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">
              Service Portfolio
            </span>
          </h2>
          <p className={`text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Enterprise-grade software development, cloud infrastructure, and DevOps automation using 
            <span className="font-semibold text-slate-900 dark:text-white"> industry-leading</span> technologies. 
            <span className="font-semibold text-slate-900 dark:text-white"> Scalable</span>, 
            <span className="font-semibold text-slate-900 dark:text-white"> secure</span>, and 
            <span className="font-semibold text-slate-900 dark:text-white"> maintainable</span> solutions for mission-critical applications.
          </p>
        </div>

        {/* Enterprise Metrics Dashboard */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {enterpriseMetrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <div key={index} className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860] group-hover:scale-110 transition-transform duration-300" />
                  <div className="h-2 w-2 rounded-full bg-[#A53860] animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {metric.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Enhanced Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Globe
            const isActive = activeService === index
            
            return (
              <Card 
                key={service.id} 
                className={`group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-[#A53860]/50 dark:hover:border-[#EF88AD]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#A53860]/10 hover:-translate-y-2 cursor-pointer ${isActive ? 'ring-2 ring-[#A53860]/30 shadow-xl' : ''}`}
                onClick={() => setActiveService(index)}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3A0519]/5 via-transparent to-[#EF88AD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
                  <div className={`h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] transition-all duration-1000 ${isActive ? 'w-full' : 'w-0'}`}></div>
                </div>
                
                <div className="relative p-8">
                  {/* Icon with Advanced Styling */}
                  <div className="relative mb-6">
                    <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${isActive ? 'scale-105' : ''}`}>
                      <IconComponent className={`h-10 w-10 text-[#3A0519] dark:text-[#A53860] transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] transition-all duration-300 ${isActive ? 'opacity-100 scale-125' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  </div>

                  {/* Content */}
                  <CardTitle className={`text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-[#3A0519] dark:group-hover:text-[#A53860] transition-colors duration-300 ${isActive ? 'text-[#3A0519] dark:text-[#A53860]' : ''}`}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  
                  {/* Features List with Enhanced Styling */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start group/item">
                        <div className={`h-5 w-5 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-all duration-200 ${isActive ? 'scale-105' : ''}`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full group/btn text-[#3A0519] dark:text-[#A53860] hover:bg-[#3A0519]/10 dark:hover:bg-[#A53860]/10 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Enterprise CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/80 to-[#EF88AD]/10 dark:from-slate-800/80 dark:to-[#3A0519]/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
              Ready for Enterprise-Grade Solutions?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              Let&apos;s discuss your technical requirements and design a comprehensive solution that scales with your business growth.
            </p>
            <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full md:w-auto bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <a href="/contact">Schedule Technical Consultation</a>
              </Button>
              <Button variant="outline" size="lg" className="w-full md:w-auto border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg transition-all duration-300 transform hover:scale-105">
                Download Service Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}