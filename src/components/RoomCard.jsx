import React, { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import SingleBedIcon from '@material-ui/icons/SingleBed'
import KingBedIcon from '@material-ui/icons/KingBed'
import EuroIcon from '@material-ui/icons/Euro'
import Grid from '@material-ui/core/Grid'
import { PAYMENT_METHODS } from '../constants'
import CheckIcon from '@material-ui/icons/Check'

import {
  isHotelOwner,
  isAdmin,
  isUserLoggedIn,
  fetchData,
  getUserInfo,
} from '../utils'
import Popup from './shared/Popup'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core'
import { Alert } from './shared/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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

export function RoomCard({ room, numberOfDays = 1, hotelData, data }) {
  const [days, setDays] = useState(numberOfDays)
  const [payment, setPayment] = useState(PAYMENT_METHODS.CARD_NOW)
  const [isDone, setIsDone] = useState(false)
  const [startDate, setStartDate] = useState(data?.startDate)
  const [endDate, setEndDate] = useState(data?.endDate)
  const [people, setPeople] = useState({
    adults: data?.adults,
    children: data?.children,
  })
  const [openSnackbar, setOpenSnackbar] = useState({
    status: false,
    content: '',
    vertical: 'top',
    horizontal: 'center',
    type: 'success',
  })

  const { vertical, horizontal } = openSnackbar
  const classes = useStyles()

  const handleValidation = () => {
    if (!isUserLoggedIn()) {
      setOpenSnackbar({
        ...openSnackbar,
        status: true,
        content: 'Please login first!',
        type: 'error',
      })
      return false
    }
    if (isHotelOwner() || isAdmin()) {
      setOpenSnackbar({
        ...openSnackbar,
        status: true,
        content: 'You are not allowed to make reservation!',
        type: 'error',
      })
      return false
    }
    return true
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar({
      ...openSnackbar,
      status: false,
    })
  }

  const createReservation = async (e) => {
    e.preventDefault()
    try {
      const { reservationId } = await fetchData(
        global.API_BASE_URL + 'api/reservations',
        'POST',
        {
          user: getUserInfo()._id,
          hotel: hotelData._id,
          room: room._id,
          startDate: startDate,
          endDate: endDate,
          people: people,
        }
      )

      if (payment === PAYMENT_METHODS.CARD_NOW) {
        await fetchData(
          global.API_BASE_URL + `api/reservations/pay/${reservationId}`,
          'PUT'
        )
      }
      setOpenSnackbar({
        ...openSnackbar,
        status: true,
        content: 'Reservation has been created!',
        type: 'success',
      })
      setIsDone(true)
    } catch (err) {
      setOpenSnackbar({
        ...openSnackbar,
        status: true,
        content: err.message,
        type: 'error',
      })
    }
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
          <Popup
            buttonTitle="MAKE RESERVATION"
            buttonColor="primary"
            callbackFunction={handleValidation}
            modalTitle={`Create Reservation at ${hotelData.name}`}
            buttonAgreeContent={isDone ? <CheckIcon /> : 'Save'}
            buttonAgreeDisabled={isDone}
            buttonDisagreeContent="Cancel"
            submitFormId="reservation-form"
            modalContent={
              <form id="reservation-form" onSubmit={createReservation}>
                <Grid
                  container
                  spacing={2}
                  className={classes.root}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} style={{ maxWidth: '250px' }}>
                    <TextField
                      id="date"
                      color="secondary"
                      label="Start Date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ maxWidth: '250px' }}>
                    <TextField
                      id="date"
                      color="secondary"
                      label="End Date"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value)
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ maxWidth: '250px' }}>
                    <TextField
                      id="standard-number"
                      color="secondary"
                      label="Adults"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={people.adults}
                      onChange={(e) =>
                        setPeople({ ...people, adults: e.target.value })
                      }
                      required
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ maxWidth: '250px' }}>
                    <TextField
                      id="standard-number"
                      color="secondary"
                      className={`${classes.numberField} search-bar-number-field`}
                      label="Children"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={people.children}
                      onChange={(e) =>
                        setPeople({ ...people, children: e.target.value })
                      }
                      required
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ maxWidth: '250px' }}>
                    <FormControl component="fieldset" style={{ width: '100%' }}>
                      <InputLabel
                        id="demo-simple-select-error-label"
                        color="secondary"
                      >
                        Payment Method
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        color="secondary"
                      >
                        <MenuItem value={PAYMENT_METHODS.CARD_NOW}>
                          By Card (now)
                        </MenuItem>
                        <MenuItem value={PAYMENT_METHODS.CARD_ARRIVE}>
                          By Card (arrival)
                        </MenuItem>
                        <MenuItem value={PAYMENT_METHODS.CASH_ARRIVE}>
                          By Cash (arrival)
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            }
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
      ></Grid>
      <Snackbar
        open={openSnackbar.status}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={openSnackbar.type} onClose={handleClose}>
          {openSnackbar.content}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar.status}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert severity={openSnackbar.type} onClose={handleClose}>
          {openSnackbar.content}
        </Alert>
      </Snackbar>
    </Grid>
  )
}
