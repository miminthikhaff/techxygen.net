'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Job Postings', href: '/admin/jobs', icon: Briefcase },
  { name: 'Applications', href: '/admin/applications', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { adminProfile, signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/20 dark:border-slate-700/20 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#3A0519] to-[#A53860] flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
              TechXygen Admin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`${
                      isActive
                        ? "bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {adminProfile && (
              <div className="flex items-center space-x-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3A0519] to-[#A53860] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{adminProfile.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                    {adminProfile.role.replace('_', ' ')}
                  </p>
                </div>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 dark:border-slate-700/20 py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive
                          ? "bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
            
            {/* Mobile User Info */}
            {adminProfile && (
              <div className="mt-4 pt-4 border-t border-white/20 dark:border-slate-700/20">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3A0519] to-[#A53860] flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{adminProfile.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                      {adminProfile.role.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}


