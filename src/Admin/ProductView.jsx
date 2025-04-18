
import React, { useContext } from 'react';
import { productContext } from '../context/ProductContext';

function ProductView() {
  const products = useContext(productContext);
  console.log('prr--', products);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product View</h1>

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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductView;
