import axiosInstance from "./axiosConfig";

const API_URL = "http://localhost:8000/";

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

// 일기 전체 읽어오기 GET - Posts.js
export const ReadPostsApi = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}diary/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// 일기 하나 읽어오기 GET - Posts.js
export const ReadPersonalPostApi = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}diary/${id}`);
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
