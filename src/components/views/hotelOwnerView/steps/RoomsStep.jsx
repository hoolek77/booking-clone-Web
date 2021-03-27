import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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
  list: {
    width: '12rem',
    padding: '1rem',
    backgroundColor: theme.palette.background.paper,
  },
}))

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useForceUpdate = () => {
  const [value, setValue] = useState(0)
  return () => setValue((value) => value + 1)
}

export const RoomsStep = ({ setRooms }) => {
  const classes = useStyles()
  const forceUpdate = useForceUpdate()

  const [alertOpen, setAlertOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState()

  const [roomsList, setRoomsList] = useState([])
  const [roomNumber, setRoomNumber] = useState()
  const [description, setDescription] = useState('')
  const [single, setSingle] = useState()
  const [double, setDouble] = useState()
  const [price, setPrice] = useState()

  useEffect(() => {
    setRooms(roomsList)
  }, [roomsList])

  const room = {
    roomNumber,
    description,
    beds: {
      single,
      double,
    },
    price,
  }

  const validateError = (errorMsg) => {
    setErrorMsg(errorMsg)
    setAlertOpen(true)
  }

  const handleRoomAdd = () => {
    if (!roomNumber) {
      return validateError('Room number in incorrect.')
    }
    if (!description) {
      return validateError('Description is inncorect.')
    }
    if (single <= 0 || !single) {
      return validateError('Single Beds count is incorrect.')
    }
    if (double <= 0 || !single) {
      return validateError('Double Beds count is incorrect.')
    }
    if (price < 10) {
      return validateError('Price is incorrect.')
    }
    setRoomsList([...roomsList, room])
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  return (
    <div className="room-step">
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Room Number"
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Single Beds"
          onChange={(e) => setSingle(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Double Beds"
          onChange={(e) => setDouble(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button variant="contained" color="secondary" onClick={handleRoomAdd}>
          Add Room
        </Button>
      </form>
      <List className={`${classes.list} rooms-list`}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4>Rooms: </h4>
        </div>
        {roomsList.map((room, index) => {
          const labelId = `checkbox-list-label-${index}`

          return (
            <ListItem
              key={index}
              role={undefined}
              dense
              button
              className="room-list-item"
            >
              <ListItemText id={labelId} primary={`Room ${room.roomNumber}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    roomsList.splice(index, 1)
                    setRoomsList(roomsList)
                    forceUpdate()
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}
