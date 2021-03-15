import React from 'react'
import { Route } from 'react-router-dom'
import { HotelOwnerView } from '../components'

const hotelOwnerRoutes = [
    <Route path="/hotelOwner" component={ () => <HotelOwnerView /> } exact key="hotelOwner-route"/>,
]


export default hotelOwnerRoutes;