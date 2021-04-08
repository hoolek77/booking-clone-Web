import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Table } from '../../shared/Table'
import { fetchData } from '../../../utils'
import useNotification from '../../../hooks/useNotification'

export const HotelOwners = ({ columns, useStyles }) => {
  const { openNotification } = useNotification()

  const [selectedRows, setSelectedRows] = useState([])
  const [users, setUsers] = useState([])
  const [pending, setPending] = useState({
    state: true,
    type: 'userPending',
  })
  const [loading, setLoading] = useState(false)
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
      openNotification('No user selected!', 'error')
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
        openNotification(
          selectedRows.length > 1 ? 'Users Removed!' : 'User Removed!',
          'success'
        )
        setPending({ state: false, type: 'tablePending' })
      } catch (err) {
        openNotification(err.message, 'error')
        setPending({ state: false, type: 'tablePending' })
      }
    })
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
      openNotification(err.message, 'error')
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
      openNotification('User Verified', 'success')
      setLoading(false)
    } catch (err) {
      openNotification(err.message, 'error')
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
    </div>
  )
}
