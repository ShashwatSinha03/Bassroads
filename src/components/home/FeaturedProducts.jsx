import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import useThemeStore from '../../store/useThemeStore';
import { products } from '../../data/products';

const FeaturedProducts = () => {
  const { theme } = useThemeStore();
  const featuredProducts = products.slice(0, 8);

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Featured Products
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Handpicked by our audio experts
            </p>
          </div>
          <Link
            to="/explore"
            className="hidden md:flex items-center gap-2 text-[#632C38] font-medium hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#01172F] text-white font-medium rounded-full hover:bg-[#632C38] transition-colors"
          >
            View All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;