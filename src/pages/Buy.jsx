import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { CartItemsContext } from '../context/CartContext';

function Buy() {
    const [carts,setCarts]=[useContext(CartItemsContext)]

  const totalAmount = carts.reduce(
    (total, item) => total + item.product.product_price * item.count,
    0
  );

  const handlePlaceOrder = () => {
    alert(' Order placed successfully!');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Order Summary</h1>
      {carts.map(cart => (
        <div
          key={cart.order_id}
          className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <img
              src={`http://127.0.0.1:8000${cart.product.product_image}`}
              alt={cart.product.product_name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{cart.product.product_name}</h2>
              <p className="text-gray-600 text-sm">₹ {cart.product.product_price} × {cart.count}</p>
            </div>
          </div>
          <p className="font-medium text-gray-800">
            ₹ {cart.product.product_price * cart.count}
          </p>
        </div>
      ))}

      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: ₹ {totalAmount}</h2>
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          ✅ Place Order
        </button>
      </div>
    </div>
  );
}

export default Buy;
