import axios, { AxiosInstance } from 'axios';

// Create an axios instance so we can use it in our components with base URL already defined
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Add an interceptor to add the token (received after a login action) to the request headers.
// So we don't need to take care of it in every request.
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.request.use(function addAuthToken(originalConfig) {
  const config = { ...originalConfig };
  // Do something before request is sent
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
