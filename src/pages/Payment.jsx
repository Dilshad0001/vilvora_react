
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { CartItemsContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCart } from '../redux/cartSlice';

function Payment() {
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState("");
  const [cartIds, setCartIds] = useState([]);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const {cartitems}=useSelector(state=>state.cart)

  useEffect(()=>{
    dispatch(getAllCart())
    
  },[])

  
  useEffect(() => {
    const fetchorderData = async () => {
      try {
        const ids = cartitems.map(item => item.order_id);
        setCartIds(ids);
      } catch (error) {
        console.error('No data found:', error);
      }
    };
    fetchorderData();
    
  }, [cartitems]);

  const totalAmount = cartitems.reduce(
    (total, item) => total + (item.product.product_price * item.count),
    0
  );

  const saveOrderDetails = async (cart_id, total_amount, address) => {
    if (!address) {
      alert("Please enter a delivery address.");
      return;
    }

    try {
      await axiosInstance.post('/order/', {
        carts: cart_id,
        total_amount: total_amount,
        delivery_address: address
      });
      navigate('/p/');
    } catch {
      console.log("Error saving order.");
    }
  };

  const saveAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-white to-slate-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">📟 Order Summary</h1>

      <div className="space-y-6 divide-y divide-gray-300">
        {cartitems.map(item => (
          <div key={item.order_id} className="pt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {item.product.category.category_name} - {item.product.product_name}
            </h2>
            <p className="text-gray-600">Quantity: {item.count}</p>
            <p className="text-gray-800 font-medium">Price: ₹{item.product.product_price * item.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold text-green-700">Total Amount: ₹{totalAmount}</h2>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🚚 Delivery Details</h2>

        <div className="mb-6">
          <label htmlFor="payment" className="block text-lg font-medium text-gray-700 mb-1">Payment Options</label>
          <select
            id="pay"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-1">Delivery Address</label>
          <input
            onChange={saveAddress}
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          onClick={() => saveOrderDetails(cartIds, totalAmount, address)}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          ✅ Save Order
        </button>
      </div>
    </div>
  );
}

export default Payment;
