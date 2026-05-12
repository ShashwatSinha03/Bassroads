import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useThemeStore from '../../store/useThemeStore';
import useUserStore from '../../store/useUserStore';
import { products } from '../../data/products';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = useCartStore((state) => state.getItemCount());
  const { theme, toggleTheme } = useThemeStore();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (searchTerm.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-[#0A0A0A] border-b border-[#1A1A1A]' : 'bg-white border-b border-gray-200'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#01172F] flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              BASSROADS
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#632C38] ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className={`w-64 pl-10 pr-4 py-2 rounded-full text-sm border ${
                    theme === 'dark'
                      ? 'bg-[#1A1A1A] border-gray-700 text-white placeholder-gray-500'
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:border-[#632C38] transition-colors`}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </form>
              {showSuggestions && filteredProducts.length > 0 && (
                <div className={`absolute top-full mt-2 w-full rounded-lg shadow-lg overflow-hidden ${
                  theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'
                }`}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product.id)}
                      className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                        theme === 'dark' ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`text-sm truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {product.name}
                      </span>
                      <span className="text-sm font-medium text-[#632C38]">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#01172F]'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/wishlist"
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#01172F]'
              }`}
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              to="#"
              className={`p-2 rounded-full relative transition-colors ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#01172F]'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('open-cart'));
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#632C38] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to={isLoggedIn ? '#' : '/login'}
              className={`p-2 rounded-full transition-colors hidden sm:block ${
                theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#01172F]'
              }`}
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full md:hidden transition-colors ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full text-sm border ${
                  theme === 'dark'
                    ? 'bg-[#1A1A1A] border-gray-700 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-900'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;