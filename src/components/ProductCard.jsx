import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import ProductItem from '../pages/ProductItem';
import { useLocation, useNavigate } from 'react-router-dom';




function ProductCard({selected_category="",selected_sort=""}) {


  const [product,setProduct]=useState([])

  const navigate=useNavigate()
  const location = useLocation();
  selected_category = location.state?.selected_category || "";


  const select_product=(slectedId)=>{
    navigate(`/item/${slectedId}`)
  }
  // console.log("ppp--",selectProduct);

useEffect(() => {
  const fetch = async () => {
    const res = await axiosInstance.get("/product/");
    setProduct(res.data);
  };
  fetch();
}, []);
console.log("fff",product);


let filtered_product=[];

if (selected_category.length!=0){
   filtered_product=product.filter(item=>item.category.category_name===selected_category)
}else{
   filtered_product=product
}

if (selected_sort=="low-high"){
  product.sort((a, b) => a.product_price - b.product_price);
}else if(selected_sort=="high-low"){
  product.sort((a, b) => b.product_price - a.product_price);

}else if(selected_sort.length==0){
  product.sort((a, b) => a.created_at - b.created_at);
}



return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 b " >
    {filtered_product.map((item) => (
      <div
        key={item.id}
        className="bg-amber-50 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out w-80"
        onClick={()=>select_product(item.id)}
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
        <div className="p-4 h-30 ">
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate bg">
            {item.product_name}
          </h2>
          <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
            {item.category.category_name}
          </h2>
          <p className="text-lg font-semibold text-green-600">
            ₹ {item.product_price}
          </p>
        </div>
      </div>
    ))}
  </div>
);
}
export default React.memo(ProductCard);