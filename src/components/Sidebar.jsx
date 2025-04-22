


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accesstoken');
    Cookies.remove('refreshtoken');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-800 text-white flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>
        
        <ul className="space-y-4 mt-8 md:mt-0">
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
          <li>
            <Link className="block hover:bg-gray-700 p-2 rounded">Settings</Link>
          </li>
          <li>
            <Link className="block hover:bg-gray-700 p-2 rounded">Offers</Link>
          </li>
          <li>
            <Link className="block hover:bg-gray-700 p-2 rounded">Inventory</Link>
          </li>
          <li>
            <Link className="block hover:bg-gray-700 p-2 rounded">Newsletter</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-20 text-left hover:bg-gray-700 p-2 rounded bg-red-700 mt-30"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
