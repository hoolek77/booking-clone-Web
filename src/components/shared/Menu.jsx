import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from './Dropdown'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

// EXAMPLE USAGE:

// import Menu from './shared/Menu'

// const routes = [
//   {
//     location: '/',
//     name: 'Main Page',
//   },
//   {
//     location: '/register',
//     name: 'Register',
//   },
//   {
//     location: '/',
//     name: 'test',
//     type: 'dropdown',
//     dropdownItems: [
//       {
//         location: '/',
//         name: 'Main Page',
//       },
//       {
//         location: '/register',
//         name: 'Register',
//       },
//     ],
//   },
// ]

// const classes = {
//   navBar: 'bg-light',
// }

// const component = () => {
//   return <Menu menuItems={routes} cssClasses={classes} />
// }

const Menu = ({ menuItems, cssClasses }) => {
  const classes = cssClasses ? cssClasses : {}
  return (
    <Navbar className={`justify-content-center ${classes.navBar}`}>
      <Nav className={classes.nav}>
        {menuItems.map((menuItem) => {
          const { location, name } = menuItem
          if (menuItem.type === 'dropdown') {
            return (
              <NavDropdown
                title={name}
                id="basic-nav-dropdown"
                className={`${classes.navDropdown}`}
              >
                <Dropdown
                  dropdownItems={menuItem.dropdownItems}
                  classes={classes}
                />
              </NavDropdown>
            )
          } else {
            return (
              <Link className={`nav-link ${classes.navLink}`} to={location}>
                {name}
              </Link>
            )
          }
        })}
      </Nav>
    </Navbar>
  )
}

export default Menu
