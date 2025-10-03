'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
  Chrome
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signInWithGoogle, user, adminProfile, loading } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user && adminProfile) {
      const redirectTo = searchParams.get('redirect') || '/admin'
      router.push(redirectTo)
    }
  }, [user, adminProfile, loading, router, searchParams])

  // Check for error messages from URL params
  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam === 'insufficient_permissions') {
      setError('You do not have sufficient permissions to access this area.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        setIsAuthenticated(true)
        // The useEffect will handle the redirect
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    }
    
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError('')

    try {
      const { error } = await signInWithGoogle()
      
      if (error) {
        setError(error.message)
      } else {
        setIsAuthenticated(true)
        // The useEffect will handle the redirect
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    }
    
    setIsGoogleLoading(false)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Authentication Successful!
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Redirecting to admin dashboard...
            </p>
            <div className="mt-6">
              <Loader2 className="h-8 w-8 animate-spin text-[#3A0519] mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-[#3A0519]/20 to-[#A53860]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-[#670D2F]/20 to-[#EF88AD]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center">
            <Shield className="h-8 w-8 text-[#3A0519] dark:text-[#A53860]" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">
            Secure access to TechXygen administration panel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-slate-900 dark:text-white font-medium">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-[#3A0519] dark:focus:border-[#A53860] focus:ring-[#3A0519]/20 dark:focus:ring-[#A53860]/20"
                  placeholder="admin@techxygen.net"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-900 dark:text-white font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-[#3A0519] dark:focus:border-[#A53860] focus:ring-[#3A0519]/20 dark:focus:ring-[#A53860]/20"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Access Admin Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className="w-full border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-full py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting to Google...
              </>
            ) : (
              <>
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </>
            )}
          </Button>

          {/* Setup Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Setup Required:</h4>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <p>1. Create a Supabase project</p>
              <p>2. Set up admin_profiles table</p>
              <p>3. Add environment variables</p>
              <p>4. Enable Google OAuth (optional)</p>
              <p>5. Create your admin account</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              🔒 This is a secure admin portal. All activities are logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
