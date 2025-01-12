import axios, { AxiosInstance } from 'axios';
import { store, RootState } from '../store/store';

// Get the base URL from the environment variables .env file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an axios instance so we can use it in our components with base URL already defined
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to add the token (received after a login action) to the request headers.
api.interceptors.request.use(function addAuthToken(originalConfig) {
  const config = { ...originalConfig };
  // Do something before request is sent
  const state: RootState = store.getState();
  const { token } = state.user; // Récupère le token depuis Redux

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
