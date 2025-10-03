import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { PageContainer } from '@/components/ui/page-container'
import Link from 'next/link'

// Mock blog post data (replace with actual Supabase queries in production)
const blogPosts = {
  'future-web-development-trends-2024': {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    content: `
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies. As we look ahead, several key areas are shaping the future of how we build and deploy web applications.</p>
      
      <h2>AI Integration in Development</h2>
      <p>Artificial Intelligence is becoming increasingly integrated into the development workflow. From code generation tools to automated testing, AI is helping developers work more efficiently and create better applications.</p>
      
      <h2>Performance Optimization</h2>
      <p>With users expecting faster load times and better performance, optimization techniques like code splitting, lazy loading, and edge computing are becoming standard practices.</p>
      
      <h2>Modern Frameworks and Tools</h2>
      <p>Frameworks like Next.js, React, and Vue continue to evolve, offering better developer experiences and improved performance out of the box.</p>
      
      <h2>Conclusion</h2>
      <p>Staying ahead of these trends is crucial for any development team looking to deliver cutting-edge web applications. By embracing these technologies and practices, we can build better, faster, and more user-friendly applications.</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    created_at: '2024-01-15T10:00:00Z',
    read_time: '5 min read'
  },
  'scalable-mobile-apps-react-native': {
    id: '2',
    title: 'Building Scalable Mobile Apps with React Native',
    content: `
      <p>React Native has revolutionized mobile app development by allowing developers to build cross-platform applications with a single codebase. However, building scalable applications requires careful planning and best practices.</p>
      
      <h2>Architecture Patterns</h2>
      <p>Implementing proper architecture patterns like Redux for state management and modular component design ensures your app can grow without becoming unmaintainable.</p>
      
      <h2>Performance Optimization</h2>
      <p>Optimizing bundle size, implementing lazy loading, and using native modules where appropriate can significantly improve app performance.</p>
      
      <h2>Testing Strategies</h2>
      <p>Comprehensive testing, including unit tests, integration tests, and end-to-end testing, is essential for maintaining code quality as your app scales.</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    created_at: '2024-01-10T14:30:00Z',
    read_time: '7 min read'
  },
  'cloud-architecture-patterns-modern-apps': {
    id: '3',
    title: 'Cloud Architecture Patterns for Modern Applications',
    content: `
      <p>Modern applications require robust, scalable cloud architectures that can handle varying loads and provide high availability. Understanding common patterns is key to building successful cloud-native applications.</p>
      
      <h2>Microservices Architecture</h2>
      <p>Breaking down monolithic applications into smaller, independent services allows for better scalability and maintainability.</p>
      
      <h2>Event-Driven Architecture</h2>
      <p>Using events to communicate between services creates loosely coupled systems that can scale independently.</p>
      
      <h2>Container Orchestration</h2>
      <p>Tools like Kubernetes provide powerful orchestration capabilities for managing containerized applications at scale.</p>
    `,
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    created_at: '2024-01-05T09:15:00Z',
    read_time: '6 min read'
  }
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <PageContainer className="py-24">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-muted-foreground mb-6">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.read_time}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="prose prose-gray max-w-none p-8">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4"
            />
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6">
            Let&apos;s discuss how we can help bring your vision to life with our premium tech solutions.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
