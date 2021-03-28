import React, { useEffect, useState } from 'react'
import { HotelCard } from '../../HotelCard'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { useSearch } from '../../../hooks'

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.secondary.main,
  },
  container: {
    padding: 20,
  },
}))

export const Hotels = ({ match, location }) => {
  const classes = useStyles()
  const [hotels, search] = useSearch()
  const [loading, setLoading] = useState(false)

  let data = location.state ? location.state : { city: match.params.data }
  data = !data.startDate && data.city === 'Anywhere' ? '' : data

  const calculateDays = () => {
    return data.startDate
      ? (new Date(data.endDate).getTime() -
          new Date(data.startDate).getTime()) /
          (24 * 3600 * 1000)
      : 1
  }
  useEffect(() => {
    search(data, setLoading)
  }, [])

  return (
    <div className={classes.container}>
      {loading ? (
        <CircularProgress
          className={classes.center}
          style={{ width: '70px', height: '70px' }}
        />
      ) : hotels.hotels?.length > 0 ? (
        <>
          <h1>{data.city ? data.city : ' Anywhere'}</h1>
          {hotels.hotels.map((hotel) => {
            const days = calculateDays()
            return <HotelCard hotel={hotel} days={days} />
          })}
        </>
      ) : (
        <h1>No hotels found in {data.city}</h1>
      )}
    </div>
  )
}
