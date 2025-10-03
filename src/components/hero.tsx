'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Globe, Code, Database, Cloud } from 'lucide-react'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/page-container'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'

export function Hero() {
  const prefersReduced = useReducedMotion()
  const tiltXRaw = useMotionValue(0)
  const tiltYRaw = useMotionValue(0)
  const tiltX = useSpring(tiltXRaw, { stiffness: 140, damping: 18, mass: 0.2 })
  const tiltY = useSpring(tiltYRaw, { stiffness: 140, damping: 18, mass: 0.2 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // Map to degrees
    tiltYRaw.set((px - 0.5) * 16)
    tiltXRaw.set((0.5 - py) * 10)
  }

  const handleMouseLeave = () => {
    tiltXRaw.set(0)
    tiltYRaw.set(0)
  }

  const techStack = [
    { name: 'React', icon: Code },
    { name: 'Node.js', icon: Database },
    { name: 'AWS', icon: Cloud },
    { name: 'Docker', icon: Globe }
  ]

  

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
        {/* Removed global hexagon overlay to keep visuals within container */}
      </div>

      <PageContainer className="py-24 lg:py-32">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Main Content */}
            <div className="lg:col-span-7 text-center lg:text-left">

              {/* Enhanced Typography */}
               <motion.h1
                 initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
                 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight"
               >
                 <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">We build reliable</span>
                 <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">software and AI solutions.</span>
               </motion.h1>

              {/* Enhanced Subtitle */}
               <motion.p
                 initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.15, duration: 0.6 }}
                 className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed font-light"
               >
                 We collaborate with enterprises, startups, and public sector teams to plan, build, and evolve modern products — cloud-ready, secure, and grounded in measurable outcomes.
               </motion.p>

              {/* Enhanced CTA Buttons */}
               <motion.div
                 initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3, duration: 0.6 }}
                 className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-16"
               >
                 <Button asChild size="lg" className="text-lg px-10 py-6 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <Link href="/contact">
                    Book a free consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-full border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] transition-all duration-300 transform hover:scale-105 group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  See recent work
                </Button>
               </motion.div>

              {/* Tech Stack Indicators */}
               <motion.div
                 initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.45, duration: 0.6 }}
                 className="flex flex-wrap gap-4 justify-center lg:justify-start"
               >
                 {techStack.map((tech) => {
                  const IconComponent = tech.icon
                  return (
                    <div key={tech.name} className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20">
                      <IconComponent className="h-4 w-4 text-[#3A0519] dark:text-[#A53860]" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                    </div>
                  )
                })}
               </motion.div>
            </div>

            {/* Right-side visual only on large screens (Framer Motion parallax stack) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div
                className="relative h-[520px] rounded-3xl overflow-hidden border border-white/20 dark:border-slate-800 bg-gradient-to-br from-white to-[#EF88AD14] dark:from-slate-900 dark:to-[#3A051920]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Animated glow blobs */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="pointer-events-none absolute -top-16 -right-20 h-52 w-52 rounded-full bg-[#EF88AD33] blur-3xl"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#3A051933] blur-3xl"
                />

                {/* Parallax card stack with content */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative h-[420px] w-[420px] [perspective:1200px]">
                    {/* Base mesh */}
                    <motion.div
                      style={{ rotateX: tiltX, rotateY: tiltY }}
                      className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_20%_20%,#EF88AD20_0,transparent_40%),radial-gradient(circle_at_80%_30%,#3A051920_0,transparent_45%)] border border-white/30 dark:border-slate-700/50"
                    />

                    {/* Rotating conic ring */}
                    <motion.div
                      initial={{ rotate: 0, opacity: 0.7 }}
                      animate={{ rotate: 360, opacity: 0.9 }}
                      transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                      className="absolute -inset-8 rounded-full"
                      style={{ rotateX: tiltX, rotateY: tiltY }}
                    >
                      <div className="absolute inset-0 rounded-full [mask:radial-gradient(circle,transparent_60%,black_61%)] bg-[conic-gradient(from_90deg,rgba(239,136,173,0.35),rgba(58,5,25,0.35),rgba(239,136,173,0.35))]"></div>
                    </motion.div>
                    {/* Shimmer ring highlight */}
                    <motion.div
                      initial={{ rotate: 0, opacity: 0.0 }}
                      animate={{ rotate: -360, opacity: [0.2, 0.45, 0.2] }}
                      transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                      className="absolute -inset-10 rounded-full"
                      style={{ rotateX: tiltX, rotateY: tiltY }}
                    >
                      <div className="absolute inset-0 rounded-full [mask:radial-gradient(circle,transparent_62%,black_63%)] bg-[conic-gradient(from_0deg,rgba(255,255,255,0.15),rgba(239,136,173,0.25),rgba(255,255,255,0.15))]"></div>
                    </motion.div>

                    {/* Card A */}
                    <div className="absolute left-6 top-6">
                      <motion.div
                        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ rotateX: tiltX, rotateY: tiltY }}
                        whileHover={prefersReduced ? {} : { y: -4, scale: 1.02 }}
                        className="relative h-40 w-40"
                      >
                        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[#EF88AD90] to-[#3A051980]">
                          <div className="h-full w-full rounded-2xl bg-white/85 dark:bg-slate-900/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/60 shadow-xl p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="pointer-events-none absolute -top-6 left-0 right-0 h-16 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-700/30"></div>
                            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border border-[#EF88AD50] text-[#A53860] bg-[#EF88AD14]">Web • AI</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Fintech onboarding</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300">Live in 4 weeks</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Card B */}
                    <div className="absolute right-6 top-10">
                      <motion.div
                        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.08 }}
                        style={{ rotateX: tiltX, rotateY: tiltY }}
                        whileHover={prefersReduced ? {} : { y: -4, scale: 1.02 }}
                        className="relative h-44 w-40"
                      >
                        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[#3A051980] to-[#EF88AD90]">
                          <div className="h-full w-full rounded-2xl bg-white/85 dark:bg-slate-900/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/60 shadow-xl p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="pointer-events-none absolute -top-6 left-0 right-0 h-16 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-700/30"></div>
                            <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border border-[#3A051950] text-[#3A0519] dark:text-[#EF88AD] bg-[#3A051914]">Infra</span>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Cloud cost tuning</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300">−32% spend</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Card C */}
                    <div className="absolute left-12 bottom-10 right-12">
                      <motion.div
                        initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.16 }}
                        style={{ rotateX: tiltX, rotateY: tiltY }}
                        whileHover={prefersReduced ? {} : { y: -3, scale: 1.01 }}
                        className="relative h-44"
                      >
                        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-[#EF88AD90] to-[#3A051980]">
                          <div className="h-full w-full rounded-2xl bg-white/85 dark:bg-slate-900/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/60 shadow-xl p-4 flex items-center justify-between relative overflow-hidden">
                            <div className="pointer-events-none absolute -top-6 left-0 right-0 h-16 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-700/30"></div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Internal tools suite</p>
                              <p className="text-xs text-slate-600 dark:text-slate-300">NPS 65</p>
                            </div>
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#A53860] to-[#EF88AD] opacity-80" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Floating particles */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full bg-[#A53860] opacity-60"
                        initial={{ x: 200 - i * 36, y: 60 + (i % 4) * 32, opacity: 0 }}
                        animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 2.6 + (i % 4), repeat: Infinity }}
                        style={{ rotateX: tiltX, rotateY: tiltY }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
