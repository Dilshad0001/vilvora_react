

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const Pay = () => {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [cartItemId, setCartItemId] = useState(null);
  const [cartItemAmount, setCartItemAmount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/current/");
        setUser(res.data);
      } catch (error) {
        console.error("fetch error", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get('/order/');
        setCartItem(response.data);
      } catch (error) {
        console.error("fetch error", error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (cartItem.length > 0) {
      setCartItemId(cartItem[cartItem.length - 1].id);
      setCartItemAmount(cartItem[cartItem.length - 1].total_amount);
    }
  }, [cartItem]);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('#razorpay-script')) {
        resolve(true);
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.id = 'razorpay-script';
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error('Razorpay script failed to load!'); 
        return;
      }

      if (!window.Razorpay) {
        toast.error('Razorpay SDK is not available, please try again!'); 
        console.error('Razorpay SDK is not available in window');
        return;
      }

      const response = await axiosInstance.post('/payment/create/', {
        amount: cartItemAmount,
        id: cartItemId,
        user: user
      });

      const { order_id, razorpay_key, amount: razor_amount } = response.data;

      const options = {
        key: razorpay_key,
        amount: razor_amount,
        currency: 'INR',
        name: 'My Shop',
        description: 'Payment for your order',
        order_id: order_id,
        handler: async function (response) {
          console.log("🧾 Razorpay Payment Response:", response);
          try {
            const verifyRes = await axios.post('http://localhost:8000/payment/verify/', {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              user: user
            });
            console.log("✅ Verification Response:", verifyRes.data);
            if (verifyRes.data.message === 'Payment Verified Successfully') {
              toast.success('✅ Payment successful!'); 
            } else {
              toast.error('❌ Payment verification failed!'); 
            }
            navigate('/');
          } catch (err) {
            console.error("❌ Verification Error:", err.response?.data || err.message);
            toast.error('❌ Payment verification failed.'); 
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
        toast.error(`Error: ${error.response.data.error || 'Unknown backend issue'}`); 
      } else {
        console.error('Network or unknown error:', error.message);
        toast.error('Network or unknown error occurred'); 
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Payment</h2>
        <div className="text-center text-lg text-gray-700 mb-6">
          Total Amount to Pay:
          <span className="text-2xl font-bold block mt-2 text-green-600">₹{cartItemAmount}</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white py-3 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Pay;
