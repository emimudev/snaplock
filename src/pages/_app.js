import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  const { session, ...restOfProps } = pageProps

  return (
    <SessionProvider session={session}>
      <Component {...restOfProps} />
    </SessionProvider>
  )
}
