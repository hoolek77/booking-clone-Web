import Menu from '../../shared/Menu'
import React from 'react'

const routes = [
  {
    location: '/admin/users',
    name: 'Users',
  },
  {
    location: '/admin/hotelowners',
    name: 'Hotel Owners',
  },
  {
    location: '/admin/reservations',
    name: 'Reservations',
  },
]

const classes = {
  navBar: 'bg-light',
}

export const AdminMenu = () => {
  return (
    <div>
      <Menu menuItems={routes} cssClasses={classes} />
    </div>
  )
}
