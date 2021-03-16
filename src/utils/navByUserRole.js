import { ADMIN_ROLE, HOTEL_OWNER_ROLE, USER_ROLE } from '../constants'

export const navByUserRole = (userRole) => {
  switch (userRole) {
    case USER_ROLE:
      window.location.href = '/'
      break
    case HOTEL_OWNER_ROLE:
      window.location.href = '/hotelOwner'
      break
    case ADMIN_ROLE:
      window.location.href = '/admin'
      break
    default:
      window.location.href = '/'
      break
  }
}
