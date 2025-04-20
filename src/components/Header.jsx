import React, { useState } from 'react';
import './Header.css';
import logo from "../assets/br_logo.png";
import cart from '../assets/cart.png';
import user from '../assets/user.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    console.log('Search term:', value);
  };

  return (
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
        <input 
          type="text" 
          className="search" 
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img src={cart} alt="Cart" className="cart" />
        <img src={user} alt="User Profile" className="profile" />
      </div>
    </div>
  );
};

export default Header;