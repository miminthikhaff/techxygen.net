'use client'

import { LoadingSpinner, InlineLoading } from './loading'

// Form Loading States
export function FormLoading({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) {
  if (isLoading) {
    return (
      <div className="relative">
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-lg">
          <InlineLoading message="Processing your request..." />
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Button Loading State
export function ButtonLoading({ 
  isLoading, 
  children, 
  loadingText = 'Loading...',
  className = ''
}: { 
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
}) {
  return (
    <button 
      className={`relative ${className}`}
      disabled={isLoading}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center text-inherit">
          {loadingText}
        </span>
      )}
    </button>
  )
}

// Input Loading State
export function InputLoading({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  )
}

// Form Submission Loading
export function FormSubmissionLoading({ isSubmitting, message = 'Submitting...' }: { isSubmitting: boolean, message?: string }) {
  if (!isSubmitting) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center space-x-3">
          <LoadingSpinner />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{message}</span>
        </div>
      </div>
    </div>
  )
}
