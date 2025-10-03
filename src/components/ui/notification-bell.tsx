'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, X, Check, Trash2, ExternalLink } from 'lucide-react'
import { useNotifications } from '@/contexts/notification-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// Removed unused Card components

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'warning':
        return '⚠️'
      case 'error':
        return '❌'
      default:
        return 'ℹ️'
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
      case 'error':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-110"
      >
        <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#A53860] text-white text-xs flex items-center justify-center p-0 animate-pulse shadow-lg"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute top-12 w-76 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#A53860] rounded-full animate-pulse"></div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Notifications</h3>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center">
                  <Bell className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No notifications yet</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">You&apos;ll see updates here when they arrive</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border mb-3 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'ring-2 ring-[#A53860]/30 shadow-sm' : 'hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeNotification(notification.id)}
                              className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className={`text-sm mt-1 ${!notification.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                          {notification.message}
                        </p>
                        {notification.actionUrl && notification.actionText && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 h-6 px-2 text-xs text-[#A53860] hover:text-[#670D2F] hover:bg-[#A53860]/10"
                            onClick={() => {
                              markAsRead(notification.id)
                              window.location.href = notification.actionUrl!
                            }}
                          >
                            {notification.actionText}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-sm font-medium text-[#A53860] hover:text-[#670D2F] hover:bg-[#A53860]/10 transition-all duration-200"
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to full notifications page if it exists
                  window.location.href = '/admin/notifications'
                }}
              >
                View all notifications
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
