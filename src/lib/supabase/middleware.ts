import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Define admin routes early to avoid unnecessary auth calls for public pages
  const adminRoutes = ['/admin']
  const publicAdminRoutes = ['/admin/login']
  const { pathname } = request.nextUrl

  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isPublicAdminRoute = publicAdminRoutes.some(route => pathname.startsWith(route))

  if (isAdminRoute && !isPublicAdminRoute) {
    // Only fetch user/session for admin routes to reduce noisy fetches on public pages
    let user = null as { id: string } | null
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session) {
        user = null
      } else {
        const {
          data: { user: fetchedUser },
        } = await supabase.auth.getUser()
        user = fetchedUser
      }
    } catch {
      user = null
    }

    if (!user) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check if user has admin role (you can customize this logic)
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (!profile || !['super_admin', 'hr_admin', 'content_admin'].includes(profile.role)) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('error', 'insufficient_permissions')
      return NextResponse.redirect(loginUrl)
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely.

  return supabaseResponse
}


