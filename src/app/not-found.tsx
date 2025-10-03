import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-[#3A0519] dark:text-[#A53860] mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or doesn&apos;t exist.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
