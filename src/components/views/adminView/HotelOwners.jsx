import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils'
import { Table } from '../../shared/Table'
import { Button, Snackbar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Alert } from '../../shared/Alert'

export const HotelOwners = ({ columns, useStyles }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [users, setUsers] = useState([])
  const [pending, setPending] = useState({
    state: true,
    type: 'userPending',
  })
  const [loading, setLoading] = useState(false)
  const [openError, setOpenError] = useState({ status: false, message: '' })
  const [openSuccess, setOpenSuccess] = useState({ status: false, message: '' })
  const classes = useStyles()

  const getNeededUserData = (data) => {
    return data.map((field) => {
      return {
        id: field._id,
        firstName: field.firstName,
        lastName: field.lastName,
        phoneNumber: field.phoneNumber,
        email: field.email,
        isVerified: field.isVerified,
      }
    })
  }

  const handleDeleteUsers = async () => {
    if (selectedRows.length === 0) {
      setOpenError({ status: true, message: 'No user selected!' })
      return
    }
    selectedRows.forEach(async (user) => {
      try {
        setPending({ state: true, type: 'tablePending' })
        await fetchData(
          global.API_BASE_URL + `api/admin/hotelOwner/${user}`,
          'DELETE'
        )
        await getUsers()
        setOpenSuccess({
          status: true,
          message: selectedRows.length > 1 ? 'Users Removed!' : 'User Removed!',
        })
        setPending({ state: false, type: 'tablePending' })
      } catch (err) {
        setOpenError({ status: true, message: err.message })
        setPending({ state: false, type: 'tablePending' })
      }
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenError({ status: false, message: '' })
    setOpenSuccess({ status: false, message: '' })
  }

  const getUsers = async () => {
    try {
      const data = await fetchData(
        global.API_BASE_URL + 'api/admin/hotelOwners',
        'GET'
      )
      if (data) {
        setUsers(getNeededUserData(data))
        setPending({ state: false, type: 'userPending' })
      }
    } catch (err) {
      setOpenError({ status: true, message: err.message })
    }
  }

  const handleVerifyHotelOwner = async (id) => {
    setLoading(true)
    try {
      await fetchData(
        global.API_BASE_URL + `api/admin/verifyHotelOwner/${id}`,
        'PUT'
      )
      await getUsers()
      setOpenSuccess({
        status: true,
        message: 'User Verified',
      })
      setLoading(false)
    } catch (err) {
      setOpenError({ status: true, message: err.message })
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={classes.centerItems}>
      <div className={classes.controlRow}>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={handleDeleteUsers}
        >
          Remove
        </Button>
      </div>
      <Table
        rows={users}
        columns={columns(loading, handleVerifyHotelOwner)}
        height="90%"
        width="100%"
        pageSize={8}
        setSelectedRows={setSelectedRows}
        selectedRows={selectedRows}
        loading={pending}
      />

      <Snackbar
        open={openError.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">{openError.message}</Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success">{openSuccess.message}</Alert>
      </Snackbar>
    </div>
  )
}
