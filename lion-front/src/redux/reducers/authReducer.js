// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialAuthState = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated === 'true';
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: getInitialAuthState(),
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // 로그인 시 로컬 스토리지에 저장

    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated'); // 로그아웃 시 로컬 스토리지에서 제거
    },
    
  },
});

export const { login, logout } = authSlice.actions;


export default authSlice.reducer;
