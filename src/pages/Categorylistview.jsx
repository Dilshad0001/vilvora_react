
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../context/CategoryContext';


function Categorylistview({}) {

  const { Category } = useContext(ItemsContext);

  const navigate=useNavigate()
  
  const selectedCategory = (categoryName) => {
    navigate('/products', { state: { selected_category: categoryName } });
  };
  


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        Shop by Category
      </h1>

      <div className="flex overflow-x-auto space-x-8 pb-6 scrollbar-hide">
        {Category.map((category, index) => (
          <div 
            key={index}
            onClick={() => selectedCategory(category.category_name)}
            className="min-w-[280px] max-w-sm flex-shrink-0 bg-white border  border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image  */}
            <div className="h-48 overflow-hidden rounded-t-2xl">
              <img
                src={`http://localhost:8000/${category.category_image}`}
                alt={category.category_name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="h-10 text-center">
              <button className="w-full h-full py-2 bg-amber-100 text-amber-900 text-sm rounded-full hover:bg-amber-800 transition duration-200">
              {category.category_name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorylistview;
