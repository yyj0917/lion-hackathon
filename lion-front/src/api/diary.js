import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:8000/';

// 일기 전체 읽어오기 GET - Posts.js -> 토큰검증이 필요없어서 axios를 사용
export const ReadPostsApi = async () => {
  try {
    const response = await axios.get(`${API_URL}diary/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// 일기 쓰기 POST 요청 - WritePost.js
export const WritePostApi = async (title, body, date) => {
  try {
    const response = await axiosInstance.post(`${API_URL}diary/`, {
      title,
      body,
      date,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};



// 일기 하나 읽어오기 GET - Posts.js
export const ReadPersonalPostApi = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}diary/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// 일기 수정하기 PUT -
export const UpdatePostApi = async (id, title, body, date) => {
  try {
    const response = await axiosInstance.put(`${API_URL}diary/${id}/`, {
      title,
      body,
      date,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// 일기 삭제하기 DELETE -
export const DeletePostApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}diary/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// 공감하기 POST - 
export const LikePostApi = async (id, reaction) => {
  try {
    const response = await axiosInstance.post(`${API_URL}diary/${id}/react/`, {
      reaction,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
} 
// 공감 취소 POST
export const UnlikePostApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}diary/${id}/unreact/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
// 내가 쓴 공유일기 GET
export const ReadSharedPostsApi = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}diary/my/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// 일기 신고기능 유저당 1회 신고가능 + 5회 신고시 일기 디비에서 삭제
export const ReportPostApi = async (id) => {
  try {
    const response = await axiosInstance.post(`${API_URL}diary/${id}/report/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};