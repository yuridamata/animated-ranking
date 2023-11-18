import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
