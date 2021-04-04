import { useEffect, useState } from 'react'
import { getUserInfo, isUserLoggedIn } from '../utils'

export const useUserStatus = () => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const isLogged = isUserLoggedIn()
    if (isLogged) {
      const data = getUserInfo()
      setUserInfo(data)
      setIsLoggedIn(true)
    }
  }, [])

  return [isLoggedIn, userInfo]
}
