import React from 'react'
import { TextField, CircularProgress } from '@material-ui/core'
import { fetchData, saveCookie } from '../utils'
import { COOKIE_TOKEN, HOTEL_OWNER_ROLE, USER_ROLE } from '../constants'
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
} from '@material-ui/core'
import '../content/css/register.css'

export class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    }

    this.register.bind(this)
    this.handleEmailChange.bind(this)
    this.handlePasswordChange.bind(this)
    this.handleRepeatPasswordChange.bind(this)
    this.handleFirstNameChange.bind(this)
    this.handleLastNameChange.bind(this)
    this.handleRoleChange.bind(this)
    this.handlePhoneNumberChange.bind(this)
    this.handlePhoneNumberCheckboxChange.bind(this)
  }

  async register(e) {
    e.preventDefault()
    this.setState({ registering: true })

    try {
      const { token } = await fetchData(
        global.API_BASE_URL + 'api/auth/register',
        'POST',
        this.state.form
      )

      const cookieOpt = {
        cname: COOKIE_TOKEN,
        cvalue: token,
        expiredHours: 1,
      }

      saveCookie(cookieOpt)
      window.location.href = '/'

      this.setState({ registering: false })
    } catch (err) {
      alert(err.message)

      this.setState({ registering: false })
    }
  }

  handleEmailChange(e) {
    this.setState({ form: { ...this.state.form, email: e.target.value } })
  }

  handlePasswordChange(e) {
    this.setState({ form: { ...this.state.form, password: e.target.value } })
  }

  handleRepeatPasswordChange(e) {
    this.setState({
      form: { ...this.state.form, repeatPassword: e.target.value },
    })
  }

  handleFirstNameChange(e) {
    this.setState({ form: { ...this.state.form, firstName: e.target.value } })
  }

  handleLastNameChange(e) {
    this.setState({ form: { ...this.state.form, lastName: e.target.value } })
  }

  handleRoleChange(e) {
    this.setState({ form: { ...this.state.form, role: e.target.value } })
  }

  handlePhoneNumberChange(e) {
    this.setState({ form: { ...this.state.form, phoneNumber: e.target.value } })
  }

  handlePhoneNumberCheckboxChange(e) {
    this.setState({
      form: { ...this.state.form, isSmsAllowed: e.target.checked },
    })
  }

  render() {
    return (
      <div className="form-container">
        <form
          id="Register"
          onSubmit={(e) => this.register(e)}
          autoComplete="on"
          className="register-form"
        >
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} sm={6} className="grid-form-box">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-end"
                spacing={3}
                className="align-center-mobile"
              >
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={(e) => this.handleEmailChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => this.handlePasswordChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Repeat Password"
                    type="password"
                    variant="outlined"
                    onChange={(e) => this.handleRepeatPasswordChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} className="grid-form-box">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={3}
                className="align-center-mobile"
              >
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    onChange={(e) => this.handleFirstNameChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    onChange={(e) => this.handleLastNameChange(e)}
                    noValidate
                    required
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12} className="select-input text-align-left">
                  <FormControl style={{ minWidth: 223 }}>
                    <InputLabel id="demo-simple-select-label" color="secondary">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.form.role}
                      onChange={(e) => this.handleRoleChange(e)}
                      color="secondary"
                    >
                      <MenuItem value={USER_ROLE}>User</MenuItem>
                      <MenuItem value={HOTEL_OWNER_ROLE}>Hotel Owner</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className="text-align-right align-center-mobile"
                >
                  {this.state.form.isSmsAllowed ? (
                    <TextField
                      id="outlined-basic"
                      type="tel"
                      label="Phone Number"
                      variant="outlined"
                      onChange={(e) => this.handlePhoneNumberChange(e)}
                      noValidate
                      required
                      color="secondary"
                    />
                  ) : (
                    <TextField
                      id="outlined-basic"
                      type="tel"
                      label="Phone Number"
                      variant="outlined"
                      onChange={(e) => this.handlePhoneNumberChange(e)}
                      noValidate
                      color="secondary"
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className="text-align-left align-center-mobile"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.form.isSmsAllowed}
                        onChange={(e) =>
                          this.handlePhoneNumberCheckboxChange(e)
                        }
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

            {!this.state.registering ? (
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
              <Grid item xs={12} sm={6}>
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
}
