import axios from 'axios';

// 인증 관련 API 호출을 담당하는 모듈입니다.
const API_URL = 'http://localhost:8000/auth/';
// 로그인 API 호출
export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}login/`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// 회원가입 API 호출
export const registerApi = async (username, password, email) => {
    try {
        const response = await axios.post(`${API_URL}register/`, { username, password, email });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
// refreshToken을 이용한 토큰 재발급 API 호출
export const refreshTokenApi = async (refreshToken) => {
    const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
    return response.data;
  };
// 로그아웃 API 호출
export const logoutApi = async () => {
    try {
        const response = await axios.post('/api/logout');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
