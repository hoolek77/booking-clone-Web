import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core'
import { fetchData } from '../../../utils'
import useNotification from '../../../hooks/useNotification'

export const GetCities = ({ columns, useStyles }) => {
  const { openNotification } = useNotification()
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
      openNotification(err.message, 'error')
    }
  }

  useEffect(() => {
    getCities()
  }, [])

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
