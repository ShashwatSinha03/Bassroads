'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

type Product = typeof products[0];

export default function WishlistPage() {
  const { theme } = useThemeStore();
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              My Wishlist
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-[#632C38] hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Heart className={`w-20 h-20 mb-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Your wishlist is empty
            </h2>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Save products you love by clicking the heart icon
            </p>
            <Link
              href="/explore"
              className="px-6 py-3 bg-[#01172F] text-white font-medium rounded-full hover:bg-[#632C38] transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <ProductCard key={item.id} product={item as unknown as Product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}