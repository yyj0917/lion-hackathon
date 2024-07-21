import axios from 'axios';

const API_URL = 'http://localhost:8000/';

// 일기 쓰기 POST 요청 - WritePost.js
export const WriteCounselorApi = async (name, age, workIn, purpose, openlink, giveTalk) => {
    try {
        const response = await axios.post(`${API_URL}matching/`, { name, age, workIn, purpose, openlink, giveTalk });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};