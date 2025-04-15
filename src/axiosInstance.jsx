
// src/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",  // change as per your backend URL
});

// Add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("accesstoken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
