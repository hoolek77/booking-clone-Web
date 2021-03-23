import React from 'react'
import '../../content/css/footer.css'
import { Link } from 'react-router-dom'
export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="copyright">&copy; Booking Clone, 2021</div>
      <Link to="/needHelp" className="needHelp">
        Need help?
      </Link>
    </footer>
  )
}
