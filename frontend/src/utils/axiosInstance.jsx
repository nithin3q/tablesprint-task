// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tablesprint-task.onrender.com', // Adjust this to your API base URL
  timeout: 15000, // Increase the timeout duration to 5 seconds
  headers: {'Content-Type': 'application/json'}
});

export default axiosInstance;
