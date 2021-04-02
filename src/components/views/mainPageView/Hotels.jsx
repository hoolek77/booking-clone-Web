import React, { useEffect, useState } from 'react'
import { HotelCard } from '../../HotelCard'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSearch } from '../../../hooks'
import { Pagination, PaginationItem } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.secondary.main,
  },
  container: {
    padding: 20,
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const Hotels = ({ match, location }) => {
  const classes = useStyles()
  const [hotels, search] = useSearch()
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState()
  const [resData, setResData] = useState()

  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get('pageNumber') || '1', 10)

  let data = location.state ? location.state : { city: match.params.data }
  data = !data.startDate && data.city === 'Anywhere' ? '' : data

  data = { ...data, pageNumber: page }

  const calculateDays = () => {
    return data.startDate
      ? (new Date(data.endDate).getTime() -
          new Date(data.startDate).getTime()) /
          (24 * 3600 * 1000)
      : 1
  }
  useEffect(() => {
    setDays(calculateDays())
    setResData({ ...data, city: '' })
  }, [])

  useEffect(() => {
    search(data, setLoading)
  }, [page])

  return (
    <div className={classes.container}>
      {loading ? (
        <CircularProgress
          className={classes.center}
          style={{ width: '70px', height: '70px' }}
        />
      ) : hotels.hotels?.length > 0 ? (
        <>
          <h1>{data.city ? data.city : ' Anywhere'}</h1>
          <Pagination
            page={page}
            count={hotels.pages}
            className={classes.pagination}
            style={{ display: hotels.pages === 1 ? 'none' : 'flex' }}
            color="secondary"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                style={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'center',
                  },
                }}
                to={`/hotels/${data.city || 'Anywhere'}${
                  item.page === 1 ? '' : `?pageNumber=${item.page}`
                }`}
                {...item}
              />
            )}
          />
          {hotels.hotels.map((hotel, index) => {
            return (
              <HotelCard
                hotel={hotel}
                days={days}
                data={resData}
                key={hotel?.name + index}
              />
            )
          })}
          <Pagination
            page={page}
            count={hotels.pages}
            className={classes.pagination}
            color="secondary"
            style={{ display: hotels.pages === 1 ? 'none' : 'flex' }}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                style={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'center',
                  },
                }}
                to={`/hotels/${data.city || 'Anywhere'}${
                  item.page === 1 ? '' : `?pageNumber=${item.page}`
                }`}
                {...item}
              />
            )}
          />
        </>
      ) : (
        <h1>No hotels found in {data.city}</h1>
      )}
    </div>
  )
}
