import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    Authorization: Cookies.get('token'),
  },
});
