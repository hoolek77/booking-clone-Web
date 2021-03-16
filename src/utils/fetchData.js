import axios from 'axios'
import { COOKIE_TOKEN } from '../constants'
import { getCookieValue } from './cookies'

export const fetchData = async (url, method, data = null) => {
  const config = {
    method: method,
    url: url,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  }

  if (data) {
    config['data'] = data
  }

  const token = getCookieValue(COOKIE_TOKEN)
  if (token) {
    config.headers['x-auth-token'] = token
    config.headers['Authorization'] = 'Bearer ' + token
  }

  try {
    const res = await axios(config)
    return res.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
