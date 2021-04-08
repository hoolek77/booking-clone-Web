import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import LoadingIcon from '../../../shared/LoadingIcon'
import { SELECT_MENU_PROPS } from '../../../../constants'
import { useFindCities } from '../../../../hooks'

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export const LocalizationStep = ({
  setCountry,
  setCity,
  setZipcode,
  setBuildingNumber,
  setStreet,
  city,
}) => {
  const classes = useStyles()
  const [cities, isPending] = useFindCities()

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight:
          SELECT_MENU_PROPS.ITEM_HEIGHT * 4.5 +
          SELECT_MENU_PROPS.ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      {isPending ? (
        <LoadingIcon />
      ) : (
        <>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            color="secondary"
            required
            MenuProps={MenuProps}
          >
            {cities.map(({ name }, index) => {
              return (
                <MenuItem value={name} key={index + name}>
                  {name}
                </MenuItem>
              )
            })}
          </Select>
        </>
      )}
      <TextField
        id="standard-basic"
        label="Street"
        onChange={(e) => setStreet(e.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Zip Code"
        onChange={(e) => setZipcode(e.target.value)}
      />
      <TextField
        id="standard-number"
        type="number"
        label="Building Number"
        onChange={(e) => setBuildingNumber(e.target.value)}
      />
    </form>
  )
}
