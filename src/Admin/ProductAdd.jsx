


import React, { useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { ItemsContext } from '../context/CategoryContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/productSlice';

function ProductAdd() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [product, setProduct] = useState({
    product_name: "",
    category: "",
    product_price: "",
    product_image: null,
    product_description: "",
  });

  const data = useContext(ItemsContext);
  const categories = data.Category;

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_image") {
      setProduct((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name === "category_name") {
      setProduct((prev) => ({
        ...prev,
        category: value,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addProduct = () => {
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("category", product.category);
    formData.append("product_price", product.product_price);
    formData.append("product_image", product.product_image);
    formData.append("product_description", product.product_description);

    dispatch(addProducts(formData))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🛒 Add New Product</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
            <input
              name="product_name"
              onChange={handleInput}
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Price</label>
            <input
              onChange={handleInput}
              type="number"
              step="0.01"
              name="product_price"
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              onChange={handleInput}
              name="category_name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Image</label>
            <input
              onChange={handleInput}
              accept="image/*"
              name="product_image"
              type="file"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              onChange={handleInput}
              name="product_description"
              rows="4"
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={addProduct}
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            ➕ Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
