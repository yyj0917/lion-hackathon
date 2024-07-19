import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const fetchMessages = async () => {
    try {
        const response = await axios.get(`${API_URL}message/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

export default fetchMessages;
