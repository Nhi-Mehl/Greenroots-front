import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import api from './api';

type BaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

// types.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

// Custom base query to use Axios
// Définir un BaseQuery personnalisé avec Axios
const axiosBaseQuery: BaseQueryFn<BaseQueryParams, unknown, unknown> = async ({
  url,
  method,
  data,
  params,
}) => {
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
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = apiSlice;
