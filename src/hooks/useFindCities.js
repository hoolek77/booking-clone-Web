import { useEffect, useState } from 'react'
import { fetchData } from '../utils'

export const useFindCities = () => {
  const [cities, setCities] = useState([])
  const [isPending, setIsPending] = useState(true)
  const findCities = async () => {
    try {
      const cities = await fetchData(global.API_BASE_URL + 'api/cities', 'GET')
      setCities(cities)
      setIsPending(false)
    } catch (err) {
      alert(err)
    }
  }
  useEffect(() => {
    findCities()
  }, [])

  return [cities, isPending]
}
