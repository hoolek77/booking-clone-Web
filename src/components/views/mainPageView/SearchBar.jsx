import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import '../../../content/css/searchBar.css'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '8.8rem',
  },
  numberField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '8.8rem',
  },
}))

const SearchBar = ({ onSearchSubmit }) => {
  const classes = useStyles()

  const [city, setCity] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

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
    <div className="search-bar">
      <TextField
        id="margin-none"
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={classes.textField}
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
        className={classes.textField}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBar
