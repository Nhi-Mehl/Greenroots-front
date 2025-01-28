import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../api/apiSlice';
import { GetProfileResponse } from '../../@types/Credentials';

// Définir les types TypeScript pour l'état utilisateur
type InitialUserState = {
  user: GetProfileResponse | null;
  token: string | null;
  isAuthenticated: boolean; // Ajout pour indiquer si l'utilisateur est connecté
};
// Chargement initial du token depuis le localStorage
const tokenFromStorage = localStorage.getItem('token');

// Définir l'état initial
const initialState: InitialUserState = {
  user: null,
  token: null,
  isAuthenticated: !!tokenFromStorage, // Si un token est présent,
};

// Créer le slice utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir les informations utilisateur lors de la connexion
    login: (state, action: PayloadAction<LoginResponse>) => {
      const { token } = action.payload;
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem('token', token);
      }
    },
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    // Action pour mettre à jour les informations utilisateur
    updateProfile: (state, action: PayloadAction<GetProfileResponse>) => {
      state.user = action.payload;
    },
  },
});

// Exporter les actions générées
export const { login, logout, updateProfile } = authSlice.actions;

// Exporter le reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;

// Selector pour obtenir l'utilisateur actuellement connecté
export const selectCurrentUser = (state: { auth: InitialUserState }) =>
  state.auth.user;
