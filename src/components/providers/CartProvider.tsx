'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useThemeStore } from '@/store/useThemeStore';
import CartDrawer from '@/components/cart/CartDrawer';
import CheckoutModal from '@/components/cart/CheckoutModal';

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const handleToggleCart = () => setCartOpen(prev => !prev);
    const handleOpenCheckout = () => {
      setCartOpen(false);
      setCheckoutOpen(true);
    };

    window.addEventListener('toggle-cart', handleToggleCart);
    window.addEventListener('open-checkout', handleOpenCheckout);
    
    return () => {
      window.removeEventListener('toggle-cart', handleToggleCart);
      window.removeEventListener('open-checkout', handleOpenCheckout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {children}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}