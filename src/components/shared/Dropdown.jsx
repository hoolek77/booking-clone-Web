import React from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const Dropdown = ({ dropdownItems, classes }) => {
  return (
    <>
      {dropdownItems.map((item) => {
        const { location, name } = item

        return (
          <NavDropdown.Item
            className={`${classes.navDropdownItem} nav-dropdown ${
              window.location.pathname === item.location
                ? 'nav-link__active'
                : null
            }`}
          >
            <Link
              to={location}
              className={`nav-link ${classes.NavDropdownLink} ${
                window.location.pathname === item.location
                  ? 'nav-link__active'
                  : null
              }`}
            >
              {name}
            </Link>
          </NavDropdown.Item>
        )
      })}
    </>
  )
}
