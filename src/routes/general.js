import React from 'react'
import { Route } from 'react-router-dom'
import App from '../App'
import { HotelMoreDetails, Register, Help } from '../components'
import { Hotels } from '../components/views/mainPageView/Hotels'
import { NoMatch } from '../components/NoMatch'

const generalRoutes = [
  <Route exact path="/" component={() => <App />} key="app-route" />,
  <Route
    exact
    path="/register"
    component={() => <Register />}
    key="app-register"
  />,
  <Route
    path="/hotels/:data/:id"
    render={(props) => (
      <HotelMoreDetails
        hotelId={props.match.params.id}
        city={props.match.params.data}
        {...props}
      />
    )}
    key="app-hotelDetails"
  />,
  <Route
    path="/hotels/:data"
    render={(props) => <Hotels {...props} />}
    key="app-hotelsByCity"
  />,
  <Route path="/needHelp" component={() => <Help />} />,
  <Route path="*" key="NoMatch">
    <NoMatch />
  </Route>,
]

export default generalRoutes
