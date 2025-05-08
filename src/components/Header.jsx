import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="explore">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/support">Support</Link> {/* Updated Support link */}
      </div>

      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="Bassroads logo" className="logo-img" />
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
              aria-label="Search products"
            />
          </form>
          {showSuggestions && (
            <div className="suggestions-dropdown">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product.id)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleSuggestionClick(product.id)}
                  >
                    <span className="suggestion-title">{product.title}</span>
                    <span className="suggestion-price">₹{product.price}</span>
                  </div>
                ))
              ) : (
                <div className="no-results">No products found</div>
              )}
            </div>
          )}
        </div>
        <Link to="/cart" className="icon-link">
          <img src={cart} alt="Shopping cart" className="cart-icon" />
        </Link>
        <Link to="/profile" className="icon-link">
          <img src={user} alt="User profile" className="profile-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Header;