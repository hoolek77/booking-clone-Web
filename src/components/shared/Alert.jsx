import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

export const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}
