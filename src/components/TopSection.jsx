import React, { useMemo, useState } from 'react'
import { COOKIE_TOKEN } from '../constants'
import { getCookieValue, getUserInfo } from '../utils'
import { Login } from './Login'

export const TopSection = () => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useMemo(() => {
    const token = getCookieValue(COOKIE_TOKEN)
    if (token) {
      const data = getUserInfo()
      if (data) {
        setUserInfo(data)
        setIsLoggedIn(true)
      }
    }
  }, [])

  return (
    <div id="TopSection">
      <div>Booking Clone</div>
      {isLoggedIn ? (
        <div>
          Willkommen {userInfo.firstName} {userInfo.lastName} !
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}
