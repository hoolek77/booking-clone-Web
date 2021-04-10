import React, { useState } from 'react'
import {
  TextField,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from '@material-ui/core'

import { fetchData, saveCookie, loadUserInfo } from '../utils'
import { COOKIE_TOKEN, HOTEL_OWNER_ROLE, USER_ROLE } from '../constants'
import useNotification from '../hooks/useNotification'

export const Register = () => {
  const { openNotification } = useNotification()
  const [state, setState] = useState({
    form: {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
      role: 'user',
      phoneNumber: '',
      isSmsAllowed: false,
    },
    registering: false,
  })

  const register = async (e) => {
    e.preventDefault()
    setState({ ...state, registering: true })

    try {
      const { token } = await fetchData(
        global.API_BASE_URL + 'api/auth/register',
        'POST',
        state.form
      )

      const cookieOpt = {
        cname: COOKIE_TOKEN,
        cvalue: token,
        expiredHours: 1,
      }

      saveCookie(cookieOpt)
      await loadUserInfo()

      setState({ ...state, registering: false })
      window.location.href = '/'
    } catch (err) {
      openNotification(err.message, 'error')

      setState({ ...state, registering: false })
    }
  }

  function handleEmailChange(e) {
    setState({ ...state, form: { ...state.form, email: e.target.value } })
  }

  function handlePasswordChange(e) {
    setState({ ...state, form: { ...state.form, password: e.target.value } })
  }

  function handleRepeatPasswordChange(e) {
    setState({
      ...state,
      form: { ...state.form, repeatPassword: e.target.value },
    })
  }

  function handleFirstNameChange(e) {
    setState({ ...state, form: { ...state.form, firstName: e.target.value } })
  }

  function handleLastNameChange(e) {
    setState({ ...state, form: { ...state.form, lastName: e.target.value } })
  }

  function handleRoleChange(e) {
    setState({ ...state, form: { ...state.form, role: e.target.value } })
  }

  function handlePhoneNumberChange(e) {
    setState({ ...state, form: { ...state.form, phoneNumber: e.target.value } })
  }

  function handlePhoneNumberCheckboxChange(e) {
    setState({
      form: { ...state, ...state.form, isSmsAllowed: e.target.checked },
    })
  }

  return (
    <div className="form-container">
      {console.log(state)}
      <form
        id="Register"
        onSubmit={(e) => register(e)}
        autoComplete="on"
        className="register-form"
      >
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className="gridContainer"
        >
          <Grid item xs={12} sm={6} className="grid-form-box width95">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-end"
              className="align-center-mobile width95"
            >
              <Grid item xs={12} className="width95">
                <TextField
                  className="width95"
                  id="outlined-basic"
                  label="Email"
                  type="email"
                  variant="outlined"
                  onChange={(e) => handleEmailChange(e)}
                  noValidate
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} className="width95">
                <TextField
                  className="width95"
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => handlePasswordChange(e)}
                  noValidate
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} className="width95">
                <TextField
                  className="width95"
                  id="outlined-basic"
                  label="Repeat Password"
                  type="password"
                  variant="outlined"
                  onChange={(e) => handleRepeatPasswordChange(e)}
                  noValidate
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} className="width95">
                {state.form.isSmsAllowed ? (
                  <TextField
                    className="width95"
                    id="outlined-basic"
                    type="tel"
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => handlePhoneNumberChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                ) : (
                  <TextField
                    className="width95"
                    id="outlined-basic"
                    type="tel"
                    label="Phone Number"
                    variant="outlined"
                    onChange={(e) => handlePhoneNumberChange(e)}
                    noValidate
                    color="secondary"
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className="grid-form-box width95">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              className="align-center-mobile width95"
            >
              <Grid item xs={12} className="width95">
                <TextField
                  className="width95"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  onChange={(e) => handleFirstNameChange(e)}
                  noValidate
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} className="width95">
                <TextField
                  className="width95"
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => handleLastNameChange(e)}
                  noValidate
                  required
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12} className="width95">
                <FormControl className="width95">
                  <InputLabel id="demo-simple-select-label" color="secondary">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.form.role}
                    onChange={(e) => handleRoleChange(e)}
                    color="secondary"
                  >
                    <MenuItem value={USER_ROLE}>User</MenuItem>
                    <MenuItem value={HOTEL_OWNER_ROLE}>Hotel Owner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className="width95">
                <FormControlLabel
                  control={
                    <Checkbox
                      className="chackboxAllowSms"
                      checked={state.form.isSmsAllowed}
                      onChange={(e) => handlePhoneNumberCheckboxChange(e)}
                      inputProps={{
                        'aria-label': 'secondary checkbox',
                      }}
                    />
                  }
                  label="Allow SMS"
                />
              </Grid>
            </Grid>
          </Grid>

          {!state.registering ? (
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
              >
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
    </div>
  )
}
