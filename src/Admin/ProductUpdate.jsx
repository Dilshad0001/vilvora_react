
// // ======================================================================
// import React, { useContext, useState, useEffect } from 'react';
// import { productContext } from '../context/ProductContext';
// import { ItemsContext } from '../context/CategoryContext';

// const categories = [
//   { id: 1, category_name: 'Category 1' },
//   { id: 2, category_name: 'Category 2' }
// ];
//   // const { Category } = useContext(ItemsContext);


// function ProductUpdate() {

//   const {Category}=useContext(ItemsContext)
//   console.log("ca---",Category);
  
//   const products = useContext(productContext);
//   const [selectedItem, setSelectedItem] = useState({
//     product_name: '',
//     product_price: '',
//     category: '',
//     product_description: '',
//     product_image: null
//   });
//   const [imagePreview, setImagePreview] = useState(null); 

//   useEffect(() => {
//     const selected_product = products.find((item) => item.id === 13);
//     console.log(selected_product);
    
//     if (selected_product) {
//       setSelectedItem({
//         product_name: selected_product.product_name || '',
//         product_price: selected_product.product_price || '',
//         category: selected_product.category.id || '',
//         product_decription: selected_product.product_decription || '',
//         product_image: `http://localhost:8000${selectedItem.product_image}`
//       });
//     }
//   }, [products]); // Re-run when products change


//   const handleInput = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'product_image' && files.length > 0) {
//       const file = files[0];
//       setProduct((prev) => ({
//         ...prev,
//         product_image: file,
//       }));
//       // Update image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Store image preview URL
//       };
//       reader.readAsDataURL(file); // Convert image to base64 for preview
//     } else {
//       setProduct((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   console.log("-------",selectedItem);
  

//   return (
//     <div>
//       <h1>Product Update</h1>

//       <label>Product name: </label>
//       <input
//         name='product_name'
//         value={selectedItem.product_name}
//         onChange={handleInput}
//         type="text"
//         placeholder="Enter product name"
//       />

//       <label>Product Price: </label>
//       <input
//         name='product_price'
//         value={selectedItem.product_price}
//         onChange={handleInput}
//         type="number"
//         step="0.01"
//         placeholder='Enter product price'
//       />

//       <label>Category: </label>
//       <select
//         name="category"
//         value={selectedItem.category}
//         onChange={handleInput}
//       >
//         {Category.map((item, index) => (
//           <option key={index} value={item.id}>
//             {item.category_name}
//           </option>
//         ))}
//       </select>

//       <label>Product Image: </label>
//       {selectedItem.product_image && (
//   <div>
//     <h4>Image Preview:</h4>
//     <img
//   src={
//     typeof selectedItem.product_image === 'string'
//       ? `http://localhost:8000${selectedItem.product_image}`  // server-side image path
//       : URL.createObjectURL(selectedItem.product_image)       // preview from uploaded file
//   }
//   alt="Product"
//   style={{ width: '150px', height: '150px', objectFit: 'cover' }}
// />

//   </div>
// )}

//       <label>Product Description: </label>
//       <textarea
//         name='product_description'
//         value={selectedItem.product_decription}
//         rows="3"
//         cols="20"
//         placeholder='Enter description'
//         onChange={handleInput}
//       />
//     </div>
//   );
// }

// export default ProductUpdate;
// =========================================================================

// import React, { useContext, useState, useEffect } from 'react';
// import { productContext } from '../context/ProductContext';
// import { ItemsContext } from '../context/CategoryContext';

// function ProductUpdate() {
//   const { Category } = useContext(ItemsContext);
//   const products = useContext(productContext);

//   const [selectedItem, setSelectedItem] = useState({
//     product_name: '',
//     product_price: '',
//     category: '',
//     product_description: '',
//     product_image: null
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     const selected_product = products.find((item) => item.id === 13);
//     if (selected_product) {
//       setSelectedItem({
//         product_name: selected_product.product_name || '',
//         product_price: selected_product.product_price || '',
//         category: selected_product.category.id || '',
//         product_description: selected_product.product_description || '',
//         product_image: selected_product.product_image || null
//       });

//       // Set preview if product_image is present
//       setImagePreview(`http://localhost:8000${selected_product.product_image}`);
//     }
//   }, [products]);

//   const handleInput = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'product_image' && files.length > 0) {
//       const file = files[0];
//       setSelectedItem((prev) => ({
//         ...prev,
//         product_image: file
//       }));

//       // Show image preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setSelectedItem((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   return (
//     <div>
//       <h1>Product Update</h1>

//       <label>Product Name: </label>
//       <input
//         name="product_name"
//         value={selectedItem.product_name}
//         onChange={handleInput}
//         type="text"
//         placeholder="Enter product name"
//       />

//       <label>Product Price: </label>
//       <input
//         name="product_price"
//         value={selectedItem.product_price}
//         onChange={handleInput}
//         type="number"
//         step="0.01"
//         placeholder="Enter product price"
//       />

