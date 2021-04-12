import React from 'react'
import { WelcomePage } from './WelcomePage'
import { menuItems, classes } from './menuConfigUser'
import Menu from '../../shared/Menu'
import Reservations from './Reservations'

const UserView = ({ location }) => {
  const handleRouteChange = (path) => {
    switch (path) {
      case '/user':
        return <WelcomePage />
      case '/user/reservations':
        return <Reservations />
      default:
        return
    }
  }

  return (
    <>
      <Menu menuItems={menuItems} cssClasses={classes} />
      {handleRouteChange(location.pathname)}
    </>
  )
}

export default UserView
