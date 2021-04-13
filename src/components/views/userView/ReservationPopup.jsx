import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'
import useNotification from '../../../hooks/useNotification'
import { fetchData } from '../../../utils'

const ReservationPopup = ({ id, setPopupOpen }) => {
  const history = useHistory()
  const { openNotification } = useNotification()

  const removeReservation = async () => {
    try {
      await fetchData(global.API_BASE_URL + `api/reservations/${id}`, 'DELETE')
      openNotification('Reservation removed successfully!', 'success')
      history.go(0)
    } catch (ex) {
      openNotification(ex.message, 'error')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Remove Reservation</h2>
      <Button
        style={{ marginTop: '2rem', width: '10rem' }}
        variant="contained"
        color="primary"
        onClick={removeReservation}
      >
        Yes, I'm sure
      </Button>
      <Button
        style={{ marginTop: '2rem', width: '10rem' }}
        variant="contained"
        color="secondary"
        onClick={() => setPopupOpen(false)}
      >
        Cancel
      </Button>
    </div>
  )
}

export default ReservationPopup
