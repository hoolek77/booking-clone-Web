import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const LocalizationStep = ({
  setCountry,
  setCity,
  setZipcode,
  setBuildingNumber,
  setStreet,
}) => {
  const classes = useStyles()

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="City"
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Street"
        onChange={(e) => setStreet(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Zip Code"
        onChange={(e) => setZipcode(e.target.value)}
      />
      <TextField
        id="standard-number"
        type="number"
        label="Building Number"
        onChange={(e) => setBuildingNumber(e.target.value)}
      />
    </form>
  )
}
