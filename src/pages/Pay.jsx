


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import {  useNavigate } from 'react-router-dom';

const Pay = () => {
  const [amount, setAmount] = useState(''); // State to store the entered amount
  const [user, setUser] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [cartItemId, setCartItemId] = useState(null);
  const [cartItemAmount, setCartItemAmount] = useState(null);
  const navigate=useNavigate()

  // Fetch the current user data
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

  // Fetch cart data when the component mounts
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

  // Update state with the first cart item if available
  useEffect(() => {
    if (cartItem.length > 0) {
      setCartItemId(cartItem[cartItem.length-1].id);
      setCartItemAmount(cartItem[cartItem.length-1].total_amount);
    }
  }, [cartItem]);

  // Load the Razorpay script dynamically
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

  // Handle the payment process
  const handlePayment = async () => {
    try {
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Razorpay script failed to load!');
        return;
      }

      // Ensure Razorpay is available after script load
      if (!window.Razorpay) {
        alert('Razorpay SDK is not available, please try again!');
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
              alert('✅ Payment successful!');
            } else {
              alert('❌ Payment verification failed!');
            }
            navigate('/')
          } catch (err) {
            console.error("❌ Verification Error:", err.response?.data || err.message);
            alert('❌ Paymemmmmnt verification failed.');
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

      // Open Razorpay payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.data);
        alert(`Error: ${error.response.data.error || 'Unknown backend issue'}`);
      } else {
        console.error('Network or unknown error:', error.message);
        alert('Network or unknown error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Make a Payment</h2>
      <h1>{cartItemAmount}</h1>
      <button
        onClick={handlePayment}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#F37254',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Pay;
