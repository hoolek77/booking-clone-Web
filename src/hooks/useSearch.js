import { useState } from 'react'
import axios from 'axios'

export const useSearch = () => {
  const [hotels, setHotels] = useState([])

  const search = async ({ city, startDate, endDate, adults, children }) => {
    const response = await axios.get(global.API_BASE_URL + 'api/hotels', {
      params: {
        city,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        adults,
        children,
      },
    })

    setHotels(response.data)
  }

  return [hotels, search]
}
