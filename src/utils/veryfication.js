import { ADMIN_ROLE, COOKIE_TOKEN, HOTEL_OWNER_ROLE } from '../constants'
import { getCookieValue } from './cookies'
import { getUserInfo } from './userInfo'

const getRoleFromLS = () => {
  const token = getCookieValue(COOKIE_TOKEN)
  if (!token) return false

  const data = getUserInfo()
  if (!data) return false

  const { role } = data
  return role
}

export const isHotelOwner = () => {
  const role = getRoleFromLS()
  return role === HOTEL_OWNER_ROLE
}

export const isAdmin = () => {
  const role = getRoleFromLS()
  return role == ADMIN_ROLE
}

export const isUserLoggedIn = () => {
  const token = getCookieValue(COOKIE_TOKEN)
  if (!token) return false

  const data = getUserInfo()
  if (!data) return false

  return true
}
