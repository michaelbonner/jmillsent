import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import LoadingAnimationProvider from '../context/LoadingAnimationContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return (
    <LoadingAnimationProvider>
      <Component {...pageProps} key={router.asPath} />
    </LoadingAnimationProvider>
  )
}

export default MyApp
