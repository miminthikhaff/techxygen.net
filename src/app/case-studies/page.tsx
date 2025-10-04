import { Portfolio } from '@/components/portfolio'
import { PageContainer } from '@/components/ui/page-container'

// TODO: Replace with Supabase fetch. Using the same mock projects for now.
const projects = [
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

export default function CaseStudiesPage() {
  return (
    <PageContainer>
      <Portfolio projects={projects} />
    </PageContainer>
  )
}


