import axios from 'axios';

/// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});


/// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


/// Response interceptor to handle token expiration or other errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized! Redirecting to login...');
      // Optionally redirect or show a message
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
