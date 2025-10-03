'use client'

import { useState } from 'react'
import { useNotifications } from '@/contexts/notification-context'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
//
import { 
  Bell, 
  Check, 
  Trash2, 
  ExternalLink, 
  Filter,
  Search,
  Calendar,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle
} from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications()
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'info' | 'success' | 'warning' | 'error'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  // removed unused helper

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

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) || 
      (filter === 'read' && notification.read)
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesType && matchesSearch
  })

  if (notifications.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your system notifications and alerts
            </p>
          </div>
        </div>

        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardContent className="p-12 text-center">
            <Bell className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No notifications yet
            </h3>
              <p className="text-slate-600 dark:text-slate-400">
                You&apos;ll see system notifications, job applications, and other important updates here.
              </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            {notifications.length} total notifications • {unreadCount} unread
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="border-[#A53860] text-[#A53860] hover:bg-[#A53860] hover:text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button
            variant="outline"
            onClick={clearAllNotifications}
            className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'info' | 'success' | 'warning' | 'error')}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                No notifications found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your filters or search terms.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border transition-all duration-200 hover:shadow-md ${
                !notification.read 
                  ? 'border-[#A53860]/30 ring-1 ring-[#A53860]/20' 
                  : 'border-white/30 dark:border-slate-700/30'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${
                        !notification.read 
                          ? 'text-slate-900 dark:text-white' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            notification.type === 'success' ? 'border-green-300 text-green-700' :
                            notification.type === 'warning' ? 'border-yellow-300 text-yellow-700' :
                            notification.type === 'error' ? 'border-red-300 text-red-700' :
                            'border-blue-300 text-blue-700'
                          }`}
                        >
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <Badge className="bg-[#A53860] text-white text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className={`text-slate-700 dark:text-slate-300 mb-3 ${
                      !notification.read ? 'font-medium' : ''
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatTimeAgo(notification.timestamp)}</span>
                        </div>
                        {notification.actionUrl && notification.actionText && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs text-[#A53860] hover:text-[#670D2F] hover:bg-[#A53860]/10"
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
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 px-2 text-xs text-slate-600 hover:text-slate-900"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
