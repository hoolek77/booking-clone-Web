import React from 'react'
import { Route } from 'react-router-dom'
import { AdminView } from '../components'

const adminRoutes = [
  <Route
    path="/admin"
    component={() => <AdminView />}
    exact
    key="admin-route"
  />,
  <Route
    path="/admin/users"
    key="admin-route-users"
    render={(props) => <AdminView {...props} />}
    exact
  />,
  <Route
    path="/admin/hotelowners"
    key="admin-route-hotelowners"
    render={(props) => <AdminView {...props} />}
    exact
  />,
  <Route
    path="/admin/reservations"
    key="admin-route-reservations"
    render={(props) => <AdminView {...props} />}
    exact
  />,
  <Route
    path="/admin/cities"
    key="admin-route-cities"
    render={(props) => <AdminView {...props} />}
    exact
  />,
  <Route
    path="/admin/getCities"
    key="admin-route-cities"
    render={(props) => <AdminView {...props} />}
    exact
  />,
]

export default adminRoutes
