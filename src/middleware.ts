import NextAuth, { NextAuthRequest } from 'next-auth'
import authConfig from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)
export default auth(async (req: NextAuthRequest) => {
  // Your custom middleware logic goes here
  console.log(req.auth)
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
