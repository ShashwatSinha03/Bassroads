import React from 'react'
import './Header.css'
import logo from "../assets/br_logo.png"
const Header = () => {
  return (
    <>
    <div className="header">
      <div className="explore">
        <a href="#">Shop</a>
        <a href="#">Explore</a>
        <a href="#">Support</a>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="logo_txt">BASSROADS</h1>
      </div>
      <div className="profile">
        <input type="text" className="search" placeholder='Search'/>
        <img src="" alt="" className="cart" />
        <img src="" alt="" className="profile" />
      </div>
    </div>
    </>
  )
}

export default Header