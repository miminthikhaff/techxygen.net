import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { About } from '@/components/about'
import { Portfolio } from '@/components/portfolio'
import { PageContainer } from '@/components/ui/page-container'

// Mock data for development (replace with actual Supabase queries in production)
const mockServices = [
  {
    id: '1',
    title: 'Full-Stack Development',
    description: 'React, Angular, Vue.js frontend development with Node.js, Python, Java Spring Boot, and .NET Core backend services',
    icon: 'Globe',
    features: ['React/Next.js', 'Spring Boot', 'RESTful APIs', 'GraphQL'],
    progress: 95
  },
  {
    id: '2',
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, GCP deployment with Docker, Kubernetes, Terraform, and Jenkins CI/CD pipeline automation',
    icon: 'Cloud',
    features: ['AWS/Azure/GCP', 'Kubernetes', 'Docker', 'Jenkins/GitLab CI'],
    progress: 88
  },
  {
    id: '3',
    title: 'Database & Backend',
    description: 'PostgreSQL, MongoDB, Redis implementation with microservices architecture and API gateway integration',
    icon: 'Palette',
    features: ['PostgreSQL', 'MongoDB', 'Redis', 'Microservices'],
    progress: 92
  },
  {
    id: '4',
    title: 'Security & Compliance',
    description: 'OAuth 2.0, JWT authentication, SSL/TLS encryption, and SOC 2 Type II compliance implementation',
    icon: 'Smartphone',
    features: ['OAuth 2.0', 'JWT', 'SSL/TLS', 'SOC 2 Compliance'],
    progress: 100
  }
]

// Team section removed

const mockProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'React frontend with Node.js/Express backend, PostgreSQL database, Stripe payment integration, and AWS deployment with Docker containers',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
    live_url: 'https://example-ecommerce.com',
    github_url: 'https://github.com/techxygen/ecommerce'
  },
  {
    id: '2',
    title: 'SaaS Dashboard',
    description: 'Angular SPA with Java Spring Boot REST API, MongoDB database, JWT authentication, and Azure cloud deployment with CI/CD pipeline',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Angular', 'Spring Boot', 'MongoDB', 'Azure'],
    live_url: 'https://example-saas.com',
    github_url: 'https://github.com/techxygen/saas-dashboard'
  },
  {
    id: '3',
    title: 'Mobile Banking App',
    description: 'React Native cross-platform app with .NET Core Web API, SQL Server database, OAuth 2.0 authentication, and Kubernetes deployment',
    image_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    technologies: ['React Native', '.NET Core', 'SQL Server', 'OAuth 2.0'],
    live_url: 'https://apps.apple.com/example',
    github_url: 'https://github.com/techxygen/banking-app'
  }
]

export default function Home() {
  return (
    <>
      <Hero />
      <PageContainer>
        <Services services={mockServices} />
        <About />
        <Portfolio projects={mockProjects} />
      </PageContainer>
    </>
  )
}
