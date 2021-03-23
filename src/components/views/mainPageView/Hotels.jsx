import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSearch } from '../../../hooks/useSearch'
const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.secondary.main,
  },
}))

export const Hotels = ({ match, location }) => {
  const classes = useStyles()
  const [hotels, search] = useSearch()
  const [loading, setLoading] = useState(false)
  let data = location.state ? location.state : { city: match.params.data }
  data = !data.startDate && data.city === 'Anywhere' ? '' : data
  useEffect(() => {
    search(data, setLoading)
  }, [])
  return (
    <div>
      {loading ? (
        <CircularProgress
          className={classes.center}
          style={{ width: '70px', height: '70px' }}
        />
      ) : hotels.hotels && hotels.hotels.length > 0 ? (
        data.startDate ? (
          <h1>All free hotels</h1>
        ) : (
          <h1>All hotels</h1>
        )
      ) : (
        <h1>No hotels found in {data.city}</h1>
      )}
      {/* There must be loop with HotelCard */}
    </div>
  )
}
