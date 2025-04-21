import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/product_view/" className="block hover:bg-gray-700 p-2 rounded">Products</Link>
        </li>
        <li>
          <Link to="/admin/order_details/" className="block hover:bg-gray-700 p-2 rounded">Orders</Link>
        </li>
        <li>
          <Link to="/admin/user_view/" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
