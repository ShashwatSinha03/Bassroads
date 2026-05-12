import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import useThemeStore from '../store/useThemeStore';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useThemeStore();
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const product = products.find(p => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className={`min-h-screen pt-24 flex items-center justify-center ${
        theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            Product Not Found
          </h2>
          <Link to="/explore" className="text-[#632C38] hover:underline">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleWishlist = () => {
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
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Home</Link>
          <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
          <Link to="/explore" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Explore</Link>
          <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>/</span>
          <span className={theme === 'dark' ? 'text-white' : 'text-[#01172F]'}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#632C38] text-white text-sm font-medium rounded-full">
                  New Arrival
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {[product.image, ...product.images].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-[#632C38]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`}>
              {product.brand}
            </p>
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  />
                ))}
              </div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className={`text-xl line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="text-green-500 font-medium">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              )}
            </div>

            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.description}
            </p>

            <div className={`p-6 rounded-2xl mb-8 ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
              <h3 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                Specifications
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-4 p-2 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className={`font-bold text-lg min-w-[40px] text-center ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleWishlist}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  isWishlisted
                    ? 'border-[#632C38] bg-[#632C38] text-white'
                    : theme === 'dark'
                    ? 'border-gray-700 hover:border-[#632C38]'
                    : 'border-gray-200 hover:border-[#632C38]'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#01172F] text-white font-bold rounded-xl hover:bg-[#632C38] transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 border-2 border-[#01172F] text-[#01172F] font-bold rounded-xl hover:bg-[#01172F] hover:text-white transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                <Truck className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Free Shipping</p>
              </div>
              <div className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                <Shield className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>1 Year Warranty</p>
              </div>
              <div className={`text-center p-4 rounded-xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
                <RotateCcw className={`w-6 h-6 mx-auto mb-2 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;