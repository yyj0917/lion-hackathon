import axios from "axios";
import { login } from "../redux/reducers/authReducer";
import { deleteCookie, setCookie } from "../utils/cookie";
import axiosInstance from "./axiosConfig";

// 인증 관련 API 호출을 담당하는 모듈입니다.
const API_URL = 'http://localhost:8000/user/auth/';
// 로그인 API 호출
export const loginApi = (email, password) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`${API_URL}login/`, {
      email,
      password,
    });
    if (response.data.token) {
      setCookie("access", response.data.token.access, 5);
      setCookie("refresh", response.data.token.refresh, 1400);
      dispatch(login());
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
    const response = await axiosInstance.post(`${API_URL}register/`, {
      email,
      password,
      name,
      age,
      position,
      office,
      phonenumber,
      username,
    });
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
    deleteCookie("access");
    deleteCookie("refresh");
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
