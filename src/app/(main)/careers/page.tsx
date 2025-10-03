'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Heart, 
  Globe, 
  Code, 
  Database, 
  Cloud, 
  Shield,
  ArrowRight,
  CheckCircle,
  
  TrendingUp,
  Coffee,
  Laptop,
  BookOpen,
  Send,
  
  Target,
  Lightbulb,
  Mail
} from 'lucide-react'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/page-container'

export default function CareersPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const jobOpenings = [
    {
      id: 'senior-fullstack',
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
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'],
      posted: '2 days ago'
    },
    {
      id: 'devops-engineer',
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
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'],
      posted: '1 week ago'
    },
    {
      id: 'frontend-developer',
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
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'],
      posted: '3 days ago'
    },
    {
      id: 'backend-developer',
      title: 'Backend Developer',
      location: 'Colombo, Sri Lanka / Remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: 'Competitive',
      description: 'Build robust, scalable backend services and APIs using modern technologies and best practices.',
      requirements: [
        '3+ years experience with Node.js, Python, or Java',
        'RESTful API and GraphQL development',
        'Database design and optimization',
        'Microservices architecture',
        'Authentication and authorization (OAuth, JWT)',
        'Performance monitoring and optimization'
      ],
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget', 'Stock Options'],
      posted: '5 days ago'
    }
  ]

  const companyValues = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and cutting-edge solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Teamwork and knowledge sharing drive our success'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do'
    },
    {
      icon: Heart,
      title: 'Growth',
      description: 'Personal and professional development is our priority'
    }
  ]

  const benefits = [
    {
      icon: Coffee,
      title: 'Flexible Work',
      description: 'Remote work options and flexible hours'
    },
    {
      icon: BookOpen,
      title: 'Learning Budget',
      description: '$2,000 annual budget for courses and conferences'
    },
    {
      icon: Laptop,
      title: 'Latest Equipment',
      description: 'Top-of-the-line hardware and software tools'
    },
    {
      icon: Award,
      title: 'Health Insurance',
      description: 'Comprehensive health and dental coverage'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear promotion paths and skill development'
    },
    {
      icon: Globe,
      title: 'Global Projects',
      description: 'Work on international enterprise solutions'
    }
  ]

  const techStack = [
    { name: 'React', icon: Code },
    { name: 'Node.js', icon: Database },
    { name: 'AWS', icon: Cloud },
    { name: 'Docker', icon: Shield }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData()
      formData.append('name', applicationData.name)
      formData.append('email', applicationData.email)
      formData.append('phone', applicationData.phone)
      formData.append('position', applicationData.position)
      formData.append('experience', applicationData.experience)
      formData.append('coverLetter', applicationData.coverLetter)
      
      if (applicationData.resume) {
        formData.append('resume', applicationData.resume)
      }

      const response = await fetch('/api/job-application', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application')
      }

      setIsSubmitted(true)
      
      // Reset form
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        coverLetter: '',
        resume: null
      })
    } catch (error) {
      console.error('Application submission error:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-[#3A0519]/20 to-[#A53860]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-[#670D2F]/20 to-[#EF88AD]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                  Join Our
                </span>
                <span className="block bg-gradient-to-r from-[#3A0519] via-[#A53860] to-[#EF88AD] bg-clip-text text-transparent">
                  Tech Team
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                Build the future of enterprise software with cutting-edge technologies, 
                <span className="font-semibold text-slate-900 dark:text-white"> innovative solutions</span>, and 
                <span className="font-semibold text-slate-900 dark:text-white"> global impact</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button asChild size="lg" className="text-lg px-10 py-6 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <Link href="#openings">
                    View Open Positions
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-full border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] transition-all duration-300 transform hover:scale-105">
                  <Users className="mr-2 h-5 w-5" />
                  Learn About Culture
                </Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Company Culture Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-6">
                Our Culture
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                We believe in creating an environment where innovation thrives, collaboration flourishes, and every team member can reach their full potential.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {companyValues.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="text-center p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-[#3A0519] dark:text-[#A53860]" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                  </Card>
                )
              })}
            </div>

            {/* Benefits Section */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why Work With Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/20">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{benefit.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-24">
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-6">
                Open Positions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Join our team of talented developers, engineers, and innovators building the next generation of enterprise software.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Posted {job.posted}</div>
                        <div className="text-lg font-semibold text-[#3A0519] dark:text-[#A53860]">{job.salary}</div>
                      </div>
                    </div>
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.slice(0, 3).map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-[#A53860] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600 dark:text-slate-300">{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-sm text-slate-500 dark:text-slate-400">
                            +{job.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <span key={benefitIndex} className="px-3 py-1 bg-gradient-to-r from-[#3A0519]/10 to-[#A53860]/10 text-[#3A0519] dark:text-[#A53860] text-xs font-medium rounded-full">
                            {benefit}
                          </span>
                        ))}
                        {job.benefits.length > 3 && (
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full">
                            +{job.benefits.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        setSelectedJob(job.id)
                        setApplicationData(prev => ({ ...prev, position: job.title }))
                      }}
                      className="w-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Application Form Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                Apply for {jobOpenings.find(job => job.id === selectedJob)?.title}
              </CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Application Submitted!</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    Thank you for your interest. We&apos;ll review your application and get back to you soon.
                  </p>
                  <Button onClick={() => setSelectedJob(null)} className="bg-gradient-to-r from-[#3A0519] to-[#A53860] rounded-full">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-900 dark:text-white">Full Name *</Label>
                      <Input
                        id="name"
                        value={applicationData.name}
                        onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-900 dark:text-white">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-slate-900 dark:text-white">Phone Number</Label>
                      <Input
                        id="phone"
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-slate-900 dark:text-white">Years of Experience *</Label>
                      <Input
                        id="experience"
                        value={applicationData.experience}
                        onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter" className="text-slate-900 dark:text-white">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                      required
                      rows={4}
                      className="mt-1"
                      placeholder="Tell us why you&apos;re interested in this position and what you can bring to our team..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume" className="text-slate-900 dark:text-white">Resume/CV</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setApplicationData({...applicationData, resume: e.target.files?.[0] || null})}
                      className="mt-1"
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Accepted formats: PDF, DOC, DOCX (Max 10MB)
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedJob(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tech Stack Section */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-8">
              Technologies We Use
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
              Work with cutting-edge technologies and modern development practices.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              {techStack.map((tech, index) => {
                const IconComponent = tech.icon
                return (
                  <div key={index} className="flex items-center space-x-3 px-6 py-3 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-700/30">
                    <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860]" />
                    <span className="font-semibold text-slate-900 dark:text-white">{tech.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#3A0519] to-[#A53860] bg-clip-text text-transparent mb-6">
              Don&apos;t See Your Role?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              We&apos;re always looking for talented individuals. Send us your resume and let&apos;s discuss how you can contribute to our team.
            </p>
            <Button asChild size="lg" className="text-lg px-10 py-6 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link href="mailto:info@techxygen.net?subject=General Career Inquiry">
                <Mail className="mr-2 h-5 w-5" />
                Send Us Your Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
