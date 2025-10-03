"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { AdminRole, AdminUser } from '@/lib/admin/users'

type Props = {
  initial?: Partial<AdminUser>
  submitLabel: string
  onCancel: () => void
  onSubmit: (payload: { name: string; email: string; role: AdminRole; password?: string }) => Promise<void> | void
}

export default function UserForm({ initial, submitLabel, onCancel, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [role, setRole] = useState<AdminRole>((initial?.role as AdminRole) ?? 'hr_admin')
  const [password, setPassword] = useState('')

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await onSubmit({ name, email, role, password: initial?.id ? undefined : password })
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      {!initial?.id && (
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      )}
      <div>
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as AdminRole)}
          className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800"
        >
          <option value="hr_admin">HR Admin</option>
          <option value="content_admin">Content Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" className="flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]">{submitLabel}</Button>
      </div>
    </form>
  )
}


