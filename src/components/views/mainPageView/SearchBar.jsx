import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  field: {
    margin: theme.spacing(0.5),
  },
  numberField: {
    margin: theme.spacing(0.5),
  },
}))

const SearchBar = () => {
  const classes = useStyles()

  const [city, setCity] = useState('Anywhere')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [redirect, setRedirect] = useState(false)

  const data = {
    city: city === 'Anywhere' ? '' : city,
    startDate,
    endDate,
    adults,
    children,
  }

  const submit = (e) => {
    e.preventDefault()
    setRedirect(true)
  }

  return (
    <div className="search-bar-container">
      <form onSubmit={submit}>
        <Box className="search-bar" borderRadius={5} boxShadow={3}>
          <FormControl
            className={`${classes.field} search-bar-field`}
            color="secondary"
          >
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              color="secondary"
              required
            >
              <MenuItem value={'Anywhere'}>Anywhere</MenuItem>
              <MenuItem value={'Warsaw'}>Warsaw</MenuItem>
              <MenuItem value={'Wroclaw'}>Wroclaw</MenuItem>
              <MenuItem value={'Bydgoszcz'}>Bydgoszcz</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="date"
            color="secondary"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`${classes.field} search-bar-field`}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            id="date"
            color="secondary"
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`${classes.field} search-bar-field`}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            id="standard-number"
            color="secondary"
            className={`${classes.numberField} search-bar-number-field`}
            label="Adults"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            required
          />
          <TextField
            id="standard-number"
            color="secondary"
            className={`${classes.numberField} search-bar-number-field`}
            label="Children"
            style={{ marginLeft: '.5rem' }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            required
          />
          <div className={`${classes.field} search-bar-field-container`}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{ marginLeft: '.5rem' }}
              className={`${classes.field} search-bar-field`}
            >
              Search
            </Button>
          </div>
        </Box>
      </form>
      {redirect ? (
        <Redirect
          to={{
            pathname: `hotels/${city}`,
            state: data,
          }}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default SearchBar
