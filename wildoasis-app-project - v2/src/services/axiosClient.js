import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout:10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use( (config) => {

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = "multipart/form-data";
  }else {
    config.headers['Content-Type'] = "application/json";
  }

  return config;
}, (error) => Promise.reject(error));

export default axiosClient;
