'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    }
    
    setNotifications(prev => [newNotification, ...prev])
    
    if (notification.type === 'info') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
      }, 30000)
    }
  }, [])

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('admin-notifications')
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        setNotifications(parsed.map((n: Notification & { timestamp: string }) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })))
      } catch (error) {
        console.error('Error loading notifications:', error)
      }
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('admin-notifications', JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter(n => !n.read).length

  

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Simulate real-time notifications based on settings
  useEffect(() => {
    const interval = setInterval(() => {
      // Get settings from localStorage
      const settings = localStorage.getItem('admin-settings')
      let notificationSettings = {
        emailNotifications: true,
        jobApplicationAlerts: true,
        systemAlerts: true,
        weeklyReports: false
      }

      if (settings) {
        try {
          const parsed = JSON.parse(settings)
          notificationSettings = {
            emailNotifications: parsed.emailNotifications ?? true,
            jobApplicationAlerts: parsed.jobApplicationAlerts ?? true,
            systemAlerts: parsed.systemAlerts ?? true,
            weeklyReports: parsed.weeklyReports ?? false
          }
        } catch (error) {
          console.error('Error parsing settings:', error)
        }
      }

      // Only generate notifications if enabled in settings
      if (!notificationSettings.emailNotifications) return

      const randomEvents = [
        {
          type: 'info' as const,
          title: 'New Job Application',
          message: 'A new application has been submitted for Senior Developer position',
          actionUrl: '/admin/applications',
          actionText: 'View Application',
          enabled: notificationSettings.jobApplicationAlerts
        },
        {
          type: 'success' as const,
          title: 'Job Published',
          message: 'Frontend Developer job posting has been successfully published',
          actionUrl: '/admin/jobs',
          actionText: 'View Job',
          enabled: true
        },
        {
          type: 'warning' as const,
          title: 'Job Expiring Soon',
          message: 'DevOps Engineer position expires in 3 days',
          actionUrl: '/admin/jobs',
          actionText: 'Extend Job',
          enabled: true
        },
        {
          type: 'error' as const,
          title: 'System Alert',
          message: 'High server load detected. Consider scaling resources.',
          actionUrl: '/admin/settings',
          actionText: 'View Settings',
          enabled: notificationSettings.systemAlerts
        }
      ]

      // Filter events based on settings
      const enabledEvents = randomEvents.filter(event => event.enabled)

      // 10% chance of generating a notification every 30 seconds
      if (enabledEvents.length > 0 && Math.random() < 0.1) {
        const randomEvent = enabledEvents[Math.floor(Math.random() * enabledEvents.length)]
        addNotification({
          type: randomEvent.type,
          title: randomEvent.title,
          message: randomEvent.message,
          actionUrl: randomEvent.actionUrl,
          actionText: randomEvent.actionText
        })
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [addNotification])

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
