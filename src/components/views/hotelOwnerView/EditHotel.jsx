import React, { useState, useEffect } from 'react'
import { fetchData } from '../../../utils'
import TextField from '@material-ui/core/TextField'
import LoadingIcon from '../../shared/LoadingIcon'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
    width: '20ch',
  },
}))

const EditHotel = ({ id, setIsTable, setAlert }) => {
  const [hotel, setHotel] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  const history = useHistory()

  const validate = () => {
    if (!hotel.name) {
      setAlert({ isAlert: true, msg: 'Hotel name is incorrect' })
      return false
    } else if (!hotel.email) {
      setAlert({ isAlert: true, msg: 'Email is incorrect' })
      return false
    } else if (
      !hotel.phoneNumber ||
      hotel.phoneNumber.toString().length !== 9
    ) {
      setAlert({ isAlert: true, msg: 'Phone number is incorrect' })
      return false
    } else if (!hotel.localization.country) {
      setAlert({ isAlert: true, msg: 'Country is incorrect' })
      return false
    } else if (!hotel.localization.city) {
      setAlert({ isAlert: true, msg: 'City is incorrect' })
      return false
    } else if (!hotel.localization.street) {
      setAlert({ isAlert: true, msg: 'Street is incorrect' })
      return false
    } else if (!hotel.localization.buildingNumber) {
      setAlert({ isAlert: true, msg: 'Building Number is incorrect' })
      return false
    } else if (!hotel.localization.zipcode) {
      setAlert({ isAlert: true, msg: 'Zip Code is incorrect' })
      return false
    } else {
      return true
    }
  }

  const submitHotel = async () => {
    if (!validate()) return
    try {
      setIsLoading(true)
      const { name, email, phoneNumber, localization } = hotel
      const { city, country, street, zipcode, buildingNumber } = localization
      const body = {
        name,
        email,
        phoneNumber,
        localization: {
          city,
          country,
          street,
          zipcode,
          buildingNumber,
        },
      }
      await fetchData(
        global.API_BASE_URL + `api/hotelOwner/hotels/${id}`,
        'PUT',
        body
      )
      history.go(0)
      setIsLoading(false)
    } catch (ex) {
      setIsLoading(false)
      setAlert({ isAlert: true, msg: ex })
    }
  }

  const getHotel = async () => {
    try {
      const hotel = await fetchData(
        global.API_BASE_URL + `api/hotels/${id}`,
        'GET'
      )
      setHotel(hotel)
      setIsLoading(false)
    } catch (ex) {
      setIsLoading(false)
      setAlert({ isAlert: true, msg: ex })
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <h2 style={{ marginTop: '2rem' }}>Edit Hotel</h2>
          <TextField
            id="standard"
            label="Hotel Name"
            defaultValue={hotel.name}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                name: e.target.value,
              })
            }
          />
          <TextField
            id="standard"
            label="Email"
            defaultValue={hotel.email}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                email: e.target.value,
              })
            }
          />
          <TextField
            id="standard"
            label="Phone Number"
            type="number"
            defaultValue={hotel.phoneNumber}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                phoneNumber: e.target.value,
              })
            }
          />
          <TextField
            id="standard"
            label="Country"
            defaultValue={hotel.localization.country}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                localization: {
                  ...hotel.localization,
                  country: e.target.value,
                },
              })
            }
          />
          <TextField
            id="standard"
            label="City"
            defaultValue={hotel.localization.city}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                localization: {
                  ...hotel.localization,
                  city: e.target.value,
                },
              })
            }
          />
          <TextField
            id="standard"
            label="Street"
            defaultValue={hotel.localization.street}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                localization: {
                  ...hotel.localization,
                  street: e.target.value,
                },
              })
            }
          />
          <TextField
            id="standard"
            type="number"
            label="Building Number"
            defaultValue={hotel.localization.buildingNumber}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                localization: {
                  ...hotel.localization,
                  buildingNumber: e.target.value,
                },
              })
            }
          />
          <TextField
            id="standard"
            label="Zip Code"
            defaultValue={hotel.localization.zipcode}
            className={classes.input}
            onChange={(e) =>
              setHotel({
                ...hotel,
                localization: {
                  ...hotel.localization,
                  zipcode: e.target.value,
                },
              })
            }
          />
          <Button variant="contained" className={classes.input}>
            Add Room
          </Button>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '25ch',
            }}
            className={classes.input}
          >
            <Button
              variant="contained"
              style={{ width: '5rem' }}
              onClick={() => setIsTable(true)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={submitHotel}
              style={{ marginLeft: '2rem', width: '5rem' }}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default EditHotel
