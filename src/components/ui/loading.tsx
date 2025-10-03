'use client'

import { useState, useEffect } from 'react'
import { Loader2, Code, Database, Cloud, Shield } from 'lucide-react'
import { useLoading } from '@/contexts/loading-context'

// Main Loading Spinner Component
export function LoadingSpinner({ size = 'default', className = '' }: { size?: 'sm' | 'default' | 'lg' | 'xl', className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#3A0519] dark:text-[#A53860]`} />
    </div>
  )
}

// Modern Pulse Loading
export function PulseLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <div className="h-3 w-3 bg-[#3A0519] rounded-full animate-pulse"></div>
      <div className="h-3 w-3 bg-[#670D2F] rounded-full animate-pulse delay-100"></div>
      <div className="h-3 w-3 bg-[#A53860] rounded-full animate-pulse delay-200"></div>
      <div className="h-3 w-3 bg-[#EF88AD] rounded-full animate-pulse delay-300"></div>
    </div>
  )
}

// Skeleton Loader for Cards
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl p-8">
        {/* Icon Skeleton */}
        <div className="h-20 w-20 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6"></div>
        
        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3 w-3/4"></div>
        
        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
        </div>
        
        {/* Features Skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
        </div>
        
        {/* Progress Bar Skeleton */}
        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
  )
}

// Team Member Skeleton
export function TeamMemberSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl p-8 text-center">
        {/* Avatar Skeleton */}
        <div className="h-32 w-32 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>
        
        {/* Name Skeleton */}
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2 w-3/4 mx-auto"></div>
        
        {/* Role Skeleton */}
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3 w-1/2 mx-auto"></div>
        
        {/* Bio Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mx-auto"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6 mx-auto"></div>
        </div>
        
        {/* Skills Skeleton */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
        
        {/* Social Links Skeleton */}
        <div className="flex justify-center space-x-4">
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

// Project Card Skeleton
export function ProjectSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl overflow-hidden">
        {/* Image Skeleton */}
        <div className="h-48 bg-slate-200 dark:bg-slate-700"></div>
        
        <div className="p-6">
          {/* Title Skeleton */}
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3 w-3/4"></div>
          
          {/* Description Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
          
          {/* Technologies Skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-6 w-14 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          
          {/* Buttons Skeleton */}
          <div className="flex space-x-3">
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            <div className="h-10 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Progress Bar with Animation
export function ProgressBar({ progress, className = '' }: { progress: number, className?: string }) {
  return (
    <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

// Loading Overlay
export function LoadingOverlay({ isVisible, message = 'Loading...' }: { isVisible: boolean, message?: string }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
            <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-[#670D2F] to-[#EF88AD] animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {message}
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Please wait while we prepare everything for you...
          </p>
        </div>
      </div>
    </div>
  )
}

// Enhanced Page Loading Component
export function PageLoading() {
  const { isLoading, loadingMessage, progress } = useLoading()
  const [mounted, setMounted] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setAnimationsReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !isLoading) return null

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rotating Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#3A0519]/20 to-[#A53860]/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#670D2F]/20 to-[#EF88AD]/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
        
        {/* Floating Tech Icons */}
        {animationsReady && (
          <>
            <div className="absolute top-20 left-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float">
              <Database className="h-6 w-6 text-[#3A0519]/60" />
            </div>
            <div className="absolute top-40 right-32 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-1000">
              <Cloud className="h-6 w-6 text-[#A53860]/60" />
            </div>
            <div className="absolute bottom-32 left-32 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-2000">
              <Shield className="h-6 w-6 text-[#670D2F]/60" />
            </div>
            <div className="absolute top-1/2 right-20 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-500">
              <Code className="h-5 w-5 text-[#EF88AD]/60" />
            </div>
            <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center animate-float delay-1500">
              <Database className="h-4 w-4 text-[#3A0519]/40" />
            </div>
          </>
        )}
      </div>

      <div className="max-w-md w-full mx-4 relative z-10">
        {/* Main Loading Card with Enhanced Animations */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/30 relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3A0519]/5 via-transparent to-[#EF88AD]/5 opacity-50"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          {/* Logo/Icon with Enhanced Animation */}
          <div className="text-center mb-8 relative">
            <div className={`h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-[#3A0519] to-[#A53860] flex items-center justify-center mb-4 relative overflow-hidden transition-all duration-1000 ease-out ${animationsReady ? 'animate-fade-in-scale' : 'opacity-0 scale-95'}`}>
              {/* Rotating Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EF88AD]/20 to-[#3A0519]/20 animate-spin" style={{ animationDuration: '3s' }}></div>
              <Code className="h-10 w-10 text-white relative z-10 animate-pulse" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3A0519] to-[#A53860] opacity-0 animate-pulse" style={{ animationDuration: '2s' }}></div>
            </div>
            
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent transition-all duration-1000 ease-out ${animationsReady ? 'animate-slide-in-up' : 'opacity-0 translate-y-4'}`}>
              TechXygen
            </h1>
            
            {/* Subtitle with Typewriter Effect */}
            <p className={`text-sm text-slate-500 dark:text-slate-400 mt-2 transition-all duration-1000 delay-300 ease-out ${animationsReady ? 'animate-slide-in-up' : 'opacity-0 translate-y-4'}`}>
              Enterprise Software Solutions
            </p>
          </div>

          {/* Enhanced Progress Section */}
          {animationsReady && (
            <div className="mb-8 transition-all duration-1000 ease-out animate-slide-in-up">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center">
                  <div className="h-2 w-2 bg-[#A53860] rounded-full mr-2 animate-pulse"></div>
                  {loadingMessage}
                </span>
                <span className="text-sm font-bold text-[#3A0519] dark:text-[#A53860] bg-[#A53860]/10 dark:bg-[#3A0519]/20 px-2 py-1 rounded-full">
                  {progress}%
                </span>
              </div>
              
              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                {/* Progress Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {[0, 1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${
                        progress > (dot + 1) * 25 
                          ? 'bg-gradient-to-r from-[#3A0519] to-[#A53860] scale-125' 
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <PulseLoader />
              <div className="ml-4 flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1 w-1 bg-[#3A0519] rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Status Message */}
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
              Preparing your enterprise experience...
            </p>
            <div className="flex justify-center items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="h-1 w-1 bg-[#A53860] rounded-full animate-pulse"></div>
              <span>Loading components</span>
              <div className="h-1 w-1 bg-[#A53860] rounded-full animate-pulse delay-500"></div>
              <span>Initializing data</span>
              <div className="h-1 w-1 bg-[#A53860] rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] opacity-50"></div>
        </div>
      </div>
    </div>
  )
}

// Component Loading Wrapper
export function LoadingWrapper({ 
  isLoading, 
  children, 
  skeleton, 
  className = '' 
}: { 
  isLoading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
  className?: string 
}) {
  if (isLoading) {
    return (
      <div className={className}>
        {skeleton || <CardSkeleton />}
      </div>
    )
  }

  return <>{children}</>
}

// Inline Loading State
export function InlineLoading({ message = 'Loading...', className = '' }: { message?: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center space-x-3">
        <LoadingSpinner size="sm" />
        <span className="text-slate-600 dark:text-slate-300 font-medium">{message}</span>
      </div>
    </div>
  )
}
