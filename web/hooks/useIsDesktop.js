import { useWindowSize } from '@uidotdev/usehooks'
import { useMemo } from 'react'

function useIsDesktop() {
  const size = useWindowSize()

  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return null
    if (!size?.width) return null

    if (size.width >= 1024) {
      return true
    } else if (size.width > 0) {
      return false
    }
  }, [size?.width])

  return isDesktop
}
export default useIsDesktop
