'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Filter, TrendingUp, Users, Award, Star, ArrowRight, Eye, Calendar, Code2 } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  technologies: string[]
  live_url?: string
  github_url?: string
}

interface PortfolioProps {
  projects: Project[]
}

export function Portfolio({ projects }: PortfolioProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  // Selected project reserved for future modal detail; keeping state minimal for now

  const filters = [
    { id: 'all', label: 'All Projects', icon: Filter },
    { id: 'web', label: 'Web Applications', icon: Code2 },
    { id: 'mobile', label: 'Mobile Apps', icon: ExternalLink },
    { id: 'enterprise', label: 'Enterprise', icon: Award }
  ]

  const portfolioStats = [
    { label: 'Projects Delivered', value: '50+', icon: TrendingUp },
    { label: 'Client Satisfaction', value: '98%', icon: Star },
    { label: 'Team Members', value: '12+', icon: Users },
    { label: 'Years Experience', value: '5+', icon: Award }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    return project.technologies.some(tech => 
      tech.toLowerCase().includes(activeFilter)
    )
  })

  return (
    <section data-component="portfolio" id="portfolio" className="py-24 bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enterprise Portfolio Header */}
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className={`inline-flex items-center rounded-full border border-[#A53860]/50 bg-[#EF88AD]/10 dark:border-[#A53860]/50 dark:bg-[#3A0519]/20 backdrop-blur-sm px-6 py-3 text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="h-2 w-2 bg-[#A53860] rounded-full mr-3 animate-pulse"></span>
            Enterprise Portfolio
          </div>
          <h2 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Enterprise Case Studies
            </span>
            <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">
              & Success Stories
            </span>
          </h2>
          <p className={`text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Mission-critical applications built with enterprise-grade technologies that drive 
            <span className="font-semibold text-slate-900 dark:text-white"> business growth</span>, 
            <span className="font-semibold text-slate-900 dark:text-white"> operational efficiency</span>, and 
            <span className="font-semibold text-slate-900 dark:text-white"> digital transformation</span>.
          </p>
        </div>

        {/* Portfolio Stats Dashboard */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {portfolioStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="group p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
                <div className="flex items-center justify-center mb-3">
                  <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Enterprise Filter System */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {filters.map((filter) => {
            const IconComponent = filter.icon
            const isActive = activeFilter === filter.id
            return (
              <Button
                key={filter.id}
                variant={isActive ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white shadow-lg' 
                    : 'border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519]'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{filter.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Enhanced Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`group relative overflow-hidden bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-[#A53860]/50 dark:hover:border-[#EF88AD]/50 hover:shadow-2xl hover:shadow-[#A53860]/10 hover:-translate-y-2 cursor-pointer transition-all duration-1000 delay-${1000 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3A0519]/5 via-transparent to-[#EF88AD]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Project Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white text-xs font-semibold backdrop-blur-sm">
                  Enterprise
                </div>
              </div>

              {/* View Details Button */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-colors duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#EF88AD] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.live_url && (
                      <Button asChild size="sm" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button asChild size="sm" variant="outline" className="bg-transparent hover:bg-white/10 border-white/30 text-white hover:text-white">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                {/* Project Metrics */}
                <div className="flex items-center justify-between mb-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>2024</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-[#A53860] text-[#A53860]" />
                    <span>4.9/5</span>
                  </div>
                </div>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#EF88AD]/20 to-[#3A0519]/20 dark:from-[#EF88AD]/10 dark:to-[#3A0519]/30 text-[#3A0519] dark:text-[#A53860] rounded-full border border-[#A53860]/30 dark:border-[#A53860]/50 group-hover:scale-105 transition-transform duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Card>
          ))}
        </div>

        {/* Enterprise CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/80 to-[#EF88AD]/10 dark:from-slate-800/80 dark:to-[#3A0519]/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
              Ready for Your Enterprise Project?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
              Let&apos;s discuss your enterprise requirements and design a comprehensive solution that drives business growth and operational efficiency.
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <a href="/contact">Schedule Enterprise Consultation</a>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300 transform hover:scale-105">
                <ArrowRight className="mr-2 h-5 w-5" />
                View All Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
