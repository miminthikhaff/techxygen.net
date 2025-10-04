'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, ArrowRight, Globe, Shield, Award, Users, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageContainer } from '@/components/ui/page-container'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  const enterpriseLinks = {
    solutions: [
      { name: 'Enterprise Software', href: '/enterprise-software' },
      { name: 'Cloud Migration', href: '/cloud-migration' },
      { name: 'DevOps & CI/CD', href: '/devops' },
      { name: 'Data Analytics', href: '/data-analytics' },
      { name: 'AI/ML Integration', href: '/ai-ml' },
      { name: 'Security Solutions', href: '/security' }
    ],
    industries: [
      { name: 'Financial Services', href: '/industries/finance' },
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'E-commerce', href: '/industries/ecommerce' },
      { name: 'Manufacturing', href: '/industries/manufacturing' },
      { name: 'Government', href: '/industries/government' },
      { name: 'Education', href: '/industries/education' }
    ],
    resources: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'White Papers', href: '/white-papers' },
      { name: 'Technical Blog', href: '/blog' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Support Center', href: '/support' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Leadership Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Contact', href: '/contact' }
    ]
  }

  const certifications = [
    { name: 'SOC 2 Type II', icon: Shield },
    { name: 'ISO 27001', icon: Award },
    { name: 'AWS Partner', icon: Globe },
    { name: 'Microsoft Gold', icon: Building }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-pink-950/30 border-t border-slate-200/50 dark:border-slate-800/50">
      <PageContainer>
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center mb-6 group">
                <div className="h-12 w-40 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/techxygen-logo.svg"
                    alt="TechXygen Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </Link>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-md">
                Premier enterprise software development company delivering scalable, secure, and mission-critical solutions for global organizations. 
                <span className="font-semibold text-slate-900 dark:text-white"> Colombo-based</span> with 
                <span className="font-semibold text-slate-900 dark:text-white"> worldwide reach</span>.
              </p>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Certifications & Compliance</h4>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, index) => {
                    const IconComponent = cert.icon
                    return (
                      <div key={index} className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                        <IconComponent className="h-3 w-3 text-[#3A0519] dark:text-[#A53860]" />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{cert.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://linkedin.com/company/techxygen" className="h-10 w-10 rounded-xl bg-[#EF88AD]/20 dark:bg-[#3A0519]/30 flex items-center justify-center text-[#3A0519] dark:text-[#A53860] hover:bg-[#EF88AD]/30 dark:hover:bg-[#3A0519]/50 hover:scale-110 transition-all duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/techxygen" className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:scale-110 transition-all duration-300">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com/techxygen" className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:scale-110 transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Globe className="h-4 w-4 text-[#3A0519] dark:text-[#A53860] mr-2" />
                Solutions
              </h3>
              <ul className="space-y-3">
                {enterpriseLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors duration-200 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Building className="h-4 w-4 text-[#670D2F] dark:text-[#EF88AD] mr-2" />
                Industries
              </h3>
              <ul className="space-y-3">
                {enterpriseLinks.industries.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors duration-200 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Award className="h-4 w-4 text-[#A53860] dark:text-[#EF88AD] mr-2" />
                Resources
              </h3>
              <ul className="space-y-3">
                {enterpriseLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors duration-200 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                <Users className="h-4 w-4 text-[#3A0519] dark:text-[#A53860] mr-2" />
                Company
              </h3>
              <ul className="space-y-3">
                {enterpriseLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-600 dark:text-slate-300 hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors duration-200 text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Stay Updated with Enterprise Insights
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Get the latest enterprise technology trends, case studies, and technical insights delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:border-[#A53860] focus:ring-[#A53860]/20"
                required
              />
              <Button type="submit" className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-xl px-8 h-12">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-12 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#3A0519]/10 to-[#A53860]/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-[#3A0519] dark:text-[#A53860]" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Email</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">info@techxygen.net</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#670D2F]/10 to-[#EF88AD]/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-[#670D2F] dark:text-[#EF88AD]" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Hotline</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">+94 11 234 5678</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#A53860]/10 to-[#EF88AD]/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#A53860] dark:text-[#EF88AD]" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Colombo, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                &copy; 2024 TechXygen. All rights reserved. | 
                <Link href="/privacy" className="hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors ml-1">Privacy Policy</Link> | 
                <Link href="/terms" className="hover:text-[#3A0519] dark:hover:text-[#A53860] transition-colors ml-1">Terms of Service</Link>
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center">
                <Shield className="h-4 w-4 text-[#3A0519] dark:text-[#A53860] mr-2" />
                SOC 2 Type II Certified
              </span>
              <span className="flex items-center">
                <Award className="h-4 w-4 text-[#670D2F] dark:text-[#EF88AD] mr-2" />
                ISO 27001 Compliant
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  )
}