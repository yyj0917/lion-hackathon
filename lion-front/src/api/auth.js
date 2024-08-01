import axiosInstance from "./axiosConfig";
/*
//쿠키 설정 함수
const setCookie = (name, value, minutes) => { //name은 쿠키이름 ex)access token or refresh token, value는 쿠키에 저장되는 토큰 값 , minutes는 만료기간
  let expires = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); //분 x 초 x 밀리세컨드
    expires = "; expires" + date. toUTCString //만료기간 설정
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Lax" //쿠키에 저장
}

//쿠키 삭제 함수
const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;' //쿠키 삭제
};
*/

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
      //setCookie("accessToken", response.data.token.access, 5);
      //setCookie("refreshToken", response.data.token.refresh, 1400);
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
      //setCookie("accessToken", response.data.access, 5);
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
    //deleteCookie("accessToken");
    //deleteCookie("refreshToken");
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
