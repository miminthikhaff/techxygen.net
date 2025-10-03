'use client'

import { useState, useEffect } from 'react'
import { HydrationSafeLoading } from './hydration-safe-loading'

interface AppLoadingWrapperProps {
  children: React.ReactNode
}

export function AppLoadingWrapper({ children }: AppLoadingWrapperProps) {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated after component mounts
    const timer = setTimeout(() => {
      setIsHydrated(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      // Simulate initial app loading
      const loadingTimer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 2000) // 2 seconds for initial load

      return () => clearTimeout(loadingTimer)
    }
  }, [isHydrated])

  // Show global loading screen during initial app load
  if (!isHydrated || isInitialLoad) {
    return <HydrationSafeLoading />
  }

  // Show the actual app content after loading is complete
  return <>{children}</>
}


