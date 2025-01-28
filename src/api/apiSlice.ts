import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import api from './api';
import {
  GetProfileResponse,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '../@types/Credentials';

// type BaseQueryParams = {
//   url: string;
//   method?: AxiosRequestConfig['method'];
//   data?: AxiosRequestConfig['data'];
//   params?: AxiosRequestConfig['params'];
// };

// Définir un BaseQuery personnalisé avec Axios
const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  {
    status: number;
    data: unknown;
  }
> = async ({ url, method, data, params }) => {
  try {
    const result = await api({
      url,
      method,
      data,
      params,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      },
    };
  }
};

// Création de l'API Slice avec des endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    // Endpoint pour la connexion
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: '/auth/login',
        method: 'post',
        data: { ...credentials },
      }),
    }),
    // Endpoint pour l'inscription
    register: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials: SignUpRequest) => ({
        url: '/auth/register',
        method: 'post',
        data: { ...credentials },
      }),
    }),
    // Endpoint pour récupérer le profil utilisateur
    getProfile: builder.query<GetProfileResponse, void>({
      query: () => ({
        url: '/users/profile',
        method: 'get',
      }),
    }),
    // protected: builder.mutation<{ message: string }, void>({
    //   query: () => 'protected',
    // }),
  }),
});

// RTK Query automatically generates hooks for each endpoint
// as use{EndpointName}Query or use{EndpointName}Mutation
export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  apiSlice;
