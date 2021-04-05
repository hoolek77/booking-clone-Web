import React, { useEffect, useState, useCallback } from 'react'
import { Table } from '../../shared/Table'
import { fetchData } from '../../../utils'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import EditHotel from './EditHotel'
import LoadingIcon from '../../shared/LoadingIcon'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '../../shared/Alert'
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import Popup from '../../shared/Popup'

const hotelsColumns = (onClick) => [
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: () => {
      return (
        <IconButton aria-label="comments" onClick={onClick}>
          <DeleteIcon style={{ color: '#f44336' }} />
        </IconButton>
      )
    },
  },
  { field: 'hotelName', headerName: 'Hotel Name', width: 200 },
  { field: 'roomsCount', headerName: 'Rooms Count', width: 140 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 200 },
  { field: 'adress', headerName: 'Adress', width: 200 },
]

export const RemoveHotels = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState({ isAlert: false, msg: '' })
  const [hotels, setHotels] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [open, setOpen] = useState(false)
  const [isForceDelete, setIsForceDelete] = useState(false)
  const [pending, setPending] = useState({
    state: false,
    type: 'tablePending',
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAlert({ ...alert, isAlert: false })
  }

  const formatHotels = (data) => {
    return data.map(
      ({ _id, name, rooms, email, phoneNumber, localization }) => {
        return {
          id: _id,
          hotelName: name,
          roomsCount: rooms.length,
          email,
          phoneNumber,
          adress: `${localization.city} ${localization.street} ${localization.buildingNumber}`,
        }
      }
    )
  }

  const getHotels = async () => {
    setPending({ state: true, type: 'tablePending' })
    try {
      const hotels = await fetchData(
        global.API_BASE_URL + 'api/hotelOwner/hotels',
        'GET'
      )
      setHotels(formatHotels(hotels))
      setPending({ state: false, type: 'tablePending' })
      setIsLoading(false)
    } catch (ex) {
      setAlert({ isAlert: true, msg: ex, severity: 'error' })
      setIsLoading(false)
      setPending({ state: false, type: 'tablePending' })
    }
  }

  const handleDeleteHotel = async () => {
    setPending({ state: true, type: 'tablePending' })
    try {
      const id = selectedRows[0]
      await fetchData(
        global.API_BASE_URL +
          `api/hotelOwner/hotels/${id}?forceDelete=${isForceDelete}`,
        'DELETE'
      )
      setOpen(false)
      getHotels()
      setPending({ state: false, type: 'tablePending' })
      setAlert({ isAlert: true, msg: 'Hotel deleted!', severity: 'success' })
    } catch (err) {
      setOpen(false)
      setAlert({ isAlert: true, msg: err.message, severity: 'error' })
      setPending({ state: false, type: 'tablePending' })
    }
  }

  useEffect(() => {
    getHotels()
  }, [])

  return (
    <div style={{ height: 'auto', position: 'relative' }}>
      {isLoading ? (
        <LoadingIcon style={{ position: 'absolute', top: '25vh' }} />
      ) : (
        <>
          <div className="hotel-owner-table">
            <Table
              rows={hotels}
              columns={hotelsColumns(() => setOpen(true))}
              height="100%"
              width="100%"
              pageSize={6}
              checkboxSelection={false}
              loading={pending}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
            />
          </div>
        </>
      )}
      <Snackbar
        open={alert.isAlert}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alert.severity}>
          {alert.msg}
        </Alert>
      </Snackbar>
      <Popup
        open={open}
        setOpen={setOpen}
        isButton={false}
        modalTitle="Are you sure to remove this hotel?"
        modalContent={
          <FormControlLabel
            value={isForceDelete}
            control={<Checkbox color="primary" />}
            label="Force Delete"
            labelPlacement="end"
            onClick={() => setIsForceDelete(!isForceDelete)}
          />
        }
        buttonAgreeContent="Remove"
        buttonDisagreeContent="Cancel"
        buttonAgreeFunction={handleDeleteHotel}
      />
    </div>
  )
}
