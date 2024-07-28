import axios from 'axios';
import axiosInstance from './axiosConfig';

const API_URL = 'http://localhost:8000/diary/private';

// PrivateDiary Entry 가져오기 GET
export const fetchPrivateDiaryEntry = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
// PrivateDiary id에 맞는 거 하나만 가져오기 GET
export const fetchPrivateDiaryOne = async ( diary_id ) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${diary_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
// Sentiment

