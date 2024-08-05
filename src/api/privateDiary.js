import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:8000/diary/private';

// PrivateDiary Entry 가져오기 GET
export const fetchPrivateDiaryEntry = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// PrivateDiary id에 맞는 거 하나만 가져오기 GET
export const fetchPrivateDiaryOne = async (diary_id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${diary_id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// PrivateDiary Write Diary - POST
export const WritePrivateDiaryApi = async (title, body, date) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/`, {
      title,
      body,
      date,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// PrivateDiary Update Diary - PUT
export const UpdatePrivateDiaryApi = async (diary_id, title, body, date) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${diary_id}/`, {
      title,
      body,
      date,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// PrivateDiary Delete Diary - DELETE
export const DeletePrivateDiaryApi = async (diary_id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/${diary_id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// PrivateDiary 감정분석 결과 받아오기 - GET
export const fetchPrivateDiaryAnalysis = async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:8000/diary/sentiment-summary/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};