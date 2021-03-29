import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils'
import { Table } from '../../shared/Table'
import { Button, Snackbar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Alert } from '../../shared/Alert'

export const Users = ({ columns, useStyles }) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [users, setUsers] = useState([])
  const [pending, setPending] = useState({
    state: true,
    type: 'userPending',
  })

  const [forceDelete, setForceDelete] = useState(false)
  const [openError, setOpenError] = useState({ status: false, message: '' })
  const [openSuccess, setOpenSuccess] = useState({ status: false, message: '' })
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
      setOpenError({ status: true, message: 'No user selected!' })
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
      setOpenSuccess({
        status: true,
        message: selectedRows.length > 1 ? 'Users Removed!' : 'User Removed!',
      })
      setPending({ state: false, type: 'tablePending' })
    } catch (err) {
      setOpenError({ status: true, message: err.message })
      setPending({ state: false, type: 'tablePending' })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenError({ ...openError, status: false })
    setOpenSuccess({ ...openSuccess, status: false })
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
      setOpenError({ status: true, message: err.message })
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
      <Snackbar
        open={openError.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {openError.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          {openSuccess.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
