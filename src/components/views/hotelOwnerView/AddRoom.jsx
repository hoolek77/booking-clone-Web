import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

const AddRoom = ({ handleRoomAdd, setRoom, room }) => {
  const classes = useStyles()

  return (
    <div>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Room Number"
          onChange={(e) => setRoom({ ...room, roomNumber: e.target.value })}
          required
        />
        <TextField
          type="number"
          label="Single Beds"
          onChange={(e) =>
            setRoom({
              ...room,
              beds: {
                ...room.beds,
                single: e.target.value,
              },
            })
          }
          defaultValue={room.beds.single}
          required
        />
        <TextField
          type="number"
          label="Double Beds"
          onChange={(e) =>
            setRoom({ ...room, beds: { ...room.beds, double: e.target.value } })
          }
          defaultValue={room.beds.double}
          required
        />
        <TextField
          type="number"
          label="Price"
          onChange={(e) => setRoom({ ...room, price: e.target.value })}
          required
        />
        <TextField
          id="standard-multiline-static"
          label="Description"
          multiline
          onChange={(e) => setRoom({ ...room, description: e.target.value })}
        />
        <Button variant="contained" color="secondary" onClick={handleRoomAdd}>
          Add Room
        </Button>
      </form>
    </div>
  )
}

export default AddRoom
