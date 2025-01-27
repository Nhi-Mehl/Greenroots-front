import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetProfileResponse, LoginResponse } from '../../api/apiSlice';

// Définir les types TypeScript pour l'état utilisateur
type InitialUserState = GetProfileResponse & {
  token: string | null;
};

// Définir l'état initial
const initialState: InitialUserState = {
  id: 0,
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  address: '',
  zip_code: '',
  city: '',
  country: '',
  phone_number: '',
  token: null,
};

// Créer le slice utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir les informations utilisateur
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    // Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

// Exporter les actions générées
export const { login, logout } = authSlice.actions;

// Exporter le reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;
