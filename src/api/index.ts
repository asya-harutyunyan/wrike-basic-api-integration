import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const $apiClient = axios.create({
  baseURL: process.env.WRIKE_API_URL,
});

const handleError = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error) && !!error.response?.data?.message) {
    return Promise.reject(error.response.data);
  } else {
    return Promise.reject(error);
  }
};

$apiClient.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
  }

  if (process.env.WRIKE_TOKEN) {
    config.headers['Authorization'] = `Bearer ${process.env.WRIKE_TOKEN}`;
  }

  return config;
}, handleError);

$apiClient.interceptors.response.use((response) => response.data, handleError);

export default $apiClient;
