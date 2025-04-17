

import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { CartItemsContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState("");
  const [cartIds, setCartIds] = useState([]);
  const { cart, fetchCart } = useContext(CartItemsContext);
  const navigate=useNavigate()

  useEffect(() => {
    console.log("cc-",cart);
    
    const fetchorderData = async () => {
      try {
        const ids = cart.map(item => item.order_id);
        setCartIds(ids);
        console.log("--hhhh--",ids);
        
      } catch (error) {
        console.error('no data found:', error);
      }
    };
    fetchorderData();

  }, []);
console.log("==",cartIds);

  const totalAmount = cart.reduce(
    (total, item) => total + (item.product.product_price * item.count),
    0
  );  

  const saveOrderDetails = async (cart_id, total_amount, address) => {
    if (!address) {
      alert("Please enter a delivery address.");
      return;
    }
    console.log(cart_id, total_amount, address);

    try {
      const add = await axiosInstance.post('/order/', {
        carts: cart_id,
        total_amount: total_amount,
        delivery_address: address
      });
      navigate('/p/')
    } catch {
      console.log("error");
    }
  }

  const saveAddress = (e) => {
    setAddress(e.target.value);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Order Summary</h1>

      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.order_id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{item.product.category.category_name}  {item.product.product_name}</h2>
            <p className="text-gray-600">Quantity: {item.count}</p>
            <p className="text-gray-800">Price: ${item.product.product_price*item.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Total Amount : ${totalAmount}</h2>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Delivery Details</h2>
        <label htmlFor="payment" className="block text-lg">Payment Options:</label>
        <select id="pay" className="mt-2 p-2 border rounded-lg w-full">
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="address" className="block text-lg mt-4">Enter Delivery Address:</label>
        <input 
          onChange={saveAddress} 
          type="text" 
          id="address" 
          name="address" 
          placeholder="Enter your address"
          className="mt-2 p-2 border rounded-lg w-full"
          required
        />
        
        <button 
          onClick={() => saveOrderDetails(cartIds, totalAmount, address)} 
          className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Save Order
        </button>
      </div>


    </div>
  )
}

export default Payment;
