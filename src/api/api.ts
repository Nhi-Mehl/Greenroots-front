import axios, { AxiosInstance } from 'axios';
import { store, RootState } from '../store/store';

// Vérifie si l'URL de base API est définie
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
if (!API_BASE_URL) {
  console.error(
    'VITE_API_BASE_URL is not defined. Please check your .env file.'
  );
}

// Création d'une instance Axios avec l'URL de base définie
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout pour les requêtes
});

// Intercepteur pour ajouter le token JWT aux en-têtes des requêtes
api.interceptors.request.use(
  function addAuthToken(originalConfig) {
    const config = { ...originalConfig };
    const state: RootState = store.getState();
    const { token } = state.auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function handleRequestError(error) {
    // Gère les erreurs avant que la requête ne parte
    console.error('Request Error: ', error);
    return Promise.reject(error);
  }
);

export default api;
