import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [orderDetailId, setOrderDetailId] = useState('');

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = () => {
      handlePayment();
    };
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/payment/', {
        amount: parseFloat(amount),
        id: orderDetailId,
      });

      const { order_id, amount: paymentAmount, razorpay_key } = response.data;

      const options = {
        key: razorpay_key,
        amount: paymentAmount,
        currency: 'INR',
        name: 'Dilshad Store',
        description: 'Card Payment',
        order_id: order_id,
        method: 'card', 
        handler: function (response) {
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        },
        prefill: {
          name: 'Dilshad Ali',
          email: 'dilshad@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#4f46e5',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Payment failed: ' + error.message);
    }
  };

  const handleClick = () => {
    if (!amount || !orderDetailId) {
      alert('Please enter both amount and order detail ID');
      return;
    }
    loadRazorpay();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">Card Payment</h1>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Order Detail ID"
          value={orderDetailId}
          onChange={(e) => setOrderDetailId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          Pay with Card 💳
        </button>
      </div>
    </div>
  );
}

export default PaymentForm;
