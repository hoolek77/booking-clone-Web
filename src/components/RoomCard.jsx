import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SingleBedIcon from '@material-ui/icons/SingleBed'
import KingBedIcon from '@material-ui/icons/KingBed'
import EuroIcon from '@material-ui/icons/Euro'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import { isHotelOwner, isAdmin } from '../utils'

const useStyles = makeStyles((theme) => ({
  icon: {
    position: 'relative',
    top: '6px',
    margin: '0 5px',
  },
  button: {
    position: 'relative',
    margin: '5px',
  },
}))

export function RoomCard({ room, isLogged, days }) {
  const classes = useStyles()

  const handleReserve = (loggedIn) => {
    if (!loggedIn) return alert('Please login first')
    if (isHotelOwner() || isAdmin())
      return alert('You are not allowed to make reservation')
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={8}>
          <span>Room number: {room.roomNumber}</span>
          <p>{room.description}</p>
        </Grid>
        <Grid container direction="column" item xs={2}>
          <span>
            <SingleBedIcon className={classes.icon} /> Single bed:{' '}
            <span>{room.beds.single} </span>
          </span>
          <span>
            <KingBedIcon className={classes.icon} /> Double bed:{' '}
            <span>{room.beds.double} </span>
          </span>
        </Grid>
        <Grid container direction="column" item xs={2}>
          <span>
            <EuroIcon className={classes.icon} />
            Price: {room.price * days}
          </span>
          <Link
            onClick={() => {
              handleReserve(isLogged)
            }}
            className={`MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-button-22 MuiButton-containedPrimary ${classes.button}`}
          >
            Make Reservation
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
      ></Grid>
    </Grid>
  )
}
