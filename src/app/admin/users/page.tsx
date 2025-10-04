'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DataTable, SelectColumnCell, SelectColumnHeader } from '@/components/ui/data-table'
import { type ColumnDef } from '@tanstack/react-table'
import UserForm from '@/components/ui/user-form'
import { createUser, updateUser, deleteUser as svcDeleteUser, type AdminUser as AdminUserType } from '@/lib/admin/users'
import { 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield,
  
  CheckCircle,
  XCircle,
  Save,
  
  
} from 'lucide-react'
import { ArrowUpDown } from 'lucide-react'

type AdminUser = AdminUserType

export default function UsersPage() {
  const adminProfile = { role: 'super_admin' as const }
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [pendingDelete, setPendingDelete] = useState<{ user: AdminUser; timer: number } | null>(null)
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

  const filteredUsers = users

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

  const handleCreateUser = async () => {
    const created = await createUser(newUser)
    setUsers(prev => [...prev, created])
    setNewUser({ name: '', email: '', role: 'hr_admin', password: '' })
    setIsCreating(false)
  }

  const handleDeleteUser = async (user: AdminUser) => {
    const typed = window.prompt(`Type the user's email (${user.email}) to confirm deletion:`)
    if (typed !== user.email) {
      alert('Email did not match. Deletion cancelled.')
      return
    }
    // If another deletion is pending, finalize it now
    if (pendingDelete) {
      clearTimeout(pendingDelete.timer)
      await svcDeleteUser(pendingDelete.user.user_id)
    }

    // Optimistically remove from list
    setUsers(prev => prev.filter(u => u.id !== user.id))

    // Schedule hard delete in 5s
    const timer = window.setTimeout(async () => {
      await svcDeleteUser(user.user_id)
      setPendingDelete(null)
    }, 5000)

    setPendingDelete({ user, timer })
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, is_active: !user.is_active } : user
    ))
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    const updated = await updateUser(editingUser)
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)))
    setEditingUser(null)
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

  // Define columns for DataTable
  const columns: ColumnDef<AdminUser>[] = [
    {
      id: 'select',
      header: ({ table }) => <SelectColumnHeader table={table} />,
      cell: ({ row }) => <SelectColumnCell row={row} />, 
      enableSorting: false,
      enableHiding: false,
    },
    { 
      accessorKey: 'name', 
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    { 
      accessorKey: 'email', 
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      )
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Role
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => getRoleBadge(row.original.role),
    },
    {
      accessorKey: 'is_active',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        row.original.is_active ? (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">Active</Badge>
        ) : (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-0">Inactive</Badge>
        )
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          {/* Toggle Active/Inactive */}
          <Button
            variant="outline"
            size="icon"
            aria-label={row.original.is_active ? 'Deactivate user' : 'Activate user'}
            onClick={() => handleToggleUserStatus(row.original.id)}
          >
            {row.original.is_active ? (
              <XCircle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
          </Button>
          {/* Edit */}
          <Button variant="outline" size="icon" aria-label="Edit user" onClick={() => setEditingUser(row.original)}>
            <Edit className="h-4 w-4" />
          </Button>
          {row.original.role !== 'super_admin' && (
            <Button variant="outline" size="icon" aria-label="Delete user" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteUser(row.original)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }
  ]

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

        {/* Search removed; use DataTable filter */}

        {/* Users Table */}
        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
          <CardContent className="p-6">
            <DataTable columns={columns} data={filteredUsers} filterColumn="email" filterPlaceholder="Filter users by email..." />
          </CardContent>
        </Card>

        {/* Undo Toast */}
        {pendingDelete && (
          <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-xl p-4 w-[320px]">
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-1">User deleted</div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">{pendingDelete.user.name} will be permanently removed in 5 seconds.</div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  // finalize now
                  if (pendingDelete) {
                    clearTimeout(pendingDelete.timer)
                    await svcDeleteUser(pendingDelete.user.user_id)
                  }
                  setPendingDelete(null)
                }}
              >
                Dismiss
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
                onClick={() => {
                  if (!pendingDelete) return
                  clearTimeout(pendingDelete.timer)
                  // Restore user optimistically
                  setUsers(prev => [pendingDelete.user, ...prev])
                  setPendingDelete(null)
                }}
              >
                Undo
              </Button>
            </div>
          </div>
        )}

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
                <UserForm
                  submitLabel="Create User"
                  onCancel={() => setIsCreating(false)}
                  onSubmit={async (payload) => {
                    setNewUser({
                      name: payload.name,
                      email: payload.email,
                      role: payload.role,
                      password: payload.password ?? '',
                    })
                    await handleCreateUser()
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
                  Edit User
                </CardTitle>
                <CardDescription>Update user details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input
                      id="edit-name"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : prev)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : prev)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-role">Role</Label>
                    <select
                      id="edit-role"
                      value={editingUser.role}
                      onChange={(e) => setEditingUser(prev => prev ? { ...prev, role: e.target.value as AdminUser['role'] } : prev)}
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
                    <Button type="button" variant="outline" onClick={() => setEditingUser(null)} className="flex-1">Cancel</Button>
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]">
                      <Save className="h-4 w-4 mr-2" /> Save Changes
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
