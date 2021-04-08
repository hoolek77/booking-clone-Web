import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { fetchData } from '../../../utils'
import { Table } from '../../shared/Table'
import useNotification from '../../../hooks/useNotification'

export const Users = ({ columns, useStyles }) => {
  const { openNotification } = useNotification()

  const [selectedRows, setSelectedRows] = useState([])
  const [users, setUsers] = useState([])
  const [pending, setPending] = useState({
    state: true,
    type: 'userPending',
  })

  const [forceDelete, setForceDelete] = useState(false)
  const classes = useStyles()

  const getNeededUserData = (data) => {
    return data
      .filter((field) => field.role === 'user')
      .map((field) => {
        return {
          id: field._id,
          firstName: field.firstName,
          lastName: field.lastName,
          phoneNumber: field.phoneNumber,
          email: field.email,
        }
      })
  }

  const handleDeleteUsers = async () => {
    if (selectedRows.length === 0) {
      openNotification('No user selected!', 'error')
      return
    }
    try {
      setPending({ state: true, type: 'tablePending' })
      await fetchData(
        global.API_BASE_URL + `api/admin/users?forceDelete=${forceDelete}`,
        'DELETE',
        selectedRows
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
  }

  const getUsers = async () => {
    try {
      setPending({ state: true, type: 'userPending' })
      const data = await fetchData(
        global.API_BASE_URL + 'api/admin/users',
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

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className={classes.centerItems}>
      <div className={classes.controlRow}>
        <FormControlLabel
          value="true"
          control={<Checkbox color="primary" />}
          label="Force Delete"
          labelPlacement="start"
          style={{ marginRight: '16px', marginBottom: 0 }}
          onClick={() => setForceDelete(!forceDelete)}
        />
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
        columns={columns}
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
