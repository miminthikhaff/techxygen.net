'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AdminProfile {
  id: string
  user_id: string
  role: 'super_admin' | 'hr_admin' | 'content_admin'
  name: string
  email: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  adminProfile: AdminProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  isAdmin: boolean
  hasRole: (role: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  const fetchAdminProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching admin profile:', error)
        setAdminProfile(null)
        return
      }

      setAdminProfile(data)
    } catch (error) {
      console.error('Error fetching admin profile:', error)
      setAdminProfile(null)
    }
  }, [supabase])

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchAdminProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 5000) // 5 second timeout

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchAdminProfile(session.user.id)
        } else {
          setAdminProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [supabase.auth, fetchAdminProfile])


  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin/dashboard`
      }
    })
    return { error }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Sign out error:', e)
    } finally {
      setAdminProfile(null)
      // Use replace to avoid back navigation to protected page
      router.replace('/admin/login')
      // Force a hard navigation as a fallback to ensure cookies sync
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
      }, 50)
    }
  }

  const isAdmin = !!adminProfile
  const hasRole = (role: string) => adminProfile?.role === role

  const value = {
    user,
    session,
    adminProfile,
    loading,
    signIn,
    signInWithGoogle,
    signOut,
    isAdmin,
    hasRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
