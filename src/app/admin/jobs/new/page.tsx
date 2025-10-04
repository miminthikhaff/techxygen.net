'use client'

import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function NewJobPage() {
  const router = useRouter()
  const [form, setForm] = useState({ title: '', location: '', type: '', description: '' })

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">Create Job Posting</CardTitle>
          <CardDescription>Quickly capture the basics. You can add full details on the Job Postings page.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              router.push('/admin/jobs')
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="title" className="block mb-1">Job Title</Label>
              <Input
                id="title"
                placeholder="e.g. Senior Full‑Stack Developer"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <p className="text-xs text-slate-500">Use a clear, searchable title.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="block mb-1">Location</Label>
                <Input id="location" placeholder="e.g. Colombo / Remote" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="block mb-1">Employment Type</Label>
                <Input id="type" placeholder="e.g. Full‑time" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="block mb-1">Short Description</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe the role and impact..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
              />
              <p className="text-xs text-slate-500">A short summary helps candidates understand the role quickly.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => router.back()} className="sm:flex-1">Cancel</Button>
              <Button type="submit" className="sm:flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]">Create & Continue</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


