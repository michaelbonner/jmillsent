import { useState, useLayoutEffect, useMemo } from 'react'
import useClientOnly from './useClientOnly'
import useWindowSize from './useWindowSize'

function useIsResizedWindow() {
  const [isResizedWindow, setIsResizedWindow] = useState(false)
  const initialWindowSize = useMemo(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }
  }, [])
  const size = useWindowSize()
  const isClient = useClientOnly()

  useLayoutEffect(() => {
    if (!isClient) {
      return
    }

    if (initialWindowSize.width !== size.width) {
      setIsResizedWindow(true)
    }
  }, [isClient, initialWindowSize, size.width])

  return isResizedWindow
}

export default useIsResizedWindow
