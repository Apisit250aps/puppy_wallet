import NextAuth, { NextAuthRequest } from 'next-auth'
import authConfig from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)
export default auth(async (req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname
  if (pathname.startsWith('/login')) {
    if (req.auth) {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
