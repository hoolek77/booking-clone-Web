import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'
import HotelIcon from '@material-ui/icons/Hotel'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '200px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'rgb(236 236 236)',
    margin: '5px',
    borderRadius: '5px',
    boxSizing: 'border-box',
    padding: '10px',
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  icon: {
    width: '7em',
    height: '7em',
  },
  hotelHeader: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
}))

export function HotelCard({ hotel, days }) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container justify="center" item xs={4} className={classes.grid}>
          <HotelIcon className={classes.icon} />
        </Grid>
        <Grid item xs={6}>
          <Grid container justify="space-between">
            <span className={classes.hotelHeader}>{hotel.name}</span>
            <Rating
              className={classes.rating}
              name="read-only"
              value={1}
              readOnly
            />
          </Grid>
          <p>({hotel.localization.city})</p>
          <p>{hotel.description}</p>
        </Grid>
        <Grid item xs={2} container justify="flex-end" alignItems="flex-end">
          <Link
            to={{
              pathname: `/hotels/${hotel.localization.city}/${hotel._id}`,
              state: days,
            }}
            className={`MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-button-22 MuiButton-containedPrimary ${classes.button}`}
          >
            Select
          </Link>
        </Grid>
      </div>
    </Container>
  )
}
