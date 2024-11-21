import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
