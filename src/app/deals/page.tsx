'use client';

import React from 'react';
import { Tag, Flame } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function DealsPage() {
  const { theme } = useThemeStore();
  const dealProducts = products.filter(p => p.isDeal);

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-r from-[#632C38] to-[#01172F]' : 'bg-[#01172F]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-6 h-6 text-orange-400" />
            <p className="text-orange-400 font-medium">Limited Time Offers</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hot Deals
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Grab the best deals on premium audio equipment. Discounts up to 40% off!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {dealProducts.length === 0 ? (
          <div className="text-center py-16">
            <Tag className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No deals available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {dealProducts.length} deals available
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {dealProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}