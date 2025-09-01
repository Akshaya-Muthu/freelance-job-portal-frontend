// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://freelance-job-portal-backend.onrender.com/api', // deployed backend URL
  withCredentials: true,
});

export default instance;
