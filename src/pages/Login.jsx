
import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { toast } from 'react-hot-toast'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/log/", {
        username: username,
        password: password,
      });
      Cookies.set("accesstoken", res.data.access_token);
      Cookies.set("refreshtoken", res.data.refresh_token);
      toast.success(res.data.message); 
      const token = Cookies.get('accesstoken');
      try {
        const response = await axiosInstance.get('/current/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.is_admin) {
          navigate('/admin')
          
        } else {
          navigate('/')
          
        }
      } catch (error) {
        console.error('Error verifying admin status:', error);
      }
      


    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed"); 
    }
  };

  const toRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eeecec] via-[#fffafa] to-[#f1dcde] px-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <button
            onClick={toRegister}
            className="mt-2 px-5 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