//       <label>Category: </label>
//       <select
//         name="category"
//         value={selectedItem.category}
//         onChange={handleInput}
//       >
//         {Category.map((item) => (
//           <option key={item.id} value={item.id}>
//             {item.category_name}
//           </option>
//         ))}
//       </select>

//       <label>Product Image: </label>
//       <input
//         name="product_image"
//         type="file"
//         accept="image/*"
//         onChange={handleInput}
//       />

//       {/* Image preview section */}
//       {imagePreview && (
//         <div>
//           <h4>Image Preview:</h4>
//           <img
//             src={imagePreview}
//             alt="Product Preview"
//             style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//           />
//         </div>
//       )}

//       <label>Product Description: </label>
//       <textarea
//         name="product_description"
//         value={selectedItem.product_description}
//         onChange={handleInput}
//         rows="3"
//         cols="20"
//         placeholder="Enter description"
//       />
//     </div>
//   );
// }

// export default ProductUpdate;
// ============================================================


// import React, { useContext, useState, useEffect } from 'react';
// import { productContext } from '../context/ProductContext';
// import { ItemsContext } from '../context/CategoryContext';
// import axiosInstance from '../axiosInstance';

// function ProductUpdate() {
//   const { Category } = useContext(ItemsContext);
//   const products = useContext(productContext);

//   const [selectedItem, setSelectedItem] = useState({
//     id:13,
//     product_name: '',
//     product_price: '',
//     category: '',
//     product_decription: '',
//     product_image: null
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     const selected_product = products.find((item) => item.id === 13);
//     if (selected_product) {
//       setSelectedItem({
//         id:13,
//         product_name: selected_product.product_name || '',
//         product_price: selected_product.product_price || '',
//         category: selected_product.category.id || '',
//         product_decription: selected_product.product_decription || '',
//         product_image: selected_product.product_image || null
//       });

//       setImagePreview(`http://localhost:8000${selected_product.product_image}`);
//     }
//   }, [products]);

//   const onSubmit=async()=>{
//     try{
//       const updateDate=await axiosInstance.put('/adminproduct/product_view/',selectedItem)
//     }catch(error){
//       console.error("update error",error);
      
//     }
//   }

//   const handleInput = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'product_image' && files.length > 0) {
//       const file = files[0];
//       setSelectedItem((prev) => ({
//         ...prev,
//         product_image: file
//       }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setSelectedItem((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
//       <h1 className="text-2xl font-semibold mb-6 text-center">Product Update</h1>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Product Name</label>
//         <input
//           name="product_name"
//           value={selectedItem.product_name}
//           onChange={handleInput}
//           type="text"
//           placeholder="Enter product name"
//           className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Product Price</label>
//         <input
//           name="product_price"
//           value={selectedItem.product_price}
//           onChange={handleInput}
//           type="number"
//           step="0.01"
//           placeholder="Enter product price"
//           className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Category</label>
//         <select
//           name="category"
//           value={selectedItem.category}
//           onChange={handleInput}
//           className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           {Category.map((item) => (
//             <option key={item.id} value={item.id}>
//               {item.category_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Product Image</label>
//         <input
//           name="product_image"
//           type="file"
//           accept="image/*"
//           onChange={handleInput}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//             file:rounded-full file:border-0 file:text-sm file:font-semibold
//             file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//         {imagePreview && (
//           <div className="mt-4">
//             <h4 className="text-sm font-medium text-gray-600 mb-2">Image Preview:</h4>
//             <img
//               src={imagePreview}
//               alt="Product Preview"
//               className="w-36 h-36 object-cover rounded-xl border border-gray-300"
//             />
//           </div>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1 font-medium text-gray-700">Product Description</label>
//         <textarea
//           name="product_decription"
//           value={selectedItem.product_decription} 
//           onChange={handleInput}
//           rows="4"
//           placeholder="Enter description"
//           className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       <div className="text-center">
//         <button  onClick={onSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition duration-300">
//           Update Product
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductUpdate;
// =============================================================
import React, { useContext, useState, useEffect } from 'react';
import { productContext } from '../context/ProductContext';
import { ItemsContext } from '../context/CategoryContext';
import axiosInstance from '../axiosInstance';

function ProductUpdate() {
  const { Category } = useContext(ItemsContext);
  const products = useContext(productContext);

  const [selectedItem, setSelectedItem] = useState({
    id: 13,
    product_name: '',
    product_price: '',
    category: '',
    product_decription: '',
    product_image: null
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const selected_product = products.find((item) => item.id === 13);
    if (selected_product) {
      setSelectedItem({
        id: 13,
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
    const formData = new FormData();

    // Append form data
    formData.append('id', 13);
    formData.append('product_name', selectedItem.product_name);
    formData.append('product_price', selectedItem.product_price);
    formData.append('category', selectedItem.category);
    formData.append('product_decription', selectedItem.product_decription);

    // Append image file if it exists
    if (selectedItem.product_image instanceof File) {
      formData.append('product_image', selectedItem.product_image);
    }

    try {
      const updateDate = await axiosInstance.put(
        '/adminproduct/product_view/',
        formData,
        {
          headers: {
            // No need to manually set 'Content-Type'; axios does it automatically for FormData
          },
        }
      );
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
