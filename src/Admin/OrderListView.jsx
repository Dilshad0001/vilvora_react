
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function OrderListView() {
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    const orderStatus = orderDetail.map(order => ({
      id: order.id,
      status: order.status,
      is_finished: true,
    }));

    setOrderStatus(orderStatus);
  }, [orderDetail]);

  useEffect(() => {
    const fetchProductdetails = async () => {
      try {
        const res = await axiosInstance.get('/adminorder/');
        setOrderDetail(res.data);
      } catch (error) {
        console.error('fetch error', error);
      }
    };
    fetchProductdetails();
  }, []);

  const changePayment = async (id, payment_status) => {
    console.log('clickedd', payment_status);

    if (payment_status === 'Pending') {
      console.log('pee');

      try {
        const res = await axiosInstance.put('/adminorder/', {
          order_id: id,
          payment_status: 'Paid',
        });
      } catch (error) {
        console.error('payment update error', error);
      }
    } else {
      console.log('no pe');

      return;
    }
  };

  const changeDelivery = async (id, status) => {
    console.log('clickedd');

    if (status === 'Pending') {
      console.log('pee');

      try {
        const res = await axiosInstance.put('/adminorder/', {
          order_id: id,
          status: 'Completed',
          is_finished: true,
          order_number: 1,
        });

        setOrderDetail((prevState) =>
          prevState.map((order) =>
            order.id === id ? { ...order, status: 'Completed', is_finished: true } : order
          )
        );
      } catch (error) {
        console.error('payment update error', error);
      }
    } else {
      console.log('no pe');

      return;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Details</h1>
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Payment Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Total Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Delivery Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderDetail.map((order, index) => (
              <tr key={index} className={`transition-all ${order.is_finished ? 'bg-green-100' : 'bg-white hover:bg-gray-100'}`}>
                <td className="px-6 py-4 text-sm text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{order.delivery_address}</td>
                <td
                  onClick={() => changePayment(order.id, order.payment_status)}
                  className={`cursor-pointer px-6 py-4 text-sm ${order.payment_status === 'Pending' ? 'text-red-600' : 'text-green-600'} hover:bg-blue-200`}
                >
                  {order.payment_status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">₹ {order.total_amount}</td>
                <td
                  onClick={() => changeDelivery(order.id, order.status)}
                  className={`cursor-pointer px-6 py-4 text-sm ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'} hover:bg-blue-200`}
                >
                  {order.status}
                </td>

                <td className="px-6 py-4 text-sm text-gray-800">
                  {new Date(order.date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                 </td>

                <td className="px-6 py-4 text-sm text-gray-800">
                  <ul className="list-disc pl-6">
                    {order.carts.map((item, i) => (
                      <li key={i}>{item.product.product_name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderListView;
