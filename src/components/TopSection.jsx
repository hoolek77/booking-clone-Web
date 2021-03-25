import React, { useMemo, useState } from 'react'
import { COOKIE_TOKEN } from '../constants'
import { getUserInfo, removeCookie } from '../utils'
import { Login } from './Login'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { isUserLoggedIn } from '../utils'
import '../content/css/topSection.css'

export const TopSection = () => {
  const [userInfo, setUserInfo] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useMemo(() => {
    const isLogged = isUserLoggedIn()
    if (isLogged) {
      const data = getUserInfo()
      setUserInfo(data)
      setIsLoggedIn(true)
    }
  }, [])

  const logout = () => {
    localStorage.clear('userInfo')
    removeCookie(COOKIE_TOKEN)
    window.location.href = '/'
  }

  return (
    <div id="TopSection" style={{ padding: '5px 0 5px 0' }}>
      <Container fixed>
        <Grid
          container
          justify="space-around"
          alignItems="center"
          style={{
            height: '15vh',
          }}
        >
          <Grid item xs={3}>
            <div className="loginHeader">
              Booking <span className="loginHeaderSpan">Clone</span>
            </div>
          </Grid>
          <Grid item xs={9}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {isLoggedIn ? (
                <div className="loginUserInfo">
                  Willkommen {userInfo.firstName} {userInfo.lastName} !
                </div>
              ) : (
                <Login />
              )}
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              {isLoggedIn ? (
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button size="small" variant="contained" color="secondary">
                    {userInfo.role} panel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={logout}
                    color="secondary"
                  >
                    logout
                  </Button>
                </Grid>
              ) : (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <a href="#" className="loginForgotPassword">
                    FORGOT PASSWORD
                  </a>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
