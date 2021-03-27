import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

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

export const BasicInformationStep = ({ setName, setEmail, setPhoneNumber }) => {
  const classes = useStyles()

  const onBasicInformationSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form
      id="BasicInformation"
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={onBasicInformationSubmit}
    >
      <TextField
        id="standard-required"
        label="Name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="standard-basic"
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        id="standard-basic"
        label="Phone Number"
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
    </form>
  )
}
