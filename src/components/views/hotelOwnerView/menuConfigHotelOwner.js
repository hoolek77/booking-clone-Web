export const menuItems = [
  {
    name: 'Hotels',
    location: '/',
    type: 'dropdown',
    dropdownItems: [
      {
        location: '/hotelOwner/showAll',
        name: 'Show All',
      },
      {
        location: '/editMyHotels',
        name: 'Edit Hotels',
      },
      {
        location: '/hotelOwner/addHotel',
        name: 'Add Hotels',
      },
      {
        location: '/removeMyHotels',
        name: 'Remove Hotels',
      },
    ],
  },
  {
    location: '/hotelOwner/reservations',
    name: 'Reservations',
  },
]

export const classes = {
  navBar: 'bg-light',
}
