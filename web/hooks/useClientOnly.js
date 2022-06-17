import { useEffect, useState } from 'react'

function useClientOnly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [])

  return isClient
}
export default useClientOnly
