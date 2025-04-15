

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function ProductItem() {
  const { id } = useParams(); 
  const [product, setProduct] = useState([]);
  const [added,setAdded]=useState(false)
  const navigate=useNavigate()


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


  const addTocart=async(id)=>{
    try{
      const res =await axiosInstance.post("/cart/",{
        product:id
      })
    }catch(error){
      console.error("error post product",error);
    }
    console.log("---",id);
    setAdded(true)    
  }
  const GotoCart=()=>{
    navigate("/cart/")
  }

  if (!product || product.length === 0) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {product.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 bg-white p-6 shadow-md rounded-lg"
        >
          {/*  Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:8000/${item.product_image}`}
              alt={item.product_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-between">
            <div className="text-center">
              <p className="text-gray-500">{item.category?.category_name || "No category"}</p>
              <h1 className="text-2xl font-bold mb-2">{item.product_name}</h1>
              <p className="text-green-600 text-xl font-semibold mb-4">₹ {item.product_price}</p>
              <p className="text-gray-700 mb-6">
                {item.product_decription || "No description available."}
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-4">

              <button onClick={()=>(added? GotoCart():addTocart(item.id))}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                {added?"Go to cart":"Add to Cart"} 
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductItem;
