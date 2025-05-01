
import React, { useContext, useState, useEffect } from 'react';
import { productContext } from '../context/ProductContext';
import { ItemsContext } from '../context/CategoryContext';
import axiosInstance from '../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/productSlice';



function ProductUpdate() {
  const navigate=useNavigate()

const { updateId } = useParams();

const cleaned = updateId.replace(":", ""); 
const parsed = parseInt(cleaned, 10);

  const { Category } = useContext(ItemsContext);
  // const products = useContext(productContext);
  const { products, nextPage, previousPage, loading, error } = useSelector((state) => state.product);
const dispatch=useDispatch()

useEffect(()=>{
  dispatch(getAllProducts())
  
  
},[dispatch])

  const [selectedItem, setSelectedItem] = useState({
    id:'',
    product_name: '',
    product_price: '',
    category: '',
    product_decription: '',
    product_image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {    
    const selected_product = products.find(item => item.id === parsed);
    
    if (selected_product) {
      setSelectedItem({
        id: parsed,
        product_name: selected_product.product_name || '',
        product_price: selected_product.product_price || '',
        category: selected_product.category.id || '',
        product_decription: selected_product.product_decription || '',
        product_image: selected_product.product_image || null
      });

      setImagePreview(`http://localhost:8000${selected_product.product_image}`);
    }
  }, [products]);

  const onSubmit = async () => {
    console.log("submitted");
    const formData = new FormData();

    formData.append('id', parsed);
    formData.append('product_name', selectedItem.product_name);
    formData.append('product_price', selectedItem.product_price);
    formData.append('category', selectedItem.category);
    formData.append('product_decription', selectedItem.product_decription);

    if (selectedItem.product_image instanceof File) {
      formData.append('product_image', selectedItem.product_image);
    }
    console.log("bbbbb",formData);
    

    try {
      const updateDate = await axiosInstance.put(
        `/adminproduct/product_view/?updateId=${updateId}`,
        formData,
        {
          headers: {
          },
        }
      );
      navigate('/admin/product_view/')
      
      console.log('Product updated successfully:', updateDate);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'product_image' && files.length > 0) {
      const file = files[0];
      setSelectedItem((prev) => ({
        ...prev,
        product_image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedItem((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">Product Update</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Product Name</label>
        <input
          name="product_name"
          value={selectedItem.product_name}
          onChange={handleInput}
          type="text"
          placeholder="Enter product name"
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Product Price</label>
        <input
          name="product_price"
          value={selectedItem.product_price}
          onChange={handleInput}
          type="number"
          step="0.01"
          placeholder="Enter product price"
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={selectedItem.category}
          onChange={handleInput}
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Product Image</label>
        <input
          name="product_image"
          type="file"
          accept="image/*"
          onChange={handleInput}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Image Preview:</h4>
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-36 h-36 object-cover rounded-xl border border-gray-300"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700">Product Description</label>
        <textarea
          name="product_decription"
          value={selectedItem.product_decription}
          onChange={handleInput}
          rows="4"
          placeholder="Enter description"
          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="text-center">
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-300"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}

export default ProductUpdate;
