import React, { useState } from 'react';
import './PaymentModal.css';

const PaymentModal = ({ 
  showPaymentModal, 
  setShowPaymentModal, 
  directCheckoutItem,
  clearCart,
  closeCart
}) => {
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const getOrderTotal = () => {
    return directCheckoutItem.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setOrderSuccess(true);
      clearCart();
      // Auto-close after success
      setTimeout(() => {
        setShowPaymentModal(false);
        setOrderSuccess(false);
        closeCart();
      }, 3000);
    }, 1500);
  };
  
  const handleClose = () => {
    setShowPaymentModal(false);
    setOrderSuccess(false);
  };
  
  if (!showPaymentModal) return null;
  
  return (
    <div className="payment-modal-overlay" onClick={handleClose}>
      <div className="payment-modal" onClick={e => e.stopPropagation()}>
        {orderSuccess ? (
          <div className="order-success">
            <h2>Order Successful!</h2>
            <div className="success-icon">✓</div>
            <p>Your payment has been processed successfully.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Secure Checkout</h2>
              <button 
                className="close-modal" 
                onClick={handleClose}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="order-summary">
                <h3>Order Summary</h3>
                {directCheckoutItem.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.title} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="order-total">
                  <span>Total:</span>
                  <span>₹{getOrderTotal()}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="payment-form">
                <h3>Payment Information</h3>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={paymentInfo.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Card Number</label>
                  <input 
                    type="text" 
                    name="cardNumber" 
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiry" 
                      value={paymentInfo.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>CVV</label>
                    <input 
                      type="text" 
                      name="cvv" 
                      value={paymentInfo.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required 
                    />
                  </div>
                </div>
                
                <button type="submit" className="pay-now-btn">
                  Pay ₹{getOrderTotal()}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;