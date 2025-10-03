'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AdminPageLoading } from '@/components/ui/admin-loading'
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  UserPlus,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { adminProfile, loading } = useAuth()
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalUsers: 0,
    activeUsers: 0
  })

  useEffect(() => {
    // Mock data - replace with actual Supabase queries
    const timer = setTimeout(() => {
      setStats({
        totalJobs: 12,
        activeJobs: 8,
        totalApplications: 45,
        pendingApplications: 12,
        totalUsers: 3,
        activeUsers: 2
      })
      setIsPageLoading(false)
    }, 500) // Reduced from 1000ms to 500ms for faster loading

    return () => clearTimeout(timer)
  }, [])

  // Debug logging removed for production cleanliness

  if (loading || isPageLoading) {
    return <AdminPageLoading />
  }

  const recentActivities = [
    { id: 1, type: 'application', message: 'New application for Senior Developer', time: '2 hours ago', icon: FileText },
    { id: 2, type: 'job', message: 'Job posting "Frontend Developer" published', time: '4 hours ago', icon: Briefcase },
    { id: 3, type: 'user', message: 'New admin user added', time: '1 day ago', icon: UserPlus },
    { id: 4, type: 'application', message: 'Application for DevOps Engineer reviewed', time: '2 days ago', icon: CheckCircle },
  ]

  const quickActions = [
    { title: 'Create Job Posting', description: 'Add a new job opening', href: '/admin/jobs/new', icon: Plus, color: 'bg-blue-500' },
    { title: 'View Applications', description: 'Review job applications', href: '/admin/applications', icon: FileText, color: 'bg-green-500' },
    { title: 'Manage Users', description: 'Add or edit admin users', href: '/admin/users', icon: Users, color: 'bg-purple-500' },
    { title: 'Site Settings', description: 'Configure site settings', href: '/admin/settings', icon: Settings, color: 'bg-orange-500' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Welcome back, {adminProfile?.name}! Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Jobs</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalJobs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Jobs</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeJobs}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Applications</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalApplications}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingApplications}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Admin Users</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900 dark:text-white">{action.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
                      </div>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <activity.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.message}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Analytics Overview</CardTitle>
              <CardDescription>Key performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Job Performance</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">View detailed job analytics</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <PieChart className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Application Trends</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Track application patterns</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Growth Metrics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Monitor site growth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
