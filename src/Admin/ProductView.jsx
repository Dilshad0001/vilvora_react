

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/productSlice';
import { deleteProduct } from '../redux/productSlice'; 

function ProductView() {

  const navigate = useNavigate();
  const { products, nextPage, previousPage, loading, error } = useSelector((state) => state.product);
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllProducts())
    
    
  },[])

  const fetchNextPage = () => {
    if (nextPage) dispatch(getAllProducts(nextPage))
  }

  const fetchPreviousPage = () => {
    if (previousPage) dispatch(getAllProducts(previousPage))
  }


  const toAddProduct = () => {
    navigate('/admin/product_add/');
  };


const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    dispatch(deleteProduct(id));
  }
};

  const toProductUpdate = (updateId) => {
    navigate(`/admin/product_update/${updateId}`);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Product View</h1>
        <button onClick={toAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">Image</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Price</th>
              <th className="py-3 px-4 border-b text-left">Category</th>
              <th className="py-3 px-4 border-b text-left">Description</th>
              <th className="py-3 px-4 border-b text-left">Created At</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-gray-700">
                <td className="py-3 px-4 border-b">
                  <img
                    src={`http://localhost:8000${product.product_image}`}
                    alt={product.product_name}
                    className="h-16 w-16 object-cover rounded shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 border-b">{product.product_name}</td>
                <td className="py-3 px-4 border-b">₹ {product.product_price}</td>
                <td className="py-3 px-4 border-b">{product.category.category_name}</td>
                <td className="py-3 px-4 border-b">
                  {product.product_decription ? product.product_decription : 'No description'}
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(product.created_at).toLocaleString()}
                </td>
                <td className="py-3 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toProductUpdate(product.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => fetchPreviousPage(previousPage)}
            disabled={!previousPage}
            className={`px-4 py-2 rounded-md text-white ${previousPage ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Previous
          </button>
          <button
            onClick={() => fetchNextPage(nextPage)}
            disabled={!nextPage}
            className={`px-4 py-2 rounded-md text-white ${nextPage ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductView;
