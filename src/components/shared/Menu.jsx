import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

import { Dropdown } from './Dropdown'

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
                className={classes.navDropdown}
              >
                <Dropdown
                  dropdownItems={menuItem.dropdownItems}
                  classes={classes}
                />
              </NavDropdown>
            )
          } else {
            return (
              <Link
                className={`nav-link ${classes.navLink} ${
                  window.location.pathname === menuItem.location
                    ? 'nav-link__active'
                    : null
                }`}
                to={location}
                key={menuItem.name}
              >
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
