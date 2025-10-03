'use client'

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, Shield, Award, Globe, Calendar, ArrowRight, Building, MessageSquare } from 'lucide-react'
import { FormSubmissionLoading, ButtonLoading } from '@/components/ui/form-loading'
import { PageContainer } from '@/components/ui/page-container'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    role: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  const projectTypes = [
    'Web Application',
    'Mobile App',
    'Enterprise Software',
    'Cloud Migration',
    'DevOps & CI/CD',
    'Data Analytics',
    'AI/ML Integration',
    'Other'
  ]

  const budgetRanges = [
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K - $250K',
    '$250K+',
    'To be discussed'
  ]

  const timelineOptions = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '12+ months',
    'Flexible'
  ]

  const enterpriseFeatures = [
    { label: '24/7 Support', value: 'Enterprise SLA', icon: Clock },
    { label: 'Dedicated Team', value: '12+ Experts', icon: Users },
    { label: 'Security', value: 'SOC 2 Type II', icon: Shield },
    { label: 'Certifications', value: 'ISO 27001', icon: Award },
    { label: 'Global Reach', value: '8 Countries', icon: Globe }
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
      
      // Reset form
      setFormData({ 
        name: '', 
        email: '', 
        company: '', 
        phone: '',
        role: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '' 
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Form submission error:', error)
      // You could add error state handling here
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.company
      case 2:
        return formData.projectType && formData.budget && formData.timeline
      case 3:
        return formData.message
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-20 w-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#3A0519] to-[#A53860] flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
              Enterprise Consultation Requested!
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Thank you for your interest in our enterprise solutions. Our technical team will review your requirements and get back to you within 24 hours with a comprehensive proposal.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <Clock className="h-8 w-8 text-[#3A0519] dark:text-[#A53860] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Within 24 hours</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <Users className="h-8 w-8 text-[#670D2F] dark:text-[#EF88AD] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Technical consultation call</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50">
                <Award className="h-8 w-8 text-[#A53860] dark:text-[#EF88AD] mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Proposal</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Detailed project plan</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)} className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-8 py-3">
                Submit Another Request
              </Button>
              <Button variant="outline" className="border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] rounded-full px-8 py-3">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/50 via-white to-pink-50/30 dark:from-slate-950/50 dark:via-slate-900 dark:to-pink-950/30">
      <FormSubmissionLoading isSubmitting={isSubmitting} message="Submitting your enterprise consultation request..." />
      <PageContainer className="py-24">
        <div className="max-w-6xl mx-auto">
          {/* Enterprise Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center rounded-full border border-[#A53860]/50 bg-[#EF88AD]/10 dark:border-[#A53860]/50 dark:bg-[#3A0519]/20 backdrop-blur-sm px-6 py-3 text-sm font-medium mb-8">
              <span className="h-2 w-2 bg-[#A53860] rounded-full mr-3 animate-pulse"></span>
              Enterprise Consultation Request
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Ready for Enterprise Solutions?
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
              Let&apos;s discuss your enterprise requirements and design a comprehensive technology strategy. We deliver 
              <span className="font-semibold text-slate-900 dark:text-white"> scalable</span>, 
              <span className="font-semibold text-slate-900 dark:text-white"> secure</span>, and 
              <span className="font-semibold text-slate-900 dark:text-white"> mission-critical</span> solutions for global enterprises.
            </p>
          </div>

          {/* Enterprise Features */}
          <div className={`grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {enterpriseFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="group p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center">
                  <IconComponent className="h-6 w-6 text-[#3A0519] dark:text-[#A53860] mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{feature.value}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">{feature.label}</div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Multi-Step Enterprise Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
                <CardHeader className="pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-[#3A0519] dark:from-white dark:to-[#A53860] bg-clip-text text-transparent">
                      Enterprise Consultation
                    </CardTitle>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Step {currentStep} of 3
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-[#3A0519] to-[#A53860] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                  </div>
                  
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-lg">
                    {currentStep === 1 && "Let's start with your basic information and company details."}
                    {currentStep === 2 && "Tell us about your project requirements and timeline."}
                    {currentStep === 3 && "Share your project details and any specific requirements."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder="Your full name"
                              className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder="your@company.com"
                              className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="company" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name *</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              required
                              placeholder="Your company name"
                              className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+1 (555) 123-4567"
                              className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="role" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Role</Label>
                          <Input
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g., CTO, Project Manager, Business Owner"
                            className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Project Requirements */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Type *</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {projectTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, projectType: type }))}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                                  formData.projectType === type
                                    ? 'border-[#A53860] bg-[#A53860]/10 text-[#3A0519] dark:text-[#A53860]'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-[#A53860]/50'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Budget Range *</Label>
                            <div className="space-y-2">
                              {budgetRanges.map((range) => (
                                <button
                                  key={range}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, budget: range }))}
                                  className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                                    formData.budget === range
                                      ? 'border-[#A53860] bg-[#A53860]/10 text-[#3A0519] dark:text-[#A53860]'
                                      : 'border-slate-200 dark:border-slate-700 hover:border-[#A53860]/50'
                                  }`}
                                >
                                  {range}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Timeline *</Label>
                            <div className="space-y-2">
                              {timelineOptions.map((timeline) => (
                                <button
                                  key={timeline}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, timeline: timeline }))}
                                  className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                                    formData.timeline === timeline
                                      ? 'border-[#A53860] bg-[#A53860]/10 text-[#3A0519] dark:text-[#A53860]'
                                      : 'border-slate-200 dark:border-slate-700 hover:border-[#A53860]/50'
                                  }`}
                                >
                                  {timeline}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Project Details */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Details *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Please describe your project in detail, including:
• Business objectives and goals
• Technical requirements and constraints
• Integration needs with existing systems
• Security and compliance requirements
• Expected user base and scalability needs
• Any specific technologies or platforms preferred"
                            rows={8}
                            className="rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20 transition-all duration-200 resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] rounded-full px-6"
                      >
                        Previous
                      </Button>
                      
                      {currentStep < 3 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!isStepValid(currentStep)}
                          className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6"
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <ButtonLoading
                          isLoading={isSubmitting}
                          loadingText="Submitting..."
                          className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6"
                        >
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Request
                          </div>
                        </ButtonLoading>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enterprise Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Building className="h-5 w-5 text-[#3A0519] dark:text-[#A53860] mr-2" />
                    Enterprise Contact
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    Direct access to our enterprise team and technical experts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-[#3A0519] dark:text-[#A53860]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Enterprise Email</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">info@techxygen.net</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">General Inquiries & Client Support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#670D2F]/10 to-[#EF88AD]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-[#670D2F] dark:text-[#EF88AD]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Enterprise Hotline</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">+94 11 234 5678</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">24/7 Enterprise Support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#A53860]/10 to-[#EF88AD]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-[#A53860] dark:text-[#EF88AD]" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Global Headquarters</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Level 15, World Trade Center<br />
                        Colombo 01, Sri Lanka
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enterprise clients welcome</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#EF88AD]/10 to-[#3A0519]/10 dark:from-[#EF88AD]/5 dark:to-[#3A0519]/20 backdrop-blur-sm border border-[#A53860]/50 dark:border-[#A53860]/30 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                    <Clock className="h-5 w-5 text-[#3A0519] dark:text-[#A53860] mr-2" />
                    Enterprise SLA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Initial Response</span>
                      <span className="text-[#3A0519] dark:text-[#A53860] font-semibold">Within 4 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Technical Assessment</span>
                      <span className="text-[#670D2F] dark:text-[#EF88AD] font-semibold">Within 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Proposal Delivery</span>
                      <span className="text-[#A53860] dark:text-[#EF88AD] font-semibold">Within 48 hours</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Project Kickoff</span>
                      <span className="text-[#3A0519] dark:text-[#A53860] font-semibold">Within 1 week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center">
                    <MessageSquare className="h-5 w-5 text-[#3A0519] dark:text-[#A53860] mr-2" />
                    Alternative Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-xl">
                    <a href="mailto:enterprise@techxygen.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-2 border-[#A53860] text-[#3A0519] hover:bg-[#A53860] hover:text-white dark:border-[#EF88AD] dark:text-[#EF88AD] dark:hover:bg-[#EF88AD] dark:hover:text-[#3A0519] rounded-xl">
                    <a href="tel:+94112345678">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
