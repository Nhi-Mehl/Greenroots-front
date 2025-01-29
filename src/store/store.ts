import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../api/apiSlice';
import authReducer from '../features/auth/authSlice';

const isDevMode = import.meta.env.MODE === 'development';

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: isDevMode,
});

// Types utilitaires
export type RootState = ReturnType<typeof store.getState>;
// on recupere le type de la fonction dispatch du store dans AppDispatch
export type AppDispatch = typeof store.dispatch;
