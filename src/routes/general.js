import React from 'react'
import { Route } from 'react-router-dom'
import App from '../App'

const generalRoutes = [
    <Route exact path="/" component={() => <App />} key="app-route" />
]


export default generalRoutes;