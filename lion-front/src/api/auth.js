import axiosInstance from "./axiosConfig";

// 인증 관련 API 호출을 담당하는 모듈입니다.
const API_URL = "http://localhost:8000/user/auth/";
// 로그인 API 호출
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${API_URL}login/`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token.access);
      localStorage.setItem("refreshToken", response.data.token.refresh);
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
  username,
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
      throw new Error("Network Error");
    }
  }
};
// refreshToken을 이용한 토큰 재발급 API 호출
export const refreshTokenApi = async (refreshToken) => {
  try {
    const response = await axiosInstance.post(`${API_URL}refresh/`, {
      refresh: refreshToken,
    });
    if (response.data.access) {
      localStorage.setItem("accessToken", response.data.access);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network Error");
  }
};
// 로그아웃 API 호출
export const logoutApi = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}logout/`);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log(response);
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
    throw new Error(error.response?.data?.message || "Network Error");
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}user/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network Error");
  }
};
