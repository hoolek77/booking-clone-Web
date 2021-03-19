import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '15ch',
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '10ch',
  },
}))

const SearchBar = ({ onSearchSubmit }) => {
  const classes = useStyles()

  const [city, setCity] = useState('Warsaw')
  const [startDate, setStartDate] = useState('2021-07-01')
  const [endDate, setEndDate] = useState('2021-07-07')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(1)

  const data = {
    city,
    startDate,
    endDate,
    adults,
    children,
  }

  const handleSearchSubmit = () => {
    onSearchSubmit(data)
  }

  return (
    <div className={classes.root}>
      <TextField
        id="margin-none"
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        id="date"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="standard-number"
        className={classes.numberField}
        label="Adults"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={adults}
        onChange={(e) => setAdults(e.target.value)}
      />
      <TextField
        id="standard-number"
        className={classes.numberField}
        label="Children"
        style={{ marginLeft: '.5rem' }}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={children}
        onChange={(e) => setChildren(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginLeft: '.5rem' }}
        onClick={handleSearchSubmit}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBar
