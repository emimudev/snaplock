import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

/**
 * @param {import('next/server').NextRequest} req
 */
export default async function middleware(req) {
  const session = await getToken({ req, secret: NEXTAUTH_SECRET, raw: true })

  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/overview', req.url))
  }

  if (!session && req.nextUrl.pathname !== '/') {
    console.log(`redirecting from ${req.nextUrl.pathname} to / `)
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}
