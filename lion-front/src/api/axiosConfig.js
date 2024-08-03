import axios from 'axios';
import { setCookie } from '../utils/cookie';

const API_URL = 'http://localhost:8000/user/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 요청 시 쿠키를 포함하여 보내도록 설정
});
// 토큰 갱신 함수
const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}auth/refresh/`);
    const newAccessToken = response.data.access;
    // 새로운 액세스 토큰을 쿠키에 설정
    setCookie('access', newAccessToken, 10); // 30분 동안 유효
    return newAccessToken;
  } catch (err) {
    console.error('Token refresh failed', err);
    // 만약 토큰 갱신에 실패하면 로그인 페이지로 리디렉션
    window.location.href = '/login';
    throw err;
  }
};

axiosInstance.interceptors.request.use(
  async (originalConfig) => {
    const config = { ...originalConfig };
    try {
      await axiosInstance.get(`${API_URL}auth/verify/`);
      return config; // 토큰이 유효하다면 요청을 계속 진행
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          // 새로운 액세스 토큰으로 원래 요청을 재시도
          // config.headers.Authorization = `Bearer ${newAccessToken}`;
          return config;
        } catch (err) {
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const newAccessToken = await refreshAccessToken();
//         // 새로운 액세스 토큰으로 원래 요청을 재시도
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
