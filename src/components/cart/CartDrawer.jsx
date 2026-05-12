import React, { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useThemeStore from '../../store/useThemeStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const { theme } = useThemeStore();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();

  useEffect(() => {
    const handleOpenCart = () => {
      document.dispatchEvent(new CustomEvent('open-cart-drawer'));
    };
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  useEffect(() => {
    const handleOpenDrawer = () => {
      onOpen();
    };
    window.addEventListener('open-cart-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-cart-drawer', handleOpenDrawer);
  }, [onOpen]);

  const onOpen = () => {
    const event = new CustomEvent('toggle-cart', { detail: { open: true } });
    window.dispatchEvent(event);
  };

  const handleCheckout = () => {
    onClose();
    document.dispatchEvent(new CustomEvent('open-checkout'));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md z-50 ${
              theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'
            } shadow-2xl`}
          >
            <div className="flex flex-col h-full">
              <div className={`flex items-center justify-between p-4 border-b ${
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                  Your Cart ({items.length})
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className={`w-16 h-16 mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                    <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                      Your cart is empty
                    </p>
                    <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Start shopping to add items
                    </p>
                    <Link
                      to="/explore"
                      onClick={onClose}
                      className="px-6 py-3 bg-[#01172F] text-white font-medium rounded-full hover:bg-[#632C38] transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex gap-4 p-3 rounded-xl ${
                          theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className={`font-medium text-sm mb-1 line-clamp-2 ${
                            theme === 'dark' ? 'text-white' : 'text-[#01172F]'
                          }`}>
                            {item.name}
                          </h3>
                          <p className="text-[#632C38] font-bold mb-2">
                            ₹{item.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className={`self-start p-2 rounded-full ${
                            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                          }`}
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total
                    </span>
                    <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                      ₹{getTotal().toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-[#01172F] text-white font-bold rounded-xl hover:bg-[#632C38] transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;