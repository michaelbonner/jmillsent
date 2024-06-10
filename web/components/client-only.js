import { useMemo } from 'react'

export const ClientOnly = ({ children }) => {
  const isClient = useMemo(() => {
    if (typeof window === 'undefined') return null

    return true
  }, [])

  if (!isClient) return null
  return children
}
