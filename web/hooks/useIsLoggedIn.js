import { useEffect, useState } from 'react'

function useIsLoggedIn(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem('private-portfolio') === token)
    }
  }, [token])
  return [isLoggedIn, setIsLoggedIn]
}
export default useIsLoggedIn
