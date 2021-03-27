import React from 'react'
import { isHotelOwnerVerified } from '../../../utils'
import Menu from '../../shared/Menu'
import { menuItems, classes } from './menuConfigHotelOwner'
import '../../../content/css/hotelOwner.css'
import AddHotel from './AddHotel'
import ShowAll from './ShowAll'

export const HotelOwnerView = ({ location }) => {
  const handleRouteChange = (path) => {
    if (path === '/hotelOwner/addHotel') {
      return <AddHotel />
    } else if (path === '/hotelOwner/showAll' || path === '/hotelOwner') {
      return <ShowAll />
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
