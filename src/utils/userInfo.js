import { LS_USER } from '../constants'
import { fetchData } from './fetchData'

export const loadUserInfo = async () => {
  const data = await fetchData(global.API_BASE_URL + 'api/user/me', 'GET')
  localStorage.setItem(LS_USER, JSON.stringify(data))
}

export const getUserInfo = () => {
  const lsData = localStorage.getItem(LS_USER)
  if (!lsData) return false

  const data = JSON.parse(lsData)
  return data
}
