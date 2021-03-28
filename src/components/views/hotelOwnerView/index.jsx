import React from 'react'
import { isHotelOwnerVerified } from '../../../utils'
import Menu from '../../shared/Menu'
import { menuItems, classes } from './menuConfigHotelOwner'
import AddHotel from './AddHotel'
import ShowAll from './ShowAll'
import Reservations from './Reservations'

export const HotelOwnerView = ({ location }) => {
  const handleRouteChange = (path) => {
    switch (path) {
      case '/hotelOwner/addHotel':
        return <AddHotel />
      case '/hotelOwner/showAll':
        return <ShowAll />
      case '/hotelOwner/reservations':
        return <Reservations />
      default:
        return
    }
  }

  return (
    <>
      {isHotelOwnerVerified() ? (
        <>
          <Menu menuItems={menuItems} cssClasses={classes} />
          {handleRouteChange(location.pathname)}
        </>
      ) : (
        <div className="owner-not-verified">
          <h2>You are not verified yet.</h2>
          <h3>Contact our help center at helpcenter@booking-clone.com</h3>
        </div>
      )}
    </>
  )
}
