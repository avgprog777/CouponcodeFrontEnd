import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
    <div className="navbar-container">
        <a href="/Home" className="navbar-logo">Coupon Code </a>
        <ul className="navbar-menu">
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>
  </nav>
  )
}

export default Navbar