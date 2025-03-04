import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { GetProfileResponse } from '../../../@types/User';
import { LoginResponse, InitialAuthState } from '../../../@types/Credentials';

// Chargement initial du token depuis le localStorage
const tokenFromStorage = localStorage.getItem('token');

const userFromStorage = localStorage.getItem('user');

// Définir l'état initial
const initialState: InitialAuthState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  accessToken: null,
  isAuthenticated: Boolean(tokenFromStorage),
};

// Créer le slice utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir le token et l'état d'authentification lors de la connexion
    setToken: (state, action: PayloadAction<LoginResponse>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      localStorage.setItem('token', accessToken);
    },

    // Action pour gérer la déconnexion ou la suppression de l'utilisateur
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // Action pour mettre à jour les informations utilisateur
    setUser: (state, action: PayloadAction<GetProfileResponse | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
  },
});

// Exporter les actions générées
export const { setToken, clearAuth, setUser } = authSlice.actions;

// Selector pour obtenir l'utilisateur actuellement connecté
export const selectCurrentUser = (state: RootState) => state.auth.user;

// Exporter le reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;
