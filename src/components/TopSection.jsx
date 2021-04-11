import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { COOKIE_TOKEN, HOTEL_OWNER_ROLE } from '../constants'
import { removeCookie } from '../utils'
import { Login } from './Login'
import { useUserStatus } from '../hooks'
import useNotification from '../hooks/useNotification'

export const TopSection = () => {
  const [isLogged, userInfo] = useUserStatus()

  const logout = () => {
    localStorage.clear('userInfo')
    removeCookie(COOKIE_TOKEN)
    window.location.href = '/'
  }
  const { openNotification } = useNotification()

  return (
    <div id="TopSection" className="topSectionContainer">
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <a href="/" className="topSectionHeaderlink">
          Booking <span className="loginHeaderSpan">Clone</span>
        </a>
      </Grid>

      {isLogged ? (
        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
          className="loggedGrid"
        >
          <div className="loginUserInfo">
            Willkommen {userInfo.firstName} {userInfo.lastName} !
          </div>
          <div className="loggedButtonContainer">
            <Link to={`/${userInfo.role}`} style={{ textDecoration: 'none' }}>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                style={{ marginRight: '5%' }}
              >
                <div className="panelButton">
                  {userInfo.role === HOTEL_OWNER_ROLE
                    ? 'Hotel Owner'
                    : userInfo.role}{' '}
                  panel
                </div>
              </Button>
            </Link>
            <Button
              size="small"
              variant="contained"
              onClick={logout}
              color="secondary"
            >
              logout
            </Button>
          </div>
        </Grid>
      ) : (
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className="loginContainer"
        >
          <Grid item>
            <Login openNotification={openNotification} />
            <div className="loginButtonContainer">
              <a href="#" className="loginForgotPassword loginLink">
                FORGOT PASSWORD
              </a>
              <Link to={`/register`} className="loginLink">
                <Button size="small" variant="contained" color="secondary">
                  REGISTER
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  )
}
