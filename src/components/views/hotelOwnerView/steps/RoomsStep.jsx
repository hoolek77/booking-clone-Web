import React, { useState, useEffect } from 'react'
import RoomsList from '../RoomsList'
import AddRoom from '../AddRoom'
import { handleRoomAdd } from '../../../../utils/index'
import useNotification from '../../../../hooks/useNotification'

const useForceUpdate = () => {
  const [setValue] = useState(0)
  return () => setValue((value) => value + 1)
}

export const RoomsStep = ({ setRooms }) => {
  const forceUpdate = useForceUpdate()
  const { openNotification } = useNotification()

  const [room, setRoom] = useState({ beds: { single: 0, double: 0 } })
  const [roomsList, setRoomsList] = useState([])

  useEffect(() => {
    setRooms(roomsList)
  }, [roomsList])

  const validateError = (errorMsg) => {
    openNotification(errorMsg, 'error')
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
    </div>
  )
}
