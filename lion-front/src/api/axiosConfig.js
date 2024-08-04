import axios from 'axios';
import { setCookie } from '../utils/cookie';

const API_URL = 'http://localhost:8000/user/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor for adding the access token to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const response = await axios.get(`${API_URL}auth/verify/`, {
        withCredentials: true,
      });

      // 토큰이 유효하다면 요청을 계속 진행
      return config;
    } catch (error) {
      if (error.response && error.response.status === 401 && !config._retry) {
        config._retry = true;
        try {
          const response = await axios.post(`${API_URL}auth/refresh/`, {}, {
            withCredentials: true,
          });
          const newAccessToken = response.data.access;
          console.log('New access token', newAccessToken);

          // 새로운 액세스 토큰을 쿠키에 설정
          setCookie('access', newAccessToken, 10); // 10분 동안 유효

          // 새로운 액세스 토큰을 헤더에 설정
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 새로 갱신된 토큰이 반영된 요청을 다시 시도
          return axiosInstance(config);
        } catch (err) {
          console.error('Token refresh failed', err);
          // 만약 토큰 갱신에 실패하면 로그인 페이지로 리디렉션
          // window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);




export default axiosInstance;
