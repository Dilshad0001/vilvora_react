
import React, { useContext, useEffect, useState } from 'react';
import { productContext } from '../context/ProductContext';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function ProductView() {

  const navigate = useNavigate();
  const [productsHere, setProductsHere] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axiosInstance.get('/adminproduct/product_view/');
        setProductsHere(res.data);
      } catch (error) {
        console.error("fetching error", error);
      }
    };
    getProduct();
  }, []);

  console.log("hhhhhhhhhhhhhhhhhhhhhhh");

  const toAddProduct =()=>{
    navigate('/admin/product_add/')
  }
  

  const deleteProduct = async (id) => {
    const updateProduct = productsHere.filter(i => i.id !== id);
    setProductsHere(updateProduct);
    try {
      await axiosInstance.delete('/adminproduct/product_view/', {
        data: { id: id },
      });
    } catch (error) {
      console.error("delete error", error);
    }
  };

  const toProductUpdate = (updateId) => {
    navigate(`/admin/product_update/:${updateId}`);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Product View</h1>
        <button  onClick={toAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
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
            {productsHere.map((product) => (
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
                    onClick={() => deleteProduct(product.id)}
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
      </div>
    </div>
  );
}

export default ProductView;
