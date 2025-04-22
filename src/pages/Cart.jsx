

import React, { useContext, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { CartItemsContext } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cart, setCart, fetchCart } = useContext(CartItemsContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const changeCount = async (id, currentCount, change, price) => {
    const newCount = currentCount + change;
    if (newCount < 0) return;

    const updatedCart = cart.map(item =>
      item.order_id === id ? { ...item, count: newCount } : item
    );
    setCart(updatedCart);

    try {
      await axiosInstance.patch('/cart/', {
        order_id: id,
        count: newCount,
        sub_total_amount: newCount * price
      });
      fetchCart();
    } catch (error) {
      console.log('Error updating count:', error.response?.data || error.message);
    }
  };

  const deleteCart = async (id) => {
    const updatedCart = cart.filter(item => item.order_id !== id);
    setCart(updatedCart);

    try {
      await axiosInstance.delete('/cart/', {
        data: { id: id },
      });
      fetchCart();
    } catch (error) {
      console.log('Error deleting cart item:', error.response?.data || error.message);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.product.product_price * item.count,
    0
  );

  const toPayment = () => {
    navigate('/Buy/');
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div
            key={item.order_id}
            className="bg-white border rounded-xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 transition hover:shadow-md"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={`http://127.0.0.1:8000${item.product.product_image}`}
                alt={item.product.product_name}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.product.product_name}</h2>
                <p className="text-sm text-gray-600">Price: ₹ {item.product.product_price}</p>
                <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                <p className="text-md font-medium mt-1 text-green-700">
                  Total: ₹ {item.product.product_price * item.count}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => changeCount(item.order_id, item.count, 1, item.product.product_price)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                +
              </button>
              <button
                onClick={() => changeCount(item.order_id, item.count, -1, item.product.product_price)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                -
              </button>
              <button
                onClick={() => deleteCart(item.order_id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="text-right mt-6 border-t pt-4">
          <h2 className="text-xl font-bold text-gray-800">Total Amount: ₹ {totalAmount}</h2>
          <button
            onClick={toPayment}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
