'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  loadingMessage: string
  progress: number
  setLoading: (loading: boolean, message?: string) => void
  setProgress: (progress: number) => void
  setLoadingMessage: (message: string) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false) // Start with false to prevent hydration mismatch
  const [loadingMessage, setLoadingMessage] = useState('Initializing enterprise systems...')
  const [progress, setProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const setLoading = (loading: boolean, message?: string) => {
    setIsLoading(loading)
    if (message) {
      setLoadingMessage(message)
    }
    if (!loading) {
      setProgress(100)
    }
  }

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true)
    // Additional delay to ensure complete hydration
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Simulate initial page loading only on client
  useEffect(() => {
    if (!isClient || !isHydrated) return

    setIsLoading(true)
    const loadingSteps = [
      { message: 'Initializing enterprise systems...', progress: 15 },
      { message: 'Loading core components...', progress: 30 },
      { message: 'Preparing data infrastructure...', progress: 45 },
      { message: 'Optimizing performance...', progress: 60 },
      { message: 'Securing connections...', progress: 75 },
      { message: 'Finalizing setup...', progress: 90 },
      { message: 'Welcome to TechXygen!', progress: 100 }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingMessage(step.message)
        setProgress(step.progress)
        currentStep++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsLoading(false)
        }, 800)
      }
    }, 1200)

    return () => clearInterval(interval)
  }, [isClient, isHydrated])

  return (
    <LoadingContext.Provider value={{
      isLoading,
      loadingMessage,
      progress,
      setLoading,
      setProgress,
      setLoadingMessage
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
