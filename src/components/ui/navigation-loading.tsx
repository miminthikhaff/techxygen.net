'use client'

import { LoadingSpinner } from './loading'

// Navigation Loading States
export function NavigationLoading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-white/20 dark:border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Page Transition Loading
export function PageTransitionLoading({ isLoading, message = 'Loading page...' }: { isLoading: boolean, message?: string }) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3">
          <LoadingSpinner />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}

// Route Loading Indicator
export function RouteLoadingIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
      <div className="h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] animate-pulse"></div>
    </div>
  )
}





