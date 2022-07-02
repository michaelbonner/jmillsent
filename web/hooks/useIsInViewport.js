import { useEffect, useMemo, useState } from 'react'

export const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null
    return new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        threshold: 1,
      }
    )
  }, [])

  useEffect(() => {
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}
