import { useState } from 'react'
import axios from 'axios'

export const useSearch = () => {
  const [hotels, setHotels] = useState([])

  const search = async (
    { city, startDate, endDate, adults, children },
    setLoading
  ) => {
    let data = {}
    if (!startDate || !endDate) {
      data = {
        city,
      }
    } else {
      data = {
        city,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        adults,
        children,
      }
    }

    try {
      setLoading(true)
      const response = await axios.get(global.API_BASE_URL + 'api/hotels', {
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
