'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X,
  MapPin,
  Clock,
  DollarSign,
  Search
} from 'lucide-react'

interface JobPosting {
  id: string
  title: string
  location: string
  type: string
  experience: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  is_active: boolean
  posted_date: string
  created_at: string
  updated_at: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    is_active: true
  })

  useEffect(() => {
    // Mock data - replace with actual Supabase queries
    const mockJobs: JobPosting[] = [
      {
        id: '1',
        title: 'Senior Full-Stack Developer',
        location: 'Colombo, Sri Lanka / Remote',
        type: 'Full-time',
        experience: '5+ years',
        salary: 'Competitive',
        description: 'Lead development of enterprise-grade web applications using React, Node.js, and cloud technologies.',
        requirements: [
          '5+ years experience with React/Next.js and Node.js',
          'Strong knowledge of TypeScript and modern JavaScript',
          'Experience with cloud platforms (AWS, Azure, GCP)',
          'Database design and optimization (PostgreSQL, MongoDB)',
          'CI/CD pipeline implementation',
          'Team leadership and mentoring experience'
        ],
        benefits: [
          'Health Insurance',
          'Flexible Hours',
          'Remote Work Options',
          'Generous Learning Budget',
          'Stock Options'
        ],
        is_active: true,
        posted_date: '2024-01-01',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'DevOps Engineer',
        location: 'Colombo, Sri Lanka / Remote',
        type: 'Full-time',
        experience: '3+ years',
        salary: 'Competitive',
        description: 'Design and implement scalable cloud infrastructure and CI/CD pipelines for enterprise clients.',
        requirements: [
          '3+ years experience with AWS/Azure/GCP',
          'Docker and Kubernetes expertise',
          'Infrastructure as Code (Terraform, CloudFormation)',
          'CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
          'Monitoring and logging (Prometheus, Grafana, ELK)',
          'Security best practices and compliance'
        ],
        benefits: [
          'Health Insurance',
          'Flexible Hours',
          'Remote Work Options',
          'Generous Learning Budget',
          'Stock Options'
        ],
        is_active: true,
        posted_date: '2024-01-05',
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z'
      },
      {
        id: '3',
        title: 'Frontend Developer',
        location: 'Colombo, Sri Lanka / Remote',
        type: 'Full-time',
        experience: '2+ years',
        salary: 'Competitive',
        description: 'Create beautiful, responsive user interfaces using modern frontend technologies and frameworks.',
        requirements: [
          '2+ years experience with React, Vue.js, or Angular',
          'Strong CSS/SCSS and responsive design skills',
          'Experience with state management (Redux, Zustand)',
          'Testing frameworks (Jest, Cypress)',
          'UI/UX design principles',
          'Performance optimization techniques'
        ],
        benefits: [
          'Health Insurance',
          'Flexible Hours',
          'Remote Work Options',
          'Generous Learning Budget',
          'Stock Options'
        ],
        is_active: false,
        posted_date: '2024-01-10',
        created_at: '2024-01-10T00:00:00Z',
        updated_at: '2024-01-10T00:00:00Z'
      }
    ]
    
    setJobs(mockJobs)
    setIsLoading(false)
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && job.is_active) ||
                         (filter === 'inactive' && !job.is_active)
    return matchesSearch && matchesFilter
  })

  const handleCreateJob = () => {
    setIsCreating(true)
    setFormData({
      title: '',
      location: '',
      type: '',
      experience: '',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      is_active: true
    })
  }

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      is_active: job.is_active
    })
  }

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(req => req.trim()),
      benefits: formData.benefits.split('\n').filter(benefit => benefit.trim())
    }

    if (editingJob) {
      setJobs(prev => prev.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...jobData, updated_at: new Date().toISOString() }
          : job
      ))
    } else {
      const newJob: JobPosting = {
        id: Date.now().toString(),
        ...jobData,
        posted_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setJobs(prev => [...prev, newJob])
    }

    setIsCreating(false)
    setEditingJob(null)
    setFormData({
      title: '',
      location: '',
      type: '',
      experience: '',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      is_active: true
    })
  }

  const handleDeleteJob = (jobId: string) => {
    if (confirm('Are you sure you want to delete this job posting?')) {
      setJobs(prev => prev.filter(job => job.id !== jobId))
    }
  }

  const handleToggleJobStatus = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, is_active: !job.is_active, updated_at: new Date().toISOString() }
        : job
    ))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A0519] mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading job postings...</p>
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
            Job Postings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your job openings and applications.
          </p>
        </div>
        <Button
          onClick={handleCreateJob}
          className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search job postings..."
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
            All ({jobs.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            size="sm"
          >
            Active ({jobs.filter(job => job.is_active).length})
          </Button>
          <Button
            variant={filter === 'inactive' ? 'default' : 'outline'}
            onClick={() => setFilter('inactive')}
            size="sm"
          >
            Inactive ({jobs.filter(job => !job.is_active).length})
          </Button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                    <Badge variant={job.is_active ? "default" : "secondary"}>
                      {job.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{job.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>Posted: {job.posted_date}</span>
                    <span>•</span>
                    <span>Updated: {new Date(job.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditJob(job)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleJobStatus(job.id)}
                  >
                    {job.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteJob(job.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Job Modal */}
      {(isCreating || editingJob) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-white/20 dark:border-slate-700/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent">
                  {editingJob ? 'Edit Job Posting' : 'Create Job Posting'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsCreating(false)
                    setEditingJob(null)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveJob} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Job Type</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    rows={6}
                    placeholder="5+ years experience with React/Next.js and Node.js&#10;Strong knowledge of TypeScript and modern JavaScript&#10;Experience with cloud platforms (AWS, Azure, GCP)"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                    rows={4}
                    placeholder="Health Insurance&#10;Flexible Hours&#10;Remote Work Options&#10;Generous Learning Budget"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="rounded border-slate-300"
                  />
                  <Label htmlFor="is_active">Active (visible to public)</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false)
                      setEditingJob(null)
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD]"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {editingJob ? 'Update Job' : 'Create Job'}
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


