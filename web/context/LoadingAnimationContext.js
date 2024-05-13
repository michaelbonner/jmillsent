import { createContext, useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import useClientOnly from 'hooks/useClientOnly'

export const LoadingAnimationContext = createContext({
  showLoadingAnimation: true,
  setIsAnimationComplete: () => {},
  setIsOverlayVisible: () => {},
  isOverlayVisible: true,
  isAnimationComplete: false,
})

const LoadingAnimationProvider = ({ children }) => {
  const router = useRouter()
  const isClient = useClientOnly()
  const [hasVisitedAnyPage, setHasVisitedAnyPage] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isOverlayVisible, setIsOverlayVisible] = useState(true)
  const showLoadingAnimation = useMemo(() => {
    if (isAnimationComplete) {
      return false
    }
    if (router.asPath === '/') {
      return true
    }
    return !hasVisitedAnyPage
  }, [hasVisitedAnyPage, router.asPath, isAnimationComplete])

  useEffect(() => {
    setIsOverlayVisible(false)
  }, [router.asPath])

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        setHasVisitedAnyPage(true)
      }, 4000)
    }
  }, [isClient])

  useEffect(() => {
    const handleRouteChange = (url) => {
      const baseUrl = url.split('?')[0]
      const basePath = router.asPath.split('?')[0]

      if (baseUrl === basePath) return

      if (url === '/' || url === '/about' || url === '/studio') {
        setIsAnimationComplete(false)
      }
      setIsOverlayVisible(true)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <LoadingAnimationContext.Provider
      value={{
        setIsAnimationComplete,
        showLoadingAnimation,
        setIsOverlayVisible,
        isOverlayVisible,
        isAnimationComplete,
      }}
    >
      {children}
    </LoadingAnimationContext.Provider>
  )
}

export default LoadingAnimationProvider
