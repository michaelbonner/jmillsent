import '../styles/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import LoadingAnimationProvider from '../context/LoadingAnimationContext'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return (
    <NuqsAdapter>
      <style jsx global>{`
        :root {
          --font-geist-sans: ${geistSans.style.fontFamily};
          --font-geist-mono: ${geistMono.style.fontFamily};
        }
      `}</style>
      <LoadingAnimationProvider>
        <Component key={router.asPath} {...pageProps} />
      </LoadingAnimationProvider>
    </NuqsAdapter>
  )
}

export default MyApp
