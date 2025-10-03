'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function AdminPage() {
  const router = useRouter()
  const { user, adminProfile, loading } = useAuth()

  // Redirect to dashboard
  useEffect(() => {
    if (!loading && user && adminProfile) {
      router.push('/admin/dashboard')
    }
  }, [user, adminProfile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A0519] mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    )
  }

  return null
}


