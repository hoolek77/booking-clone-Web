import React from 'react'
import { TextField, Input, CircularProgress } from '@material-ui/core'

import { fetchData, saveCookie, loadUserInfo } from '../utils'
import { COOKIE_TOKEN } from '../constants'

export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      form: {
        email: '',
        password: '',
      },
      logging: false,
    }

    this.login.bind(this)
    this.handleEmailChange.bind(this)
    this.handlePasswordChange.bind(this)
  }

  async login(e) {
    e.preventDefault()
    this.setState({ logging: true })

    try {
      const { token } = await fetchData(
        global.API_BASE_URL + 'api/auth/login',
        'POST',
        this.state.form
      )

      const cookieOpt = {
        cname: COOKIE_TOKEN,
        cvalue: token,
        expiredHours: 1,
      }

      saveCookie(cookieOpt)
      await loadUserInfo()

      this.setState({ logging: false })
      window.location.href = '/'
    } catch (err) {
      alert(err.message)

      this.setState({ logging: false })
    }
  }

  handleEmailChange(e) {
    this.setState({ form: { ...this.state.form, email: e.target.value } })
  }

  handlePasswordChange(e) {
    this.setState({ form: { ...this.state.form, password: e.target.value } })
  }

  render() {
    return (
      <form id="Login" onSubmit={(e) => this.login(e)} autoComplete="on">
        <TextField
          id="outlined-basic"
          className="loginTextField"
          label="Login"
          type="email"
          size="small"
          variant="outlined"
          onChange={(e) => this.handleEmailChange(e)}
          noValidate
          required
          margin="dense"
          color="secondary"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          size="small"
          variant="outlined"
          onChange={(e) => this.handlePasswordChange(e)}
          noValidate
          required
          margin="dense"
          color="secondary"
        />
        {!this.state.logging ? (
          <>
            <Input
              type="submit"
              value="Login"
              className="loginInput"
              color="secondary"
            />
          </>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </form>
    )
  }
}
