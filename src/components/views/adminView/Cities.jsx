import React, { useState } from 'react'
import { TextField, Input, CircularProgress } from '@material-ui/core'
import { fetchData } from '../../../utils'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export const Cities = ({ useStyles }) => {
  const [city, setCity] = useState()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const classes = useStyles()

  const handlerCityChange = (e) => {
    setCity(e.target.value)
  }
  const goNext = () => {
    setCity([])
    setAdding(false)
    setAdded(false)
  }
  const addCities = async (e) => {
    e.preventDefault()
    try {
      setAdding(true)
      const addedCity = await fetchData(
        global.API_BASE_URL + 'api/admin/city',
        'POST',
        {
          name: city,
        }
      )

      setAdded(true)
    } catch (err) {
      alert(err.message)
      setAdding(false)
    }
  }

  return (
    <div className={classes.centerItems}>
      {added ? (
        <Grid
          container
          direction="column"
          justify="space-around"
          alignItems="center"
          className={classes.grid}
        >
          <div>
            The city was added{' '}
            <CheckCircleIcon fontSize="large" style={{ color: 'green' }} />
          </div>
          <Button
            onClick={goNext}
            size="small"
            variant="contained"
            color="secondary"
          >
            Add next
          </Button>
        </Grid>
      ) : (
        <form id="Cities" onSubmit={(e) => addCities(e)} autoComplete="on">
          <TextField
            id="outlined-basic"
            className="addCityTextField"
            label="City name"
            size="small"
            variant="outlined"
            value={city}
            onChange={handlerCityChange}
            noValidate
            required
            margin="dense"
            color="secondary"
          />
          <>
            {adding ? (
              <CircularProgress className={classes.input} />
            ) : (
              <Input
                type="submit"
                value="Add City"
                className={classes.input}
                color="secondary"
              />
            )}
          </>
        </form>
      )}
    </div>
  )
}
