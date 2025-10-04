'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/page-container'
import Image from 'next/image'
import { Menu, Search, ChevronDown, Globe, Shield, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

const enterpriseFeatures = [
  { name: 'Enterprise Solutions', href: '/enterprise', icon: Shield },
  { name: 'Case Studies', href: '/case-studies', icon: Award },
  { name: 'Global Services', href: '/global', icon: Globe },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showEnterpriseMenu, setShowEnterpriseMenu] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 bg-transparent`}>
      <PageContainer>
        <div
          className={`flex items-center justify-between rounded-xl px-3 sm:px-5 ${
            isScrolled
              ? 'py-2 shadow-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50'
              : 'py-3 shadow-none bg-transparent border border-transparent backdrop-blur-0'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="h-12 w-40 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/techxygen-logo.svg"
                alt="TechXygen Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#3A0519] to-[#A53860] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
            
            {/* Enterprise Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                onMouseEnter={() => setShowEnterpriseMenu(true)}
                onMouseLeave={() => setShowEnterpriseMenu(false)}
              >
                <span>Enterprise</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {showEnterpriseMenu && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-xl py-2"
                  onMouseEnter={() => setShowEnterpriseMenu(true)}
                  onMouseLeave={() => setShowEnterpriseMenu(false)}
                >
                  {enterpriseFeatures.map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                      >
                        <IconComponent className="h-4 w-4 text-[#3A0519] dark:text-[#A53860]" />
                        <span>{feature.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>


            {/* CTA Button */}
            <Button asChild className="bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) setQuery('') } }>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-l border-slate-200/50 dark:border-slate-700/50">
              <SheetTitle className="sr-only">Main navigation</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-700/50 px-4 pr-12">
                  <div className="flex items-center">
                  <div className="h-10 w-40 rounded-lg overflow-hidden">
                    <Image
                      src="/techxygen-logo.svg"
                      alt="TechXygen Logo"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="sr-only">TechXygen</span>
                  </div>
                </div>

                {/* Mobile Search */}
                <div className="relative px-4">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search..."
                    aria-label="Search navigation"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    className="pl-12 bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50"
                  />
                </div>

                {/* Navigation Links */}
                {(navigation.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {navigation.filter(i => i.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                  <div className="px-4 text-sm text-slate-500">No matches</div>
                )}

                {/* Enterprise Features */}
                <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-4">
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 px-4">Enterprise</h4>
                  {(enterpriseFeatures.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))).map((feature) => {
                    const IconComponent = feature.icon
                    return (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComponent className="h-4 w-4 text-[#3A0519] dark:text-[#A53860]" />
                        <span>{feature.name}</span>
                      </Link>
                    )
                  })}
                  {enterpriseFeatures.filter(f => f.name.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                    <div className="px-4 text-sm text-slate-500">No enterprise matches</div>
                  )}
                </div>

                <Button asChild className="mt-4 mx-4 bg-gradient-to-r from-[#3A0519] to-[#A53860] hover:from-[#670D2F] hover:to-[#EF88AD] rounded-full shadow-lg">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="Search for solutions, technologies, or case studies..."
                  className="pl-10 pr-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 rounded-xl"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </nav>
  )
}
