import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import { fetchData } from '../utils'
import LoadingIcon from './shared/LoadingIcon'
import { RoomCard } from './RoomCard'
import TablePaginationActions from './shared/TablePaginationActions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(236 236 236)',
    marginBottom: '15px',
    borderRadius: '5px',
    padding: '10px',
  },
  header: {
    fontSize: '22px',
  },
  city: {
    fontSize: '18px',
    marginLeft: '10px',
  },
}))

export function HotelMoreDetails({ hotelId, city, location }) {
  const classes = useStyles()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const numberOfDays = location?.state?.days
  const data = location?.state?.data

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const getHotel = async () => {
    try {
      const hotel = await fetchData(
        global.API_BASE_URL + `api/hotels/${hotelId}`,
        'GET'
      )
      setHotel(hotel)
      setLoading(false)
    } catch (err) {
      alert(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getHotel()
  }, [])

  return loading ? (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ width: '100%', height: '80vh' }}
    >
      <LoadingIcon />
    </Grid>
  ) : (
    <>
      <Container maxWidth="lg">
        <p className={classes.header}>
          {hotel?.name}
          <span className={classes.city}>({city})</span>
        </p>
        <Table>
          <TableBody>
            {(rowsPerPage > 0
              ? hotel.rooms.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : hotel.rooms
            ).map((room, index) => {
              return (
                <TableRow key={index}>
                  <Container maxWidth="lg" className={classes.root}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <RoomCard
                        room={room}
                        hotelId={hotel._id}
                        numberOfDays={numberOfDays}
                        hotelData={hotel}
                        data={data}
                        key={index}
                      />
                    </Grid>
                  </Container>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={hotel.rooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </>
  )
}
