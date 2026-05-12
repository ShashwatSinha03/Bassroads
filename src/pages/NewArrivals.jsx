import React from 'react';
import { Sparkles } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import useThemeStore from '../store/useThemeStore';
import { products } from '../data/products';

const NewArrivals = () => {
  const { theme } = useThemeStore();
  const newProducts = products.filter(p => p.isNew);

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className={`py-16 ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#632C38]" />
            <p className="text-[#632C38] font-medium">Just Dropped</p>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            New Arrivals
          </h1>
          <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Be the first to explore our latest audio gear. Fresh picks just landed!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {newProducts.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No new arrivals yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;