import axios from 'axios';

const API_URL = 'http://localhost:8000/';

// 상담사 지원 폼 작성 POST 요청 - WritePost.js
export const WriteCounselorApi = async (
  name,
  age,
  workIn,
  purpose,
  openlink,
  giveTalk,
  categories
) => {
  try {
    const response = await axios.post(`${API_URL}matching/`, {
      name,
      age,
      workIn,
      purpose,
      openlink,
      giveTalk,
      categories,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// 카테고리 기준으로 랜덤 Gate Keeper 매칭해주기 - GET
export const randomMatchingApi = async (categories) => {
  try {
    const response = await axios.get(`${API_URL}matching/${categories}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
