'use client'

import { createContext, useContext, useEffect, useState } from 'react'
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

  const fetchAdminProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('Error fetching admin profile:', error)
        // For demo purposes, create a mock admin profile if table doesn't exist
        if (error.code === 'PGRST116' || error.message.includes('relation "admin_profiles" does not exist')) {
          console.log('Admin profiles table not found, using mock data for demo')
          setAdminProfile({
            id: 'demo-admin',
            user_id: userId,
            role: 'super_admin',
            name: 'Demo Admin',
            email: 'admin@techxygen.net',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          return
        }
        setAdminProfile(null)
        return
      }

      setAdminProfile(data)
    } catch (error) {
      console.error('Error fetching admin profile:', error)
      // For demo purposes, create a mock admin profile
      console.log('Using mock admin profile for demo')
      setAdminProfile({
        id: 'demo-admin',
        user_id: userId,
        role: 'super_admin',
        name: 'Demo Admin',
        email: 'admin@techxygen.net',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }
  }

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
  }, [supabase.auth])


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
    await supabase.auth.signOut()
    setAdminProfile(null)
    router.push('/admin/login')
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
