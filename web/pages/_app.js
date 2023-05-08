import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import useClientOnly from '../hooks/useClientOnly'
import TagManager from 'react-gtm-module'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [firstLanding, setFirstLanding] = useState(false)
  const isClient = useClientOnly()

  useEffect(() => {
    if (isClient) {
      const visit = sessionStorage.getItem('firstLanding')
      if (!visit) {
        sessionStorage.setItem('firstLanding', true)
      }

      if (visit) {
        setFirstLanding(true)
      }
    }
  }, [isClient, router])

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-N25KK2B' })
  }, [])

  return (
    <Component {...pageProps} key={router.asPath} firstLanding={firstLanding} />
  )
}

export default MyApp
