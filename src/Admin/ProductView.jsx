
import React, { useContext, useEffect, useState } from 'react';
import { productContext } from '../context/ProductContext';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function ProductView() {

  const navigate=useNavigate()
  // const products = useContext(productContext);
  const [productsHere,setProductsHere]=useState([])

    useEffect(()=>{
        console.log("ggg");
        
        const getProduct=async()=>{
            try{
                const res=await axiosInstance.get('/adminproduct/product_view/')
                setProductsHere(res.data)
            }catch(error){
                console.error("fetching error",error);      
            }};
        getProduct();
    },[])

const deleteProduct=async(id)=>{
  const updateProduct=productsHere.filter(i=>i.id !==id);
  setProductsHere(updateProduct)
  try{
    await axiosInstance.delete('/adminproduct/product_view/',{
      data: { id: id },}
    )
  }catch(error){
    console.error("delete error",error);
  }
}

const toProductUpdate=(updateId)=>{
  navigate(`/admin/product_update/:${updateId}`)
  console.log(('kkk'));
  

}


  return (
    
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Product View</h1>
      <button>Add products</button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">rge</th>

            </tr>
          </thead>
          <tbody>
            {productsHere.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <img
                    src={`http://localhost:8000${product.product_image}`} 
                    alt={product.product_name}
                    className="h-20 w-20 object-cover mx-auto rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.product_name}</td>
                <td className="py-2 px-4 border-b">₹ {product.product_price}</td>
                <td className="py-2 px-4 border-b">{product.category.category_name}</td>
                <td className="py-2 px-4 border-b">
                  {product.product_decription ? product.product_decription : 'No description'}
                </td>
                <td className="py-2 px-4 border-b">{new Date(product.created_at).toLocaleString()}</td>
                <button onClick={()=>deleteProduct(product.id)}>delete </button>
                <button onClick={()=>toProductUpdate(product.id)} >update </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <button>Delete</button> */}
    </div>
  );
}

export default ProductView;
