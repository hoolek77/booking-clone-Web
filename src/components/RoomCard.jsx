import React, { useState } from 'react'
import SingleBedIcon from '@material-ui/icons/SingleBed'
import KingBedIcon from '@material-ui/icons/KingBed'
import EuroIcon from '@material-ui/icons/Euro'
import CheckIcon from '@material-ui/icons/Check'
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  makeStyles,
} from '@material-ui/core'

import {
  isHotelOwner,
  isAdmin,
  isUserLoggedIn,
  fetchData,
  getUserInfo,
} from '../utils'
import Popup from './shared/Popup'
import { PAYMENT_METHODS } from '../constants'
import useNotification from '../hooks/useNotification'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    position: 'relative',
    margin: '0 5px',
  },
  button: {
    position: 'relative',
    margin: '5px',
  },
}))

export function RoomCard({ room, numberOfDays = 1, hotelData, data }) {
  const classes = useStyles()
  const { openNotification } = useNotification()

  const [payment, setPayment] = useState(PAYMENT_METHODS.CARD_NOW)
  const [isDone, setIsDone] = useState(false)
  const [startDate, setStartDate] = useState(data?.startDate)
  const [endDate, setEndDate] = useState(data?.endDate)
  const [people, setPeople] = useState({
    adults: data?.adults,
    children: data?.children,
  })
  const [popupOpen, setPopupOpen] = useState(false)

  const handleValidation = () => {
    if (!isUserLoggedIn()) {
      openNotification('Please login first!', 'error')

      return false
    }
    if (isHotelOwner() || isAdmin()) {
      openNotification('You are not allowed to make reservation!', 'error')

      return false
    }
    return true
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
      openNotification('Reservation has been created!', 'success')
      setIsDone(true)
    } catch (err) {
      openNotification(err.message, 'error')
    }
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className="roomCardGrid"
      >
        <Grid item xs={6} className="roomCardDescription">
          <span>Room number: {room.roomNumber}</span>
          <p>{room.description}</p>
        </Grid>
        <Grid container direction="column" item xs={3} className="roomCardGrid">
          <span className="roomCardSpan">
            <SingleBedIcon className={classes.icon} /> Single bed:{' '}
            <span>{room.beds.single} </span>
          </span>
          <span className="roomCardSpan">
            <KingBedIcon className={classes.icon} /> Double bed:{' '}
            <span>{room.beds.double} </span>
          </span>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          item
          xs={3}
          className="roomCardGrid"
        >
          <span>
            <EuroIcon className={classes.icon} />
            Price: {room.price * numberOfDays}
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
            open={popupOpen}
            setOpen={setPopupOpen}
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
    </Grid>
  )
}
