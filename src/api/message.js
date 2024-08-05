import axios from 'axios';

const API_URL = 'http://localhost:8000/';

// message 가져오는 POST
const fetchMessagesApi = async () => {
  try {
    const response = await axios.get(`${API_URL}message/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export default fetchMessagesApi;
