import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="overflow-hidden dark:bg-zinc-900 dark:text-white">
        <Script id="load-theme" strategy="beforeInteractive">
          {`if ( localStorage.getItem('color-theme') === 'dark' ||
              (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
          }`}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
