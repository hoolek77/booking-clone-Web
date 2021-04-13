import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import useNotification from '../../../hooks/useNotification'
import { fetchData } from '../../../utils'
import { Table } from '../../shared/Table'

const reservationsColums = (onClick) => [
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: () => {
      return (
        <IconButton aria-label="edit" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      )
    },
  },
  { field: 'hotelName', headerName: 'Hotel Name', width: 250 },
  { field: 'roomNumber', headerName: 'Room', width: 100 },
  { field: 'price', headerName: 'Price', width: 100 },
  { field: 'city', headerName: 'City', width: 200 },
  { field: 'startDate', headerName: 'Start Date', width: 180 },
  { field: 'endDate', headerName: 'End Date', width: 180 },
]

const Reservations = () => {
  const { openNotification } = useNotification()
  const history = useHistory()

  const [reservations, setReservations] = useState([])
  const [selectedRow, setSelectedRow] = useState()
  const [pending, setPending] = useState({
    state: false,
    type: 'tablePending',
  })

  const getDate = (date) => {
    const notFormatted = new Date(date).toString()
    return notFormatted.slice(0, 15)
  }

  const formatReservations = (data) => {
    return data.map((field) => {
      return {
        id: field._id,
        hotelName: field.hotel.name,
        roomNumber: field.hotel.room.roomNumber,
        price: field.hotel.room.price,
        city: field.hotel.address.city,
        startDate: getDate(field.startDate),
        endDate: getDate(field.endDate),
      }
    })
  }

  const removeReservation = async () => {
    try {
      if (selectedRow[0] === undefined) return
      console.log(selectedRow[0])
      await fetchData(
        global.API_BASE_URL + `api/reservations/${selectedRow[0]}`,
        'DELETE'
      )
      openNotification('Reservation removed successfully!', 'success')
      history.go(0)
    } catch (ex) {
      openNotification(ex.message, 'error')
    }
  }

  const getReservations = async () => {
    try {
      setPending({ state: true, type: 'tablePending' })
      const reservations = await fetchData(
        global.API_BASE_URL + 'api/reservations',
        'GET'
      )
      setReservations(formatReservations(reservations))
      setPending({ state: false, type: 'tablePending' })
    } catch (ex) {
      openNotification('Something went wrong!', 'error')
    }
  }

  useEffect(() => {
    getReservations()
  }, [])

  return (
    <div className="user-table">
      <Table
        rows={reservations}
        columns={reservationsColums(removeReservation)}
        height="100%"
        width="100%"
        pageSize={6}
        checkboxSelection={false}
        loading={pending}
        setSelectedRows={setSelectedRow}
        selectedRows={selectedRow}
      />
    </div>
  )
}

export default Reservations
