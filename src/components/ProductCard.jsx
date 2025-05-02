

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/productSlice';

function ProductCard({ selected_category = "", selected_sort = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  selected_category = location.state?.selected_category || selected_category;

  const select_product = (selectedId) => {
    navigate(`/item/${selectedId}`);
  };
    const {products}=useSelector(state=>state.product)
    const dispatch=useDispatch()
  
    useEffect(()=>{
      dispatch(getAllProducts())
      
      
    },[])


  let filtered_product = [...products];

  if (selected_category.length !== 0) {
    filtered_product = filtered_product.filter(
      (item) => item.category.category_name === selected_category
    );
  }

  if (selected_sort === "low-high") {
    filtered_product.sort((a, b) => a.product_price - b.product_price);
  } else if (selected_sort === "high-low") {
    filtered_product.sort((a, b) => b.product_price - a.product_price);
  } else if (selected_sort.length === 0) {
    filtered_product.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filtered_product.map((item) => (
        <div
          key={item.id}
          className="bg-amber-50 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out w-full sm:w-80 md:w-64 lg:w-56 xl:w-64"
          onClick={() => select_product(item.id)}
        >
          {/* Image Section */}
          <div className="h-60 w-full bg-gray-100 rounded-t-2xl overflow-hidden">
            <img
              src={`http://localhost:8000/${item.product_image}`}
              alt={item.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 mb-1 truncate">
              {item.product_name}
            </h2>
            <h2 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 truncate">
              {item.category.category_name}
            </h2>
            <p className="text-sm sm:text-lg font-semibold text-green-600">
              ₹ {item.product_price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(ProductCard);
