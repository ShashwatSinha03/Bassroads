import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import NewArrivals from './pages/NewArrivals';
import Deals from './pages/Deals';
import Login from './pages/Login';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/cart/CheckoutModal';
import useThemeStore from './store/useThemeStore';

function App() {
  const { theme } = useThemeStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setCartOpen(true);
    const handleOpenCheckout = () => setCheckoutOpen(true);
    
    window.addEventListener('open-cart', handleOpenCart);
    window.addEventListener('open-checkout', handleOpenCheckout);
    
    return () => {
      window.removeEventListener('open-cart', handleOpenCart);
      window.removeEventListener('open-checkout', handleOpenCheckout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className={theme === 'dark' ? 'bg-[#0A0A0A] min-h-screen' : 'bg-white min-h-screen'}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        </Router>
      </div>
    </div>
  );
}

export default App;