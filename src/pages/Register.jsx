import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const res = await axiosInstance.post("/reg/", {
        username: username,
        password: password,
        password2: confirmPassword,
      });      
      alert(res.data.messages);
      navigate('/login')
    } catch (error) {
      alert(error.response.data.username)      
    }     
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 ">
      <div className="bg-white p-10 rounded-4xl w-90">
        <h1 className="text-2xl mb-5 text-center font-semibold">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-2 py-1"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-2 py-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-2 py-1"
              required
            />
          </div>

          <button type="submit" className="w-full h-10 bg-blue-500 text-white py-1 rounded-4xl">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
