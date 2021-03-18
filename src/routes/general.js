import React from 'react'
import { Route } from 'react-router-dom'
import App from '../App'
import { Register } from '../components'

const generalRoutes = [
  <Route exact path="/" component={() => <App />} key="app-route" />,
  <Route path="/register" component={() => <Register />} />,
]

export default generalRoutes
