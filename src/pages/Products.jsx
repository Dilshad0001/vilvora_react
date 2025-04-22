

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../axiosInstance';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

function Products() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get('/category/');
      setCategory(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Products</h1>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm hover:bg-gray-50 transition"
        >
          <Filter size={18} />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          {showMobileFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Mobile Filters */}
        {showMobileFilters && (
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-4 animate-fade-in-down">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {category.map((item, index) => (
                  <option key={index} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">🕒 Latest</option>
                <option value="low-high">⬇️ Low to High</option>
                <option value="high-low">⬆️ High to Low</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar Filter */}
        <div className="hidden md:block md:w-1/4 bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">Filters</h2>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {category.map((item, index) => (
                <option key={index} value={item.category_name}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Sort By</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="latest">🕒 Latest</option>
              <option value="low-high">⬇️ Low to High</option>
              <option value="high-low">⬆️ High to Low</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="w-full">
          <ProductCard
            selected_category={selectedCategory}
            selected_sort={sortOption}
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
