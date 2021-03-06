import React from 'react'
import { Route } from 'react-router-dom'
import { AdminView } from '../components'

const adminRoutes = [
    <Route path="/admin" component={() => <AdminView />} exact key="admin-route"/>,
]


export default adminRoutes;