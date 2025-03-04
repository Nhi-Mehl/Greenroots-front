import axios, { AxiosInstance } from 'axios';

// Vérifie si l'URL de base API est définie
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Création d'une instance Axios avec l'URL de base définie
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Timeout pour les requêtes
  timeout: 10000,
});

// Intercepteur pour ajouter le token JWT aux en-têtes des requêtes
api.interceptors.request.use(
  function addAuthToken(originalConfig) {
    const config = { ...originalConfig };
    // const state: RootState = store.getState();
    // const { token } = state.auth;
    // const { token } = store.getState().auth;
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function handleRequestError(error) {
    // Gère les erreurs avant que la requête ne parte
    return Promise.reject(error);
  }
);

export default api;
