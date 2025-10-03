'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { NotificationProvider } from '@/contexts/notification-context'
import { AppLoadingWrapper } from '@/components/ui/app-loading-wrapper'
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
  User,
  Bell
} from 'lucide-react'
import { NotificationBell } from '@/components/ui/notification-bell'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Job Postings', href: '/admin/jobs', icon: Briefcase },
  { name: 'Applications', href: '/admin/applications', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { adminProfile, signOut } = useAuth()
  const pathname = usePathname()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // Do not render the admin chrome (sidebar/topbar) on the public login page
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {children}
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <NotificationProvider>
      <AppLoadingWrapper>
      <div className="h-screen bg-slate-50 dark:bg-slate-900 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-[#3A0519] to-[#A53860] rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">TechXygen</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <NotificationBell />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3">
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Navigation
              </h2>
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3A0519] to-[#A53860] text-white shadow-lg transform scale-105'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:transform hover:scale-105'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer removed per request */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {pathname === '/admin/dashboard' && 'Dashboard'}
                  {pathname === '/admin/jobs' && 'Job Postings'}
                  {pathname === '/admin/applications' && 'Applications'}
                  {pathname === '/admin/users' && 'User Management'}
                  {pathname === '/admin/notifications' && 'Notifications'}
                  {pathname === '/admin/settings' && 'Settings'}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="leading-tight">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {greeting}, {adminProfile?.name ?? 'Admin'}
                  </div>
                  {adminProfile?.role && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                      {adminProfile.role.replace('_', ' ')}
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </AppLoadingWrapper>
    </NotificationProvider>
  )
}