export type AdminRole = 'super_admin' | 'hr_admin' | 'content_admin'

export interface AdminUser {
  id: string
  user_id: string
  name: string
  email: string
  role: AdminRole
  created_at: string
  last_login?: string
  is_active: boolean
}

// Mock implementations. Replace with Supabase calls later.
export async function createUser(user: Pick<AdminUser, 'name' | 'email' | 'role'> & { password?: string }): Promise<AdminUser> {
  return {
    id: Date.now().toString(),
    user_id: `user-${Date.now()}`,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: new Date().toISOString(),
    is_active: true,
  }
}

export async function updateUser(user: AdminUser): Promise<AdminUser> {
  // Call internal API to update admin_profiles (service role on server)
  await fetch(`/api/admin/users/${user.user_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: user.name, email: user.email, role: user.role }),
  })
  return user
}

export async function deleteUser(id: string): Promise<void> {
  await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
}

export const ROLE_META: Record<AdminRole, { label: string; color: string }> = {
  super_admin: { label: 'Super Admin', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
  hr_admin: { label: 'HR Admin', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
  content_admin: { label: 'Content Admin', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
}


