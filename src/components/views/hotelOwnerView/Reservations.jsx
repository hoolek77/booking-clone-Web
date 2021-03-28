import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils/fetchData'
import { Table } from '../../shared/Table'
import { Alert } from '../../shared/Alert'
import { Snackbar } from '@material-ui/core'

const reservationsColums = [
  { field: 'id', headerName: 'Reservation ID', width: 250 },
  { field: 'userName', headerName: 'User Name', width: 200 },
  { field: 'hotelName', headerName: 'Hotel Name', width: 200 },
  { field: 'roomNumber', headerName: 'Room Number', width: 200 },
  { field: 'startDate', headerName: 'Start Date', width: 180 },
  { field: 'endDate', headerName: 'End Date', width: 180 },
]

const Reservations = () => {
  const [reservations, setReservations] = useState([])
  const [openError, setOpenError] = useState(false)
  const [errorMsg, setErrorMsg] = useState()
  const [pending, setPending] = useState({
    state: false,
    type: 'tablePending',
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenError(false)
  }

  const getDate = (date) => {
    const notFormatted = new Date(date).toString()
    return notFormatted.slice(0, 15)
  }

  const getNeededReservationData = (data) => {
    return data.map((field) => {
      return {
        id: field._id,
        userName: field.user.firstName + ' ' + field.user.lastName,
        hotelName: field.hotel.name,
        roomNumber: field.hotel.room.roomNumber,
        startDate: getDate(field.startDate),
        endDate: getDate(field.endDate),
      }
    })
  }

  const getData = async () => {
    setPending({ state: true, type: 'tablePending' })
    try {
      const reservations = await fetchData(
        global.API_BASE_URL + 'api/reservations',
        'GET'
      )

      setReservations(getNeededReservationData(reservations))
      setPending({ state: false, type: 'tablePending' })
    } catch (ex) {
      setOpenError(true)
      setErrorMsg(ex.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="reservations-table">
      <Table
        rows={reservations}
        columns={reservationsColums}
        height="100%"
        width="100%"
        pageSize={6}
        checkboxSelection={false}
        loading={pending}
      />
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Reservations
