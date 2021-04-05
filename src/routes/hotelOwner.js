import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { HotelOwnerView } from '../components'
import { isHotelOwner } from '../utils/veryfication'

const PrivateRouteHotelOwner = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isHotelOwner() ? (
          <HotelOwnerView {...props} />
        ) : (
          <Redirect to="/" />
        )
      }}
    />
  )
}

const hotelOwnerRoutes = [
  <PrivateRouteHotelOwner path="/hotelOwner" exact key="hotelOwner-route" />,
  <PrivateRouteHotelOwner
    path="/hotelOwner/addHotel"
    exact
    key="hotelOwner-route"
  />,
  <PrivateRouteHotelOwner
    path="/hotelOwner/showAll"
    exact
    key="hotelOwner-route"
  />,
  <PrivateRouteHotelOwner
    path="/hotelOwner/reservations"
    exact
    key="hotelOwner-route"
  />,
  <PrivateRouteHotelOwner
    path="/hotelOwner/removeMyHotels"
    exact
    key="hotelOwner-route"
  />,
]

export default hotelOwnerRoutes
