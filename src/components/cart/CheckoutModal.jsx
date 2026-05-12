import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../../store/useCartStore';
import useThemeStore from '../../store/useThemeStore';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { theme } = useThemeStore();
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setOrderPlaced(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
    });
    onClose();
  };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', label: 'UPI', icon: Smartphone },
    { id: 'netbanking', label: 'Net Banking', icon: Building },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto z-50 rounded-2xl ${
              theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'
            } shadow-2xl p-6`}
          >
            {orderPlaced ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                  Order Placed!
                </h2>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Thank you for your purchase. Your order is being processed.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-[#01172F] text-white font-medium rounded-full hover:bg-[#632C38] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                    Checkout
                  </h2>
                  <button
                    onClick={handleClose}
                    className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className={`mb-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                  <div className="flex justify-between mb-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Items ({items.length})</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-700'}>₹{getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className={`flex justify-between pt-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>Total</span>
                    <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                      ₹{getTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'dark'
                          ? 'bg-[#1A1A1A] border-gray-700 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } focus:outline-none focus:border-[#632C38]`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-[#1A1A1A] border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        } focus:outline-none focus:border-[#632C38]`}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-[#1A1A1A] border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        } focus:outline-none focus:border-[#632C38]`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={2}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === 'dark'
                          ? 'bg-[#1A1A1A] border-gray-700 text-white'
                          : 'bg-gray-50 border-gray-200 text-gray-900'
                      } focus:outline-none focus:border-[#632C38]`}
                      placeholder="123 Main Street, Apt 4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-[#1A1A1A] border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        } focus:outline-none focus:border-[#632C38]`}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-[#1A1A1A] border-gray-700 text-white'
                            : 'bg-gray-50 border-gray-200 text-gray-900'
                        } focus:outline-none focus:border-[#632C38]`}
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === method.id
                              ? 'border-[#632C38] bg-[#632C38]/10'
                              : theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <method.icon className={`w-6 h-6 mx-auto mb-1 ${
                            paymentMethod === method.id ? 'text-[#632C38]' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`} />
                          <span className={`text-xs font-medium ${
                            paymentMethod === method.id ? 'text-[#632C38]' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {method.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#01172F] text-white font-bold rounded-xl hover:bg-[#632C38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${getTotal().toLocaleString()}`}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;