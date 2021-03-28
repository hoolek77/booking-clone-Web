import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export default function Popup({
  buttonTitle,
  modalTitle,
  modalContent,
  buttonAgreeContent,
  buttonDisagreeContent,
  buttonAgreeFunction,
  buttonDisagreeFunction,
}) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {buttonTitle}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={
              buttonDisagreeFunction
                ? (handleClose, buttonDisagreeFunction)
                : handleClose
            }
            color="primary"
          >
            {buttonDisagreeContent}
          </Button>
          <Button
            onClick={
              buttonAgreeFunction
                ? (handleClose, buttonAgreeFunction)
                : handleClose
            }
            color="primary"
            autoFocus
          >
            {buttonAgreeContent}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
