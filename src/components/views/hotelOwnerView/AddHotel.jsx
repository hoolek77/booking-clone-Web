import React, { useState } from 'react'
import { fetchData } from '../../../utils/'
import { makeStyles } from '@material-ui/core/styles'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import { RoomsStep, LocalizationStep, BasicInformationStep } from './steps'
import useNotification from '../../../hooks/useNotification'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    marginTop: '3rem',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttons: {
    marginBottom: '5rem',
  },
}))

const getSteps = () => {
  return ['Basic information', 'Localization', 'Rooms']
}

const AddHotel = () => {
  const classes = useStyles()
  const { openNotification } = useNotification()

  const [loadingCircle, setLoadingCircle] = useState(false)

  const [activeStep, setActiveStep] = useState(0)

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [country, setCountry] = useState()
  const [city, setCity] = useState('Anywhere')
  const [zipcode, setZipcode] = useState()
  const [street, setStreet] = useState()
  const [buildingNumber, setBuildingNumber] = useState()
  const [rooms, setRooms] = useState([])

  const data = {
    name,
    email,
    phoneNumber,
    localization: { country, city, zipcode, street, buildingNumber },
    rooms,
  }

  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCancel = () => {
    window.location.href = '/hotelOwner'
  }

  const handleSubmit = async () => {
    try {
      await fetchData(
        global.API_BASE_URL + 'api/hotelOwner/hotels',
        'POST',
        data
      )
      openNotification('Hotel has been added!', 'success')
      setLoadingCircle(false)

      window.location.href = '/hotelOwner'
    } catch (ex) {
      validateError(ex.message)
      setLoadingCircle(false)
    }
  }

  const validateError = (errorMsg) => {
    openNotification(errorMsg, 'error')
  }

  const getFinishOrLoading = () => {
    if (loadingCircle) {
      return <CircularProgress className={classes.buttons} color="secondary" />
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="BasicInformation"
          onClick={() => {
            if (rooms.length === 0) {
              return validateError('Hotel must contain at least 1 room.')
            }
            handleSubmit()
            setLoadingCircle(true)
          }}
          className={classes.buttons}
        >
          Finish
        </Button>
      )
    }
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <BasicInformationStep
            setName={setName}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
          />
        )
      case 1:
        return (
          <LocalizationStep
            setCountry={setCountry}
            setCity={setCity}
            setZipcode={setZipcode}
            setStreet={setStreet}
            setBuildingNumber={setBuildingNumber}
            city={city}
          />
        )
      case 2:
        return <RoomsStep setRooms={setRooms} />
      default:
        return 'Unknown stepIndex'
    }
  }

  const getValidationFunction = () => {
    switch (activeStep) {
      case 0:
        if (!name) {
          validateError('Name is incorrect')
          return false
        }

        if (email) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const isValidEmail = re.test(String(email).toLowerCase())

          if (!isValidEmail) {
            validateError('Email is incorrect.')
            return false
          }
        }

        if (!email) {
          validateError('Provide an email.')
          return false
        }

        if (!phoneNumber || phoneNumber.toString().length !== 9) {
          validateError('Phone number is incorrect.')
          return false
        }

        handleNext()
        break
      case 1:
        if (!country) {
          validateError('Country is incorrect.')
          return false
        }

        if (!city) {
          validateError('City is incorrect.')
          return false
        }

        if (!zipcode) {
          validateError('Zip code is incorrect.')
          return false
        }

        if (!street) {
          validateError('Street is incorrect.')
          return false
        }

        if (!buildingNumber) {
          validateError('Building number is incorrect.')
          return false
        }

        handleNext()
        break
      case 2:
        if (rooms.length < 1) {
          validateError('You should provide at least 1 room.')
          return false
        }

        handleNext()
        break
      default:
        return
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography className={classes.instructions}>
            {getStepContent(activeStep)}
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={activeStep === 0 ? handleCancel : handleBack}
              className={`${classes.backButton} ${classes.buttons}`}
            >
              {activeStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {activeStep === steps.length - 1 ? (
              getFinishOrLoading()
            ) : (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="BasicInformation"
                onClick={getValidationFunction}
                className={classes.buttons}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHotel
