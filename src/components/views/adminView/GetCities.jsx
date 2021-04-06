import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core'

export const GetCities = ({ columns, useStyles }) => {
  const [cities, setCities] = useState([])
  const [pending, setPending] = useState(true)

  const classes = useStyles()

  const getNeededCityData = (data) => {
    return data.map((city) => {
      return {
        id: city._id,
        cityName: city.name,
      }
    })
  }

  const getCities = async () => {
    try {
      setPending(true)
      const data = await fetchData(global.API_BASE_URL + 'api/cities', 'GET')
      if (data) {
        setCities(getNeededCityData(data))
        setPending(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCities()
  }, [])
  console.log(cities)
  return (
    <div className={classes.centerItems}>
      {pending ? (
        <CircularProgress />
      ) : (
        <DataGrid
          columns={columns}
          rows={cities}
          height="90%"
          className="tableGrid"
          pageSize={8}
        />
      )}
    </div>
  )
}
