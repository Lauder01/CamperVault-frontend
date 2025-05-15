import axios from 'axios';

const api = axios.create({
  baseURL: 'http://1192.168.1.100:4000/api',
  withCredentials: true,
});

export default api;