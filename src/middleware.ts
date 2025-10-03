import { updateSession } from '@/lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Only run middleware for admin paths and the root to refresh session cookies
    '/',
    '/admin/:path*',
  ],
}
