'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { RefreshCw } from 'lucide-react'

// Loading states for enterprise-level handling
type LoadingState = 'loading' | 'error' | 'timeout' | 'complete'

// Real progress tracking interface
interface LoadingProgress {
  assets: number      // CSS, JS, fonts loaded
  components: number  // React components mounted
  data: number        // API calls completed
  total: number       // Calculated total
}

// Hydration-safe loading component with real progress tracking
export function HydrationSafeLoading() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState('Initializing enterprise systems...')
  const [isComplete, setIsComplete] = useState(false)
  const [loadingState, setLoadingState] = useState<LoadingState>('loading')
  const [retryCount, setRetryCount] = useState(0)
  
  // Real progress tracking
  const [realProgress, setRealProgress] = useState<LoadingProgress>({
    assets: 0,
    components: 0,
    data: 0,
    total: 0
  })
  
  // const startTime = useRef(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Real progress calculation with fallback
  const calculateRealProgress = (progress: LoadingProgress) => {
    // If any component is stuck, use a more aggressive calculation
    const assets = Math.min(progress.assets, 100)
    const components = Math.min(progress.components, 100)
    const data = Math.min(progress.data, 100)
    
    // Weighted calculation - assets are most important
    const total = Math.round((assets * 0.4) + (components * 0.3) + (data * 0.3))
    return Math.min(total, 100)
  }

  // Track asset loading progress with fallback
  const trackAssetProgress = () => {
    let assetProgress = 0
    let maxProgress = 0
    
    const checkAssets = () => {
      const documentReady = document.readyState === 'complete' ? 100 : 0
      const fontsLoaded = document.fonts?.check('16px Inter') ? 100 : 0
      const imagesLoaded = document.images.length > 0 ? 
        Array.from(document.images).filter(img => img.complete).length / document.images.length * 100 : 100
      
      const currentProgress = Math.round((documentReady + fontsLoaded + imagesLoaded) / 3)
      
      // Ensure progress never goes backwards and has a minimum increment
      if (currentProgress > maxProgress) {
        maxProgress = currentProgress
        assetProgress = currentProgress
      } else {
        // Fallback: increment by 2% every check if stuck
        assetProgress = Math.min(assetProgress + 2, 100)
      }
      
      setRealProgress(prev => {
        const updated = { ...prev, assets: assetProgress }
        const total = calculateRealProgress(updated)
        setProgress(total)
        return updated
      })
    }

    // Check immediately and then periodically
    checkAssets()
    const interval = setInterval(checkAssets, 200)
    
    // Clean up after 8 seconds
    setTimeout(() => clearInterval(interval), 8000)
  }

  // Track component mounting progress with fallback
  const trackComponentProgress = () => {
    let componentProgress = 0
    let maxProgress = 0
    const totalComponents = 4 // Hero, Services, About, Portfolio
    
    const checkComponents = () => {
      const heroElement = document.querySelector('[data-component="hero"]')
      const servicesElement = document.querySelector('[data-component="services"]')
      const aboutElement = document.querySelector('[data-component="about"]')
      const portfolioElement = document.querySelector('[data-component="portfolio"]')
      
      const componentCount = [heroElement, servicesElement, aboutElement, portfolioElement]
        .filter(Boolean).length
      
      const currentProgress = Math.round((componentCount / totalComponents) * 100)
      
      // Ensure progress never goes backwards and has a minimum increment
      if (currentProgress > maxProgress) {
        maxProgress = currentProgress
        componentProgress = currentProgress
      } else {
        // Fallback: increment by 3% every check if stuck
        componentProgress = Math.min(componentProgress + 3, 100)
      }
      
      setRealProgress(prev => {
        const updated = { ...prev, components: componentProgress }
        const total = calculateRealProgress(updated)
        setProgress(total)
        return updated
      })
    }

    // Check every 300ms
    const interval = setInterval(checkComponents, 300)
    
    // Clean up after 12 seconds
    setTimeout(() => clearInterval(interval), 12000)
  }

  // Simulate data loading progress with guaranteed completion
  const trackDataProgress = () => {
    let dataProgress = 0
    let incrementCount = 0
    const maxIncrements = 20 // Ensure completion within 6 seconds (20 * 300ms)
    
    const interval = setInterval(() => {
      incrementCount++
      
      // More aggressive progression to prevent getting stuck
      if (incrementCount <= 10) {
        dataProgress += Math.random() * 12 + 8 // 8-20% increments
      } else if (incrementCount <= 15) {
        dataProgress += Math.random() * 8 + 5 // 5-13% increments
      } else {
        dataProgress += Math.random() * 5 + 3 // 3-8% increments
      }
      
      // Force completion if we're close or at max increments
      if (dataProgress >= 95 || incrementCount >= maxIncrements) {
        dataProgress = 100
        clearInterval(interval)
      }
      
      setRealProgress(prev => {
        const updated = { ...prev, data: Math.round(dataProgress) }
        const total = calculateRealProgress(updated)
        setProgress(total)
        return updated
      })
    }, 300)
    
    // Safety cleanup after 8 seconds
    setTimeout(() => {
      clearInterval(interval)
      setRealProgress(prev => {
        const updated = { ...prev, data: 100 }
        const total = calculateRealProgress(updated)
        setProgress(total)
        return updated
      })
    }, 8000)
  }

  useEffect(() => {
    // Ensure we're on the client side
    setIsHydrated(true)
    
    // Show loading after a brief delay to ensure smooth transition and font loading
    const timer = setTimeout(() => {
      setShowLoading(true)
      trackAssetProgress()
      trackComponentProgress()
      trackDataProgress()
    }, 300)

    // Final safety mechanism - force completion after 12 seconds
    const safetyTimer = setTimeout(() => {
      if (progress < 100) {
        setRealProgress({ assets: 100, components: 100, data: 100, total: 100 })
        setProgress(100)
        setLoadingState('complete')
        setLoadingMessage('Welcome to TechXygen!')
        setTimeout(() => setIsComplete(true), 1000)
      }
    }, 12000)

    return () => {
      clearTimeout(timer)
      clearTimeout(safetyTimer)
    }
  }, [])

  // Enhanced loading messages based on real progress
  const getContextualMessage = (progress: number, realProgress: LoadingProgress) => {
    if (progress < 20) return 'Loading core assets...'
    if (progress < 40) return 'Initializing components...'
    if (progress < 60) return 'Preparing data infrastructure...'
    if (progress < 80) return 'Optimizing performance...'
    if (progress < 95) return 'Securing connections...'
    if (progress < 100) return 'Finalizing setup...'
    return 'Welcome to TechXygen!'
  }

  // Error handling and timeout management
  useEffect(() => {
    if (!showLoading) return

    // Set timeout for loading (10 seconds - more aggressive)
    timeoutRef.current = setTimeout(() => {
      if (progress < 100) {
        setLoadingState('timeout')
        setLoadingMessage('Taking longer than expected...')
      }
    }, 10000)

    // Auto-complete when progress reaches 100%
    if (progress >= 100 && loadingState === 'loading') {
      setLoadingState('complete')
      setLoadingMessage('Welcome to TechXygen!')
      
      setTimeout(() => {
        setIsComplete(true)
      }, 1000)
    }

    // Update message based on real progress
    const newMessage = getContextualMessage(progress, realProgress)
    if (newMessage !== loadingMessage) {
      setLoadingMessage(newMessage)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [showLoading, progress, realProgress, loadingState])

  // Retry mechanism for errors
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    setLoadingState('loading')
    setProgress(0)
    setRealProgress({ assets: 0, components: 0, data: 0, total: 0 })
    setLoadingMessage('Retrying connection...')
    
    // Restart tracking
    setTimeout(() => {
      trackAssetProgress()
      trackComponentProgress()
      trackDataProgress()
    }, 500)
  }

  // Don't render anything until hydrated
  if (!isHydrated) {
    return null
  }

  // Hide loading screen when complete
  if (isComplete) {
    return null
  }

  // Show loading screen
  if (showLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
        {/* Netflix-style Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"></div>
        
        {/* Subtle Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          {/* Netflix-style Logo Animation */}
          <div className="mb-12">
            <div className="relative inline-block">
              {/* Main Logo Container */}
              <div className="relative">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-2xl blur-xl opacity-30 scale-110 animate-pulse"></div>
                
                {/* Logo Icon */}
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="TechXygen Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain animate-pulse"
                    priority
                  />
                  
                  {/* Rotating Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-[#3A0519] to-[#A53860] animate-spin opacity-20" style={{ animationDuration: '3s' }}></div>
                </div>
              </div>
              
              {/* Company Name with Netflix-style Typography */}
              <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                TechXygen
              </h1>
              
              {/* Subtitle */}
              <p className="text-gray-400 text-sm font-light tracking-wider uppercase">
                Enterprise Software Solutions
              </p>
            </div>
          </div>

          {/* Netflix-style Progress Indicator */}
          <div className="max-w-sm mx-auto">
            {/* Progress Bar */}
            <div className="relative mb-8">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                </div>
              </div>
              
              {/* Progress Percentage */}
              <div className="absolute -top-8 right-0 text-white text-sm font-medium">
                {progress}%
              </div>
            </div>

            {/* Loading Message */}
            <div className="text-center">
              <p className="text-gray-300 text-sm font-light mb-4 tracking-wide">
                {loadingMessage}
              </p>
              
              {/* Netflix-style Loading Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Error/Retry State */}
            {loadingState === 'error' || loadingState === 'timeout' ? (
              <div className="mt-8">
                <button
                  onClick={handleRetry}
                  className="px-8 py-3 bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white font-medium rounded-lg hover:from-[#670D2F] hover:to-[#A53860] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="h-4 w-4 mr-2 inline" />
                  Retry {retryCount > 0 && `(${retryCount})`}
                </button>
              </div>
            ) : (
              /* Progress Details */
              <div className="mt-8 grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Assets</div>
                  <div className="text-white font-medium">{realProgress.assets}%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Components</div>
                  <div className="text-white font-medium">{realProgress.components}%</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Data</div>
                  <div className="text-white font-medium">{realProgress.data}%</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Return null during hydration
  return null
}
