import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5050',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

// Refresh auth token on every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
