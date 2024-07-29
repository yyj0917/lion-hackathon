import axios from "axios";

const API_URL = "http://localhost:8000/";

// 상담사 지원 폼 작성 POST 요청 - WritePost.js
export const WriteCounselorApi = async (
  name,
  age,
  workIn,
  purpose,
  openlink,
  giveTalk,
  categories,
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
