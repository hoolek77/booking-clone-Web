import React, { useState, useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '../../../shared/Alert'
import RoomsList from '../RoomsList'
import AddRoom from '../AddRoom'
import { handleRoomAdd } from '../../../../utils/index'

const useForceUpdate = () => {
  const [setValue] = useState(0)
  return () => setValue((value) => value + 1)
}

export const RoomsStep = ({ setRooms }) => {
  const forceUpdate = useForceUpdate()

  const [alertOpen, setAlertOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const [room, setRoom] = useState({ beds: { single: 0, double: 0 } })
  const [roomsList, setRoomsList] = useState([])

  useEffect(() => {
    setRooms(roomsList)
  }, [roomsList])

  const validateError = (errorMsg) => {
    setErrorMsg(errorMsg)
    setAlertOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlertOpen(false)
  }

  return (
    <div className="room-step">
      <AddRoom
        handleRoomAdd={() => {
          handleRoomAdd(room, validateError, () =>
            setRoomsList([...roomsList, room])
          )
        }}
        setRoom={setRoom}
        room={room}
      />
      <RoomsList
        roomsList={roomsList}
        setRoomsList={setRoomsList}
        forceUpdate={forceUpdate}
      />
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}
