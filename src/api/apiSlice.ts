import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import api from './api';
import { IUser } from '../@types';
import { I } from 'vitest/dist/chunks/reporters.D7Jzd9GS.js';

type BaseQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
};

// types.ts
export interface UserProfile {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
export interface SignUpRequest {
  first_name: string;
  last_name: string;
  address: string;
  zip_code: string;
  city: string;
  country: string;
  phone_number: string;
  email: string;
  password: string;
  confirmation: string;
}
export interface SignUpResponse {
  message: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserProfile;
  token: string;
}
export type GetProfileResponse = Omit<IUser, 'password' | 'confirmation'>;

// Custom base query to use Axios
// Définir un BaseQuery personnalisé avec Axios
const axiosBaseQuery: BaseQueryFn<BaseQueryParams> = async ({
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
      query: (credentials: LoginRequest) => ({
        url: '/auth/login',
        method: 'post',
        data: { ...credentials },
      }),
    }),
    register: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials: SignUpRequest) => ({
        url: '/auth/register',
        method: 'post',
        data: { ...credentials },
      }),
    }),
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

export const { useLoginMutation, useGetProfileQuery } = apiSlice;
