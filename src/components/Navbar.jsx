

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { CartItemsContext } from '../context/CartContext';


import { AiOutlineLogin } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const {setCart}=useContext(CartItemsContext)
  const location=useLocation()

  useEffect(() => {
    const token = Cookies.get('accesstoken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove('accesstoken');
    Cookies.remove('refreshtoken');
    // setCart([])
    
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-slate-800 to-gray-700 shadow-lg px-4 py-3 sticky top-0 z-50">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-100 tracking-wide">Velvora</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-amber-100 hover:text-green-400 transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-amber-100 tracking-wider">Velvora </h2>
        <ul className="flex space-x-8 items-center">
          <li>
            <Link
              to="/"
              className="text-amber-100 font-medium hover:text-green-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
      
              className="text-amber-100 font-medium hover:text-green-400 transition"
            >
              Cart
            </Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  
                  className="text-amber-100 font-medium hover:text-green- 400 transition "
                >
                  
                  <AiOutlineLogin />
                </Link>
                
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-amber-100 font-medium hover:text-green-400 transition"
                >
                   <SiGnuprivacyguard />
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-amber-100 font-medium hover:text-green-400 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden mt-3 rounded-md ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <li className="py-3 px-4 bg-amber-700 rounded-t-md">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block text-white font-medium hover:text-green-300 transition"
          >
            Home
          </Link>
        </li>
        <li className="py-3 px-4 bg-slate-700 border-t border-slate-600">
          <Link
            to="/cart"
            onClick={handleLinkClick}
            className="block text-white font-medium hover:text-green-300 transition"
          >
            Cart
          </Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="py-3 px-4 bg-slate-700 border-t border-slate-600">
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="block text-white font-medium hover:text-green-300 transition"
              >
                Login
              </Link>
            </li>
            <li className="py-3 px-4 bg-slate-700 border-t border-slate-600 rounded-b-md">
              <Link
                to="/register"
                onClick={handleLinkClick}
                className="block text-white font-medium hover:text-green-300 transition"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="py-3 px-4 bg-slate-700 border-t border-slate-600 rounded-b-md">
            <button
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}
              className="block text-white font-medium hover:text-green-300 transition w-full text-left"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
