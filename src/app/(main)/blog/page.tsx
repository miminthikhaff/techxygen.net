import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PageContainer } from '@/components/ui/page-container'

// Mock blog posts data (replace with actual Supabase queries in production)
const blogPosts = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to performance optimization.',
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    slug: 'future-web-development-trends-2024',
    created_at: '2024-01-15T10:00:00Z',
    read_time: '5 min read'
  },
  {
    id: '2',
    title: 'Building Scalable Mobile Apps with React Native',
    excerpt: 'Learn best practices for creating scalable and maintainable mobile applications using React Native.',
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    slug: 'scalable-mobile-apps-react-native',
    created_at: '2024-01-10T14:30:00Z',
    read_time: '7 min read'
  },
  {
    id: '3',
    title: 'Cloud Architecture Patterns for Modern Applications',
    excerpt: 'Discover essential cloud architecture patterns that ensure your applications are scalable and resilient.',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    slug: 'cloud-architecture-patterns-modern-apps',
    created_at: '2024-01-05T09:15:00Z',
    read_time: '6 min read'
  }
]

export default function BlogPage() {
  return (
    <PageContainer className="py-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Tech That Breathes Life Into Your Strategy
        </h1>
        <p className="text-xl text-muted-foreground">
          Insights, tutorials, and thoughts on mission-critical technology and development practices.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2 group-hover:text-[#3A0519] dark:group-hover:text-[#A53860] transition-colors">
                {post.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.read_time}</span>
                </div>
              </div>
              
              <Button asChild variant="outline" className="w-full group">
                <Link href={`/blog/${post.slug}`}>
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-bold mb-4">Ready to Give Your Tech the Oxygen It Needs?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help bring your vision to life with mission-critical solutions that scale.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </div>
    </PageContainer>
  )
}
