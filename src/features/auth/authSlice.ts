import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définir les types TypeScript pour l'état utilisateur
interface UserState {
  token: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
}

// Définir l'état initial
const initialState: UserState = {
  token: null,
  id: null,
  name: null,
  email: null,
};

// Créer le slice utilisateur
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action pour définir les informations utilisateur
    setUser: (
      state,
      action: PayloadAction<{
        token: string;
        id: number;
        name: string;
        email: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    // Action pour déconnecter l'utilisateur
    clearUser: (state) => {
      state.token = null;
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

// Exporter les actions générées
export const { setUser, clearUser } = authSlice.actions;

// Exporter le reducer pour l'intégrer dans le store Redux
export default authSlice.reducer;
