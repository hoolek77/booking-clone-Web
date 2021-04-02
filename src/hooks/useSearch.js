import { useState } from 'react'
import axios from 'axios'
import { DEFAULT_PAGE_SIZE } from '../constants/'

export const useSearch = () => {
  const [hotels, setHotels] = useState([])

  const search = async (
    { city, startDate, endDate, adults, children, pageNumber },
    setLoading,
    available = false
  ) => {
    let data = {}
    if (!startDate || !endDate) {
      data = {
        city,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      }
    } else {
      data = {
        city,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        adults,
        children,
        pageSize: DEFAULT_PAGE_SIZE,
        pageNumber,
      }
    }

    try {
      setLoading(true)

      const ENDPOINT = available ? 'api/hotels/getAvailable' : 'api/hotels'
      const response = await axios.get(global.API_BASE_URL + ENDPOINT, {
        params: data,
      })

      setHotels(response.data)
      setLoading(false)
    } catch (ex) {
      alert(ex.message)
    }
  }

  return [hotels, search]
}
