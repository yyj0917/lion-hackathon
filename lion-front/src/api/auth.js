import axiosInstance from './axiosConfig';

// 인증 관련 API 호출을 담당하는 모듈입니다.
const API_URL = 'http://localhost:8000/user/auth/';
// 로그인 API 호출
export const loginApi = async (email, password) => {
    try {
        const response = await axiosInstance.post(`${API_URL}login/`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

// 회원가입 API 호출
export const registerApi = async (
    email, password, name, age, position, office, phonenumber, username,
) => {
    try {
        const response = await axiosInstance.post('http://localhost:8000/user/register/', { email, password, name, age, position, office, phonenumber, username });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
// refreshToken을 이용한 토큰 재발급 API 호출
export const refreshTokenApi = async (refreshToken) => {
    const response = await axiosInstance.post(`${API_URL}refresh/`, { refresh: refreshToken });
    return response.data;
  };
// 로그아웃 API 호출
export const logoutApi = async () => {
    try {
        const response = await axiosInstance.post(`${API_URL}logout/`);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
