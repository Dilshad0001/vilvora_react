

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

import Cookies from "js-cookie"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await axiosInstance.post("/log/",{
        username:username,
        password:password
      }); 
      Cookies.set("accesstoken",res.data.access_token),
      Cookies.set("refreshtoken",res.data.refresh_token),
      alert(res.data.message)
      navigate('/')
    }catch(error){      
      alert(error.response.data.message)
    }
  };

  const toRegister=()=>{
     navigate('/register')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded w-80 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-2 py-1 text-sm"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-2 py-1 text-sm"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 text-sm"
          >
            Login
          </button>
        </form>
        <div className="text-right">
        <button
           onClick={toRegister}
           className="px-4 py-1 mt-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Register
         </button>
          </div>


      </div>
    </div>
  );
}

export default Login;
