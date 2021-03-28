import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import { fetchData } from '../utils'
import LoadingIcon from './shared/LoadingIcon'
import { RoomCard } from './RoomCard'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(236 236 236)',
    marginBottom: '15px',
    borderRadius: '5px',
    padding: '10px',
  },
  header: {
    fontSize: '22px',
  },
  city: {
    fontSize: '18px',
    marginLeft: '10px',
  },
}))

export function HotelMoreDetails({ hotelId, city, location }) {
  const classes = useStyles()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const numberOfDays = location.state

  const getHotel = async () => {
    try {
      const hotel = await fetchData(
        global.API_BASE_URL + `api/hotels/${hotelId}`,
        'GET'
      )
      setHotel(hotel)
      setLoading(false)
    } catch (err) {
      alert(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  return loading ? (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ width: '100%', height: '80vh' }}
    >
      <LoadingIcon />
    </Grid>
  ) : (
    <>
      <Container maxWidth="lg">
        <p className={classes.header}>
          {hotel?.name}
          <span className={classes.city}>({city})</span>
        </p>
        <p></p>
      </Container>

      {hotel?.rooms?.map((room) => {
        return (
          <Container maxWidth="lg" className={classes.root}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <RoomCard room={room} hotelId={hotel._id} days={numberOfDays} />
            </Grid>
          </Container>
        )
      })}
    </>
  )
}
