'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

function ExploreContent() {
  const { theme } = useThemeStore();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const initialCategory = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');

  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))];
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([0, 50000]);
    setSortBy('featured');
  };

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Explore Products
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#1A1A1A] text-white border-gray-700'
                    : 'bg-gray-100 text-gray-700 border-gray-200'
                } border focus:outline-none focus:border-[#632C38]`}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className={`hidden md:block w-64 flex-shrink-0`}>
            <div className={`sticky top-24 p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#632C38] hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="mb-6">
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="accent-[#632C38]"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>All</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="accent-[#632C38]"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Brand
                </h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-[#632C38]"
                      />
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price Range
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-[#632C38]"
                  />
                  <div className="flex justify-between text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>₹0</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-[#01172F] text-white rounded-full hover:bg-[#632C38] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <ExploreContent />
    </Suspense>
  );
}