import axios from 'axios';
import { deleteCookie, setCookie } from '../utils/cookie';
import axiosInstance from './axiosConfig';

// login, register은 맨 처음에 보내는 요청이라 토큰이 없음
// 그렇기 때문에 axiosInstance를 사용하지 않고 axios를 사용합니다.

// 인증 관련 API 호출을 담당하는 모듈입니다.
const API_URL = 'http://localhost:8000/user/auth/';
// 로그인 API 호출
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}login/`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.token) {
      setCookie('access', response.data.token.access, 15);
      setCookie('refresh', response.data.token.refresh, 1400);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// 회원가입 API 호출
export const registerApi = async (
  email,
  password,
  name,
  age,
  position,
  office,
  phonenumber,
  username
) => {
  try {
    const response = await axios.post(
      `${API_URL}register/`,
      {
        email,
        password,
        name,
        age,
        position,
        office,
        phonenumber,
        username,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network Error');
    }
  }
};

// 로그아웃 API 호출
export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}logout/`);
    deleteCookie('access');
    deleteCookie('refresh');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// user 정보, 토큰 검증하기
export const UserInfoTokenVerify = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}verify/`);
    return response.data;
  } catch (error) {
    console.log('error.response.data.message');
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}user/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};
