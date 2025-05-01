

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function ProductItem() {
  const { id } = useParams(); 
  const [product, setProduct] = useState([]);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/product/?id=${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);




  const addTocart = async (id) => {
    console.log("sttaa");
    
    try {
      const res = await axiosInstance.post("/cart/", {
        product: id
      });
      console.log("resss",res.data);
      
      
    } catch (error) {
      console.error("error post product", error);
      console.log("err");
      
    }
    setAdded(true);    
  };
  console.log("addeddd===",added);
  

  const GotoCart = () => {
    navigate("/cart/");
  };

  if (!product || product.length === 0) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
      {product.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-4 sm:p-6 shadow-lg rounded-lg"
        >
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-72 sm:h-96">
            <img
              src={`http://localhost:8000/${item.product_image}`}
              alt={item.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {item.category?.category_name || "No category"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {item.product_name}
              </h1>

              {/* Dummy Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.92-.755 1.688-1.539 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.198-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.04 9.401c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.974z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">(128 reviews)</span>
              </div>

              <p className="text-green-600 text-xl sm:text-2xl font-semibold mb-4">
                ₹ {item.product_price}
              </p>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                {item.product_decription || "No description available."}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => (added ? GotoCart() : addTocart(item.id))}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
              >
                {added ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductItem;
