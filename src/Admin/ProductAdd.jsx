
// import React, { useContext, useState } from 'react';
// import axiosInstance from '../axiosInstance';
// import { ItemsContext } from '../context/CategoryContext';

// function ProductAdd() {
//     const [product,setProduct]=useState({
//         "product_name":"",
//         "category":"",
//         "product_price":"",
//         "product_image":null,
//         "product_description":"",
//     })
//   const data = useContext(ItemsContext);
//   console.log("context data:", data);

//   const categories = data.Category ;



// const handleInput = (e) => {
//     const { name, value, files } = e.target;
  
//     if (name === "product_image") {
//       setProduct((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else if (name === "category_name") {
//       setProduct((prev) => ({
//         ...prev,
//         category: value, 
//       }));
//     } else {
//       setProduct((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };
  
// const addProduct = () => {
//     const formData = new FormData();
//     formData.append("product_name", product.product_name);
//     formData.append("category", product.category);
//     formData.append("product_price", product.product_price);
//     formData.append("product_image", product.product_image);
//     formData.append("product_description", product.product_description);
  
//     axiosInstance.post('/adminproduct/product_view/', formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     })
//     .then((response) => {
//       console.log("Product added successfully:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error adding product:", error);
//     });
//   };
  
  

  

//   return (
//     <div>
//       <h1>Product Add</h1>
//       <label>Product name: </label>
//       <input name='product_name' onChange={handleInput} type="text" placeholder="Enter product name" />
//       <input  onChange={handleInput} type="number" step="0.01" name="product_price" placeholder='Enter product price'/>

//       <select onChange={handleInput} name="category_name">
//         {categories.map((item,index) => (
//           <option key={index} value={item.id}>
//             {item.category_name}
//           </option>
//         ))}
//       </select>
//       <input  onChange={handleInput} accept="image/*" name='product_image' type='file'/>
//       <textarea onChange={handleInput} name='product_description' rows="3" cols="20" placeholder='enter description'/>
//       <button onClick={addProduct}>Add</button>
//     </div>
//   );
// }

// export default ProductAdd;

// ======================================================================================


// import React, { useContext, useState } from 'react';
// import axiosInstance from '../axiosInstance';
// import { ItemsContext } from '../context/CategoryContext';

// function ProductAdd() {
//   const [product, setProduct] = useState({
//     product_name: "",
//     category: "",
//     product_price: "",
//     product_image: null,
//     product_description: "",
//   });

//   const data = useContext(ItemsContext);
//   const categories = data.Category;

//   const handleInput = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "product_image") {
//       setProduct((prev) => ({
//         ...prev,
//         [name]: files[0],
//       }));
//     } else if (name === "category_name") {
//       setProduct((prev) => ({
//         ...prev,
//         category: value,
//       }));
//     } else {
//       setProduct((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const addProduct = () => {
//     const formData = new FormData();
//     formData.append("product_name", product.product_name);
//     formData.append("category", product.category);
//     formData.append("product_price", product.product_price);
//     formData.append("product_image", product.product_image);
//     formData.append("product_description", product.product_description);

//     axiosInstance
//       .post('/adminproduct/product_view/', formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((response) => {
//         console.log("Product added successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error adding product:", error);
//       });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
//       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h1>

//       <label className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
//       <input
//         name="product_name"
//         onChange={handleInput}
//         type="text"
//         placeholder="Enter product name"
//         className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <label className="block text-sm font-medium text-gray-700 mb-1">Product Price:</label>
//       <input
//         onChange={handleInput}
//         type="number"
//         step="0.01"
//         name="product_price"
//         placeholder="Enter product price"
//         className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
//       <select
//         onChange={handleInput}
//         name="category_name"
//         className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       >
//         <option value="">Select Category</option>
//         {categories.map((item, index) => (
//           <option key={index} value={item.id}>
//             {item.category_name}
//           </option>
//         ))}
//       </select>

//       <label className="block text-sm font-medium text-gray-700 mb-1">Product Image : </label>
//       <input
//         onChange={handleInput}
//         accept="image/*"
//         name="product_image"
//         type="file"
//         className="w-full mb-4"
//       />

//       <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
//       <textarea
//         onChange={handleInput}
//         name="product_description"
//         rows="3"
//         cols="20"
//         placeholder="Enter description"
//         className="w-full mb-6 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//       />

//       <button
//         onClick={addProduct}
//         className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
//       >
//         Add Product
//       </button>
//     </div>
//   );
// }

// export default ProductAdd;








import React, { useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { ItemsContext } from '../context/CategoryContext';

function ProductAdd() {
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

    axiosInstance
      .post('/adminproduct/product_view/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
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
