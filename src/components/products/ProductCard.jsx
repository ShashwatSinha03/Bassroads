import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import useThemeStore from '../../store/useThemeStore';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

const ProductCard = ({ product }) => {
  const { theme } = useThemeStore();
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group relative rounded-2xl overflow-hidden transition-all ${
        theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'
      } shadow-lg hover:shadow-xl`}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {product.isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-[#632C38] text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
          
          {discount > 0 && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
              -{discount}%
            </span>
          )}

          <button
            onClick={handleWishlist}
            className={`absolute bottom-4 right-4 p-2 rounded-full transition-all ${
              isWishlisted
                ? 'bg-[#632C38] text-white'
                : theme === 'dark'
                ? 'bg-[#2A2A2A] text-white hover:bg-[#632C38]'
                : 'bg-white text-gray-700 hover:bg-[#632C38] hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {product.brand}
          </p>
          
          <h3 className={`font-semibold mb-2 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className={`text-sm line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-[#01172F] text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#632C38]"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;