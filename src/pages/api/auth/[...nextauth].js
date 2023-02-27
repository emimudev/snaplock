import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

/**
 * @type {import('next-auth').NextAuthOptions}
 */
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
    // ...more providers here
  ]
}

export default NextAuth(authOptions)
