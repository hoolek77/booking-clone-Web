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
  submitFormId,
  buttonColor,
  callbackFunction = () => true,
  buttonTitle,
  modalTitle,
  modalContent,
  buttonAgreeContent,
  buttonDisagreeContent,
  buttonAgreeFunction,
  buttonAgreeDisabled = false,
  buttonDisagreeFunction,
  open,
  setOpen,
}) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleClickOpen = () => {
    if (!callbackFunction()) return
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color={buttonColor}
        onClick={() => {
          handleClickOpen()
        }}
        style={{ margin: '5px' }}
      >
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
            onClick={buttonAgreeFunction && buttonAgreeFunction()}
            color="primary"
            autoFocus
            type="submit"
            form={submitFormId}
            disabled={buttonAgreeDisabled}
          >
            {buttonAgreeContent}
          </Button>
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
        </DialogActions>
      </Dialog>
    </div>
  )
}
