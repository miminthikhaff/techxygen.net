'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Mail, 
  Phone, 
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  
  
  
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'

interface JobApplication {
  id: string
  job_id: string
  job_title: string
  name: string
  email: string
  phone?: string
  experience: string
  cover_letter: string
  resume_url?: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  created_at: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Mock data - replace with actual Supabase queries
    const mockApplications: JobApplication[] = [
      {
        id: '1',
        job_id: '1',
        job_title: 'Senior Full-Stack Developer',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+94 77 123 4567',
        experience: '5+ years',
        cover_letter: 'I am excited to apply for the Senior Full-Stack Developer position...',
        resume_url: '/resumes/john-doe-resume.pdf',
        status: 'pending',
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        job_id: '2',
        job_title: 'DevOps Engineer',
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+94 77 987 6543',
        experience: '3+ years',
        cover_letter: 'I have extensive experience in DevOps and cloud technologies...',
        resume_url: '/resumes/jane-smith-resume.pdf',
        status: 'reviewed',
        created_at: '2024-01-14T14:20:00Z'
      },
      {
        id: '3',
        job_id: '3',
        job_title: 'Frontend Developer',
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        experience: '2+ years',
        cover_letter: 'I am passionate about creating beautiful user interfaces...',
        status: 'accepted',
        created_at: '2024-01-13T09:15:00Z'
      }
    ]
    
    setApplications(mockApplications)
    setIsLoading(false)
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.job_title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400', icon: Clock },
      reviewed: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400', icon: Eye },
      accepted: { color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const updateApplicationStatus = (id: string, status: 'pending' | 'reviewed' | 'accepted' | 'rejected') => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status } : app
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A0519] mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-2">
          Job Applications
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Manage and review job applications from candidates.
        </p>
      </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All ({applications.length})
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              size="sm"
            >
              Pending ({applications.filter(app => app.status === 'pending').length})
            </Button>
            <Button
              variant={filter === 'reviewed' ? 'default' : 'outline'}
              onClick={() => setFilter('reviewed')}
              size="sm"
            >
              Reviewed ({applications.filter(app => app.status === 'reviewed').length})
            </Button>
          </div>
        </div>

        {/* Applications List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredApplications.map((application) => (
              <Card 
                key={application.id} 
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setSelectedApplication(application)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {application.name}
                        </h3>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Applied for: <span className="font-medium">{application.job_title}</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {application.email}
                        </div>
                        {application.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {application.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(application.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedApplication(application)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Details */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    Application Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {selectedApplication.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Applied for: {selectedApplication.job_title}
                    </p>
                    {getStatusBadge(selectedApplication.status)}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedApplication.email}</p>
                    </div>
                    {selectedApplication.phone && (
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{selectedApplication.phone}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience</label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{selectedApplication.experience}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Applied Date</label>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(selectedApplication.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                      Cover Letter
                    </label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                      {selectedApplication.cover_letter}
                    </div>
                  </div>

                  {selectedApplication.resume_url && (
                    <div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Update Status
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={selectedApplication.status === 'accepted' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'accepted')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant={selectedApplication.status === 'rejected' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Select an application to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
    </div>
  )
}
