import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useClientOnly from '../hooks/useClientOnly'
import TagManager from 'react-gtm-module'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [visitSession, setVisitSession] = useState(false)
  const isClient = useClientOnly()

  useEffect(() => {
    if (isClient) {
      const visit = sessionStorage.getItem('visitSession')
      if (!visit) {
        sessionStorage.setItem('visitSession', true)
      }

      if (visit) {
        setVisitSession(true)
      }
    }
  }, [isClient, router])

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return (
    <Component {...pageProps} key={router.asPath} visitSession={visitSession} />
  )
}

export default MyApp
