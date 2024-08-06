// src/reducers/sentimentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPrivateDiaryAnalysis } from '../../api/privateDiary';

export const fetchSentimentResult = createAsyncThunk(
    'sentiment/fetchSentimentResult', // 액션 타입 문자열
    async () => { // 비동기 작업 함수
      const response = await fetchPrivateDiaryAnalysis(); // API 호출
      console.log(response);
      return response.data; // API 응답 데이터 반환
    }
  );
  

const sentimentSlice = createSlice({
  name: 'sentiment',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentimentResult.pending, (state) => {
        state.loading = true; // 비동기 작업 시작 시 로딩 상태 설정
      })
      .addCase(fetchSentimentResult.fulfilled, (state, action) => {
        state.loading = false; // 비동기 작업 성공 시 로딩 상태 해제
        state.data = action.payload; // API 응답 데이터 저장
      })
      .addCase(fetchSentimentResult.rejected, (state, action) => {
        state.loading = false; // 비동기 작업 실패시 로딩 상태 해제
        state.error = action.error.message; // 에러 메시지 저장
      });
  },
});

export default sentimentSlice.reducer;
