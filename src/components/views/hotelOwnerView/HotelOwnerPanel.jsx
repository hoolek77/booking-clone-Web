import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Menu from '../../shared/Menu'
import { menuItems, classes } from './menuConfigHotelOwner'
import AddHotel from './AddHotel'

const HotelOwnerPanel = () => {
  return (
    <BrowserRouter>
      <Menu menuItems={menuItems} cssClasses={classes} />
      <Switch>
        <Route
          path="/addMyHotel"
          component={() => <AddHotel />}
          exact
          key="hotelOwner-route"
        />
        ,
      </Switch>
    </BrowserRouter>
  )
}

export default HotelOwnerPanel
