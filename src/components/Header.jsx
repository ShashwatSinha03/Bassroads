import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './Header.css';
import logo from "../assets/br_logo.png";
import cart from '../assets/cart.png';
import user from '../assets/user.png';
import productsData from '../data/products.json';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = productsData.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredProducts.length > 0) {
      navigate(`/product/${filteredProducts[0].id}`);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  // New logo click handler
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="explore">
      <Link to="/">Home</Link>
      <Link to="/explore">Explore</Link>
        <a href="#">Support</a>
      </div>

      <div 
        className="logo" 
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
        <img src={logo} alt="logo" className="logo-img" />
        <h1 className="logo-txt">BASSROADS</h1>
      </div>

      <div className="profile">
        <div className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="search" 
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </form>
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="suggestions-dropdown">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  <span className="suggestion-title">{product.title}</span>
                  <span className="suggestion-price">₹{product.price}</span>
                </div>
              ))}
            </div>
          )}
          {showSuggestions && filteredProducts.length === 0 && searchTerm && (
            <div className="suggestions-dropdown">
              <div className="no-results">No products found</div>
            </div>
          )}
        </div>
        <img src={cart} alt="Cart" className="cart-icon" />
        <img src={user} alt="User Profile" className="profile-icon" />
      </div>
    </div>
  );
};

export default Header;