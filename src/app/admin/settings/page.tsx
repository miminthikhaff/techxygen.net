'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { AdminPageLoading } from '@/components/ui/admin-loading'
import { 
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function AdminSettings() {
  const loading = false
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'TechXygen',
    siteDescription: 'Enterprise Software Development & Cloud Solutions',
    siteUrl: 'https://techxygen.net',
    adminEmail: 'admin@techxygen.net',
    
    // Notification Settings
    emailNotifications: true,
    jobApplicationAlerts: true,
    systemAlerts: true,
    weeklyReports: false,
    
    // Security Settings
    sessionTimeout: 30,
    requireMFA: false,
    allowPasswordReset: true,
    maxLoginAttempts: 5,
    
    // Job Posting Settings
    autoApproveJobs: false,
    requireJobApproval: true,
    jobExpiryDays: 30,
    maxActiveJobs: 10,
    
    // Application Settings
    autoRespondApplications: true,
    applicationResponseTemplate: 'Thank you for your application. We will review it and get back to you soon.',
    requireCoverLetter: true,
    allowFileUploads: true,
  })

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('admin-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }

    // Simulate loading settings
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSettingChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')
    
    try {
      // Save settings to localStorage
      localStorage.setItem('admin-settings', JSON.stringify(settings))
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Settings saved:', settings)
      setSaveStatus('success')
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  if (loading || isPageLoading) {
    return <AdminPageLoading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your admin panel and system preferences
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200">Settings saved successfully!</span>
        </div>
      )}
      
      {saveStatus === 'error' && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-red-800 dark:text-red-200">Failed to save settings. Please try again.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-[#A53860]" />
              <span>General Settings</span>
            </CardTitle>
            <CardDescription>
              Basic site configuration and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={settings.siteUrl}
                onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-[#A53860]" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Configure email and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receive email notifications</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="jobApplicationAlerts">Job Application Alerts</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get notified of new applications</p>
              </div>
              <Switch
                id="jobApplicationAlerts"
                checked={settings.jobApplicationAlerts}
                onCheckedChange={(checked) => handleSettingChange('jobApplicationAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemAlerts">System Alerts</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receive system maintenance alerts</p>
              </div>
              <Switch
                id="systemAlerts"
                checked={settings.systemAlerts}
                onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receive weekly activity reports</p>
              </div>
              <Switch
                id="weeklyReports"
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#A53860]" />
              <span>Security</span>
            </CardTitle>
            <CardDescription>
              Configure security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="mt-1"
                min="5"
                max="480"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireMFA">Require Multi-Factor Authentication</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Force MFA for all admin accounts</p>
              </div>
              <Switch
                id="requireMFA"
                checked={settings.requireMFA}
                onCheckedChange={(checked) => handleSettingChange('requireMFA', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowPasswordReset">Allow Password Reset</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Enable password reset functionality</p>
              </div>
              <Switch
                id="allowPasswordReset"
                checked={settings.allowPasswordReset}
                onCheckedChange={(checked) => handleSettingChange('allowPasswordReset', checked)}
              />
            </div>
            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                className="mt-1"
                min="3"
                max="10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Posting Settings */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-[#A53860]" />
              <span>Job Postings</span>
            </CardTitle>
            <CardDescription>
              Configure job posting and management settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoApproveJobs">Auto-Approve Jobs</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">Automatically approve new job postings</p>
              </div>
              <Switch
                id="autoApproveJobs"
                checked={settings.autoApproveJobs}
                onCheckedChange={(checked) => handleSettingChange('autoApproveJobs', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireJobApproval">Require Job Approval</Label>
                <p className="text-sm text-slate-600 dark:text-slate-400">All jobs must be manually approved</p>
              </div>
              <Switch
                id="requireJobApproval"
                checked={settings.requireJobApproval}
                onCheckedChange={(checked) => handleSettingChange('requireJobApproval', checked)}
              />
            </div>
            <div>
              <Label htmlFor="jobExpiryDays">Job Expiry (days)</Label>
              <Input
                id="jobExpiryDays"
                type="number"
                value={settings.jobExpiryDays}
                onChange={(e) => handleSettingChange('jobExpiryDays', parseInt(e.target.value))}
                className="mt-1"
                min="7"
                max="365"
              />
            </div>
            <div>
              <Label htmlFor="maxActiveJobs">Max Active Jobs</Label>
              <Input
                id="maxActiveJobs"
                type="number"
                value={settings.maxActiveJobs}
                onChange={(e) => handleSettingChange('maxActiveJobs', parseInt(e.target.value))}
                className="mt-1"
                min="1"
                max="50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Settings */}
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-[#A53860]" />
            <span>Application Settings</span>
          </CardTitle>
          <CardDescription>
            Configure job application handling and responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoRespondApplications">Auto-Respond to Applications</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Send automatic confirmation emails</p>
                </div>
                <Switch
                  id="autoRespondApplications"
                  checked={settings.autoRespondApplications}
                  onCheckedChange={(checked) => handleSettingChange('autoRespondApplications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="requireCoverLetter">Require Cover Letter</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Make cover letter mandatory</p>
                </div>
                <Switch
                  id="requireCoverLetter"
                  checked={settings.requireCoverLetter}
                  onCheckedChange={(checked) => handleSettingChange('requireCoverLetter', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowFileUploads">Allow File Uploads</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Enable resume and document uploads</p>
                </div>
                <Switch
                  id="allowFileUploads"
                  checked={settings.allowFileUploads}
                  onCheckedChange={(checked) => handleSettingChange('allowFileUploads', checked)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="applicationResponseTemplate">Auto-Response Template</Label>
              <Textarea
                id="applicationResponseTemplate"
                value={settings.applicationResponseTemplate}
                onChange={(e) => handleSettingChange('applicationResponseTemplate', e.target.value)}
                className="mt-1"
                rows={6}
                placeholder="Enter the template for automatic application responses..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
