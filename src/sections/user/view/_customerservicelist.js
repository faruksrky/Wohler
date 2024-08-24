import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('/api/users'); // API endpoint'inizi buraya yazın
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    return [];
  }
};
