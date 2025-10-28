import { useEffect, useState } from 'react'

function useIsLoggedIn(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setIsLoggedIn(localStorage.getItem('private-portfolio') === token)
      }, 0)
    }
  }, [token])
  return [isLoggedIn, setIsLoggedIn]
}
export default useIsLoggedIn
