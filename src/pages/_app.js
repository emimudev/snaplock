import ThemeContextProvider from '@/context/themeContext'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const { session, ...restOfProps } = pageProps
  const user = session?.user
  const getLayout = Component.getLayout || (({ page }) => page)
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Snaplock</title>
        <meta name="description" content="Save and share your photos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>
        {`
          html,
          body,
          p {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <ThemeContextProvider>
        {getLayout({
          page: <Component {...restOfProps} />,
          props: { user, ...restOfProps }
        })}
      </ThemeContextProvider>
    </SessionProvider>
  )
}
