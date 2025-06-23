import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Display from './components/Display';
import Explore from './components/Explore';
import ProductDetails from './components/ProductDetails';
import Support from './components/Support';
import CartComponent from './components/CartComponent';
import PaymentModal from './components/PaymentModal';
import Login from './components/Login';
import Signup from './components/Signup';
import productsData from './data/products.json';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cart functions
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      } else {
        return [...prevItems, {...product, quantity: 1}];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? {...item, quantity: newQuantity} : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity, 0
    );
  };

  const handleBuyNow = (product) => {
    setDirectCheckoutItem([{...product, quantity: 1}]);
    setShowPaymentModal(true);
  };

  const handleCheckout = () => {
    setDirectCheckoutItem([...cartItems]);
    setShowPaymentModal(true);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => {
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  // Calculate cart count for header
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Handle login state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header 
          cartCount={cartCount}
          openCart={openCart}
          products={productsData.products}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <Categories />
                  <Display />
                </>
              } 
            />

            <Route 
              path="/explore" 
              element={<Explore />} 
            />

            <Route 
              path="/product/:id" 
              element={
                <ProductDetails 
                  addToCart={addToCart}
                  handleBuyNow={handleBuyNow}
                  products={productsData.products}
                />
              } 
            />

            <Route 
              path="/support" 
              element={<Support />} 
            />

            <Route 
              path="/login" 
              element={<Login handleLogin={handleLogin} />} 
            />

            <Route 
              path="/signup" 
              element={<Signup handleLogin={handleLogin} />} 
            />
          </Routes>
        </main>

        <Footer />
        
        <CartComponent 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          getCartTotal={getCartTotal}
          closeCart={closeCart}
          handleCheckout={handleCheckout}
          showCart={showCart}
        />
        
        <PaymentModal 
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          directCheckoutItem={directCheckoutItem}
          clearCart={clearCart}
          closeCart={closeCart}
        />
      </div>
    </Router>
  );
}

export default App;