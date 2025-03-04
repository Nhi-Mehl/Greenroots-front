import apiSlice from '../../api/apiSlice';
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '../../../@types/Credentials';

// Étendre apiSlice pour ajouter des endpoints spécifiques à l'authentification
const authApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['User'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      // Endpoint pour la connexion
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (credentials: LoginRequest) => ({
          url: '/auth/login',
          method: 'post',
          data: { ...credentials },
        }),
        invalidatesTags: ['User'],
      }),

      // Endpoint pour l'inscription
      register: builder.mutation<SignUpResponse, SignUpRequest>({
        query: (credentials: SignUpRequest) => ({
          url: '/auth/register',
          method: 'post',
          data: { ...credentials },
        }),
      }),

      // Endpoint pour la deconnexion
      logout: builder.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'post',
        }),
        invalidatesTags: ['User'],
      }),
      // protected: builder.mutation<{ message: string }, void>({
      //   query: () => 'protected',
      // }),
    }),
  });

// RTK Query automatically generates hooks for each endpoint
// as use{EndpointName}Query or use{EndpointName}Mutation
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
