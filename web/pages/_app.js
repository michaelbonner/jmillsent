import '../styles/globals.css'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return <Component {...pageProps} key={router.asPath} />
}

export default MyApp
