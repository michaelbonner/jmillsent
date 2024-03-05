import { useEffect, useState } from 'react'
import useClientOnly from './useClientOnly'
import useWindowSize from './useWindowSize'

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(null)
  const size = useWindowSize()
  const isClient = useClientOnly()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!isClient) {
      return
    }

    if (size.width >= 1024) {
      setIsDesktop(true)
    } else if (size.width > 0) {
      setIsDesktop(false)
    }
  }, [isClient, size.width])

  return isDesktop
}
export default useIsDesktop
