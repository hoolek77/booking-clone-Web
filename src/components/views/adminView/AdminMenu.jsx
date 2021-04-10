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
    type: 'dropdown',
    name: 'City',
    location: '/',
    dropdownItems: [
      {
        location: '/admin/cities',
        name: 'Add City',
      },
      {
        location: '/admin/getCities',
        name: 'Get Cities',
      },
    ],
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
