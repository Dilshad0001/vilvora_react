



import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../context/CategoryContext';

function Categorylistview() {
  const { Category } = useContext(ItemsContext);
  const navigate = useNavigate();

  const selectedCategory = (categoryName) => {
    navigate('/products', { state: { selected_category: categoryName } });
  };

  return (
    <div className="p-8 	bg-gradient-to-br from-[#eeecec] via-[#fffafa] to-[#f1dcde]   ">

      {/* Sliding Container */}
      <div className="relative">
        <div className="flex space-x-8 pb-6 overflow-x-auto scrollbar-hide ">
          {Category.map((category, index) => (
            <div 
              key={index}
              onClick={() => selectedCategory(category.category_name)}
              className="min-w-[280px] max-w-sm flex-shrink-0 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              {/* Image  */}
              <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={`http://localhost:8000/${category.category_image}`}
                  alt={category.category_name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Content */}
              <div className="h-16 flex items-center justify-center bg-amber-100 rounded-b-2xl">
                <button className="py-2 px-4 bg-amber-500 text-white text-sm font-semibold rounded-full hover:bg-amber-600 transition duration-200">
                  {category.category_name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-900 transition duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Categorylistview;
