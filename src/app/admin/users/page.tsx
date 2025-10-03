'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  
} from 'lucide-react'

interface AdminUser {
  id: string
  user_id: string
  name: string
  email: string
  role: 'super_admin' | 'hr_admin' | 'content_admin'
  created_at: string
  last_login?: string
  is_active: boolean
}

export default function UsersPage() {
  const adminProfile = { role: 'super_admin' as const }
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  // const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'hr_admin' as 'super_admin' | 'hr_admin' | 'content_admin',
    password: ''
  })

  useEffect(() => {
    // Mock data - replace with actual Supabase queries
    const mockUsers: AdminUser[] = [
      {
        id: '1',
        user_id: 'user-1',
        name: 'John Admin',
        email: 'admin@techxygen.net',
        role: 'super_admin',
        created_at: '2024-01-01T00:00:00Z',
        last_login: '2024-01-15T10:30:00Z',
        is_active: true
      },
      {
        id: '2',
        user_id: 'user-2',
        name: 'Jane HR',
        email: 'hr@techxygen.net',
        role: 'hr_admin',
        created_at: '2024-01-05T00:00:00Z',
        last_login: '2024-01-14T14:20:00Z',
        is_active: true
      },
      {
        id: '3',
        user_id: 'user-3',
        name: 'Mike Content',
        email: 'content@techxygen.net',
        role: 'content_admin',
        created_at: '2024-01-10T00:00:00Z',
        is_active: false
      }
    ]
    
    setUsers(mockUsers)
    setIsLoading(false)
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', label: 'Super Admin' },
      hr_admin: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', label: 'HR Admin' },
      content_admin: { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', label: 'Content Admin' }
    }
    
    const config = roleConfig[role as keyof typeof roleConfig]
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Shield className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock user creation - replace with actual Supabase queries
    const newUserData: AdminUser = {
      id: Date.now().toString(),
      user_id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      created_at: new Date().toISOString(),
      is_active: true
    }
    
    setUsers(prev => [...prev, newUserData])
    setNewUser({ name: '', email: '', role: 'hr_admin', password: '' })
    setIsCreating(false)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId))
    }
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, is_active: !user.is_active } : user
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A0519] mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading users...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage admin users and their permissions.
          </p>
        </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {getRoleBadge(user.role)}
                      {user.is_active ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-0">
                          <XCircle className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {user.role !== 'super_admin' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4" />
                    Joined {new Date(user.created_at).toLocaleDateString()}
                  </div>
                  {user.last_login && (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <CheckCircle className="h-4 w-4" />
                      Last login {new Date(user.last_login).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleUserStatus(user.id)}
                    className="flex-1"
                  >
                    {user.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create User Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
                  Add New User
                </CardTitle>
                <CardDescription>
                  Create a new admin user account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as 'super_admin' | 'hr_admin' | 'content_admin' }))}
                      className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800"
                    >
                      <option value="hr_admin">HR Admin</option>
                      <option value="content_admin">Content Admin</option>
                      {adminProfile?.role === 'super_admin' && (
                        <option value="super_admin">Super Admin</option>
                      )}
                    </select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreating(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
                    >
                      Create User
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
    </div>
  )
}
