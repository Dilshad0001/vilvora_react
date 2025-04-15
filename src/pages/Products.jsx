import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../axiosInstance';


function Products() {
    
    const [category,setCategory]=useState([])
    const [selectedCategory,setSelectedCategory]=useState("")
    const [sortOption,setSortOption]=useState('')

 

    useEffect(() => {
        const fetch = async () => {
          const res = await axiosInstance.get("/category/");
          setCategory(res.data);
        };
        fetch();
      }, []);


    
    

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="flex flex-col md:flex-row gap-6"  >
        {/* Sidebar filter */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-4" >
            <label className="block font-medium mb-1">Category</label>

            <select 
                className="w-full border border-gray-300 rounded px-2 py-1"
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

          {/* Sort  */}
          <div >
            <label className="block font-medium mb-1">Sort By</label>
            <select className="w-full border border-gray-300 rounded px-2 py-1"
              onChange={(k)=>setSortOption(k.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>


          <ProductCard selected_category={selectedCategory} selected_sort={sortOption}/>

      </div>
    </div>
  );
}

export default Products;
