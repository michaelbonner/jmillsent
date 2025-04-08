import '../styles/globals.css'

import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import LoadingAnimationProvider from '../context/LoadingAnimationContext'
import { NuqsAdapter } from 'nuqs/adapters/next/pages'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return (
    <NuqsAdapter>
      <LoadingAnimationProvider>
        <Component key={router.asPath} {...pageProps} />
      </LoadingAnimationProvider>
    </NuqsAdapter>
  )
}

export default MyApp
