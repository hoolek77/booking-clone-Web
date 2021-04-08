import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import useNotification from '../hooks/useNotification'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const Notification = () => {
  const { message, open, severity, closeNotification } = useNotification()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    closeNotification()
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}
