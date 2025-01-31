import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetProfileResponse } from '../../../@types/IUser';
import { LoginResponse } from '../../../@types/Credentials';

import type { RootState } from '../../store';

// Définir les types TypeScript pour l'état utilisateur
type InitialAuthState = {
  user: GetProfileResponse | null;
  accessToken: string | null;
  isAuthenticated: boolean; // Ajout pour indiquer si l'utilisateur est connecté
};
// Chargement initial du token depuis le localStorage
const tokenFromStorage = localStorage.getItem('token');

// Définir l'état initial
const initialState: InitialAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: !!tokenFromStorage, // Si un token est présent,
};

// Créer le slice utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir les informations utilisateur lors de la connexion
    setToken: (state, action: PayloadAction<LoginResponse>) => {
      const { accessToken } = action.payload;

      state.accessToken = accessToken;
      state.isAuthenticated = true;
      localStorage.setItem('token', accessToken);
    },

    // Action pour déconnecter l'utilisateur
    logoutAction: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },

    // Action pour mettre à jour les informations utilisateur
    // updateUser: (state, action: PayloadAction<GetProfileResponse>) => {
    //   state.user = action.payload;
    // },

    // Action pour mettre à jour les informations utilisateur
    setUser: (state, action: PayloadAction<GetProfileResponse>) => {
      state.user = action.payload;
    },
  },
});

// Exporter les actions générées
export const { setToken, logoutAction, setUser } = authSlice.actions;

// Selector pour obtenir l'utilisateur actuellement connecté
export const selectCurrentUser = (state: RootState) => state.auth.user;

// Exporter le reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;
