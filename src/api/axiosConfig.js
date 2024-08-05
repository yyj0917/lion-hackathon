import axios from 'axios';
import { logout } from '../redux/reducers/authReducer';
import store from '../redux/store';

const API_URL = 'http://localhost:8000/user';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the access token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken', accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, redirect to login
          window.location.href = '/login';
          return Promise.reject();
        }
        const response = await axios.post(`${API_URL}auth/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('accessToken', response.data.access);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        store.dispatch(logout());
        window.location.href = '/login'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;