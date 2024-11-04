// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Ensure http:// or https:// is added to the base URL
});

// Use an interceptor to add the Authorization header before each request
axiosInstance.interceptors.request.use(
  (config) => {
   
      const token = localStorage.getItem('userToken'); // Access `localStorage` only on the client
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
