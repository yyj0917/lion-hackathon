import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:8000/';

// 상담사 지원 폼 작성 POST 요청 - WritePost.js
export const WriteCounselorApi = async (
  name,
  age,
  workIn,
  work_experience,
  openlink,
  giveTalk,
  categories
) => {
  try {
    const response = await axiosInstance.post(`${API_URL}matching/advisor/`, {
      name,
      age,
      workIn,
      work_experience,
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
    const response = await axiosInstance.get(
      `${API_URL}matching/${categories}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Gate Keeper 전부 불러오기 - GET
export const fetchGateKeeperApi = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}matching/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
