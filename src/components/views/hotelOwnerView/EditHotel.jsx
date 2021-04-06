import React, { useState, useEffect } from 'react'
import { fetchData, handleRoomAdd } from '../../../utils'
import LoadingIcon from '../../shared/LoadingIcon'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, TextField } from '@material-ui/core'
import { useHistory } from 'react-router'
import Popup from '../../shared/Popup'
import AddRoom from './AddRoom'
import { useFindCities } from '../../../hooks'
import { SELECT_MENU_PROPS } from '../../../constants'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
    width: '20ch',
  },
}))

const EditHotel = ({ id, setIsTable, setAlert }) => {
  const [hotel, setHotel] = useState({})
  const [room, setRoom] = useState({
    beds: { single: 0, double: 0 },
    description: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isPopupLoading, setIsPopupLoading] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  const [cities, isPending] = useFindCities()

  const validate = () => {
    if (!hotel.name) {
      validateError('Hotel name is incorrect')
      return false
    } else if (!hotel.email) {
      validateError('Email is incorrect')
      return false
    } else if (
      !hotel.phoneNumber ||
      hotel.phoneNumber.toString().length !== 9
    ) {
      validateError('Phone number is incorrect')
      return false
    } else if (!hotel.localization.country) {
      validateError('Country is incorrect')
      return false
    } else if (!hotel.localization.city) {
      validateError('City is incorrect')
      return false
    } else if (!hotel.localization.street) {
      validateError('Street is incorrect')
      return false
    } else if (!hotel.localization.buildingNumber) {
      validateError('Building Number is incorrect')
      return false
    } else if (!hotel.localization.zipcode) {
      validateError('Zip Code is incorrect')
      return false
    } else {
      return true
    }
  }

  const validateError = (msg) => {
    setAlert({ isAlert: true, msg, severity: 'error' })
  }

  const submitAddRoom = async () => {
    try {
      setIsPopupLoading(true)
      await fetchData(
        global.API_BASE_URL + `api/hotelOwner/hotels/${id}/addRoom`,
        'POST',
        [room]
      )

      setIsPopupLoading(false)
      setPopupOpen(false)
      setAlert({
        isAlert: true,
        msg: 'Room has been added',
        severity: 'success',
      })
    } catch (ex) {
      setAlert({ isAlert: true, msg: ex, severity: 'error' })
      setIsPopupLoading(false)
    }
  }

  const submitHotel = async () => {
    if (!validate()) return
    try {
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
      setAlert({
        isAlert: 'true',
        msg: 'Hotel has been saved.',
        severity: 'success',
      })
      history.go(0)
    } catch (ex) {
      setAlert({
        isAlert: true,
        msg: 'something went wrong',
        severity: 'error',
      })
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
      setAlert({
        isAlert: true,
        msg: 'something went wrong',
        severity: 'error',
      })
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight:
          SELECT_MENU_PROPS.ITEM_HEIGHT * 4.5 +
          SELECT_MENU_PROPS.ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

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
          <Box
            className="hotel-info hotel-edit__field"
            boxShadow={3}
            borderRadius={5}
          >
            <h4 className="hotel-edit__heading">Info:</h4>
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
          </Box>
          <Box
            className="hotel-contact hotel-edit__field"
            boxShadow={3}
            borderRadius={5}
          >
            <h4 className="hotel-edit__heading">Contact:</h4>
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
          </Box>
          <Box
            className="hotel-localization hotel-edit__field"
            boxShadow={3}
            borderRadius={5}
          >
            <h4 className="hotel-edit__heading">Localization:</h4>
            <div className="hotel-edit__row">
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
              {isPending ? (
                <LoadingIcon />
              ) : (
                <>
                  <FormControl className={classes.input}>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) =>
                        setHotel({
                          ...hotel,
                          localization: {
                            ...hotel.localization,
                            city: e.target.value,
                          },
                        })
                      }
                      value={hotel.localization.city}
                      defaultValue={hotel.localization.city}
                      color="primary"
                      required
                      MenuProps={MenuProps}
                    >
                      {cities.map(({ name }, index) => {
                        return (
                          <MenuItem value={name} key={index + name}>
                            {name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </>
              )}
            </div>
            <div className="hotel-edit__row">
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
            </div>
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
          </Box>
          <Popup
            buttonTitle={'Add Room'}
            modalContent={
              isPopupLoading ? (
                <LoadingIcon />
              ) : (
                <AddRoom
                  room={room}
                  setRoom={setRoom}
                  handleRoomAdd={() => {
                    handleRoomAdd(room, validateError, submitAddRoom)
                  }}
                />
              )
            }
            open={popupOpen}
            setOpen={setPopupOpen}
          />
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
              onClick={() => history.go(0)}
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
