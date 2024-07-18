import axios from 'axios';

const fetchMessages = async () => {
    try {
        const response = await axios.get('/api/messages');
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

export default fetchMessages;
