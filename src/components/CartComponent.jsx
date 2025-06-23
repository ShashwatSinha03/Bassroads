import React from 'react';
import { Link } from 'react-router-dom';
import './CartComponent.css';

const CartComponent = ({ 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  getCartTotal,
  handleCheckout,
  showCart,
  closeCart
}) => {
  if (!showCart) return null;

  // Safely calculate and format total amount
  const calculateDisplayTotal = () => {
    const total = getCartTotal();
    
    // Handle cases where total might be NaN
    if (isNaN(total)) {
      console.error('Invalid total value detected:', total);
      return '0.00';
    }
    
    // Format to 2 decimal places
    return parseFloat(total).toFixed(2);
  };

  const displayTotal = calculateDisplayTotal();

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Your Cart</h1>
          <button className="close-cart" onClick={closeCart}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="continue-shopping" onClick={closeCart}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>₹{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{displayTotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{displayTotal}</span>
              </div>
              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <Link to="/" className="continue-shopping" onClick={closeCart}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;