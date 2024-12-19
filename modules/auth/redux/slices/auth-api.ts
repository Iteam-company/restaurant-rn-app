import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../common/constants/api';

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    validateToken: builder.query({
      query: () => '/user',
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useValidateTokenQuery } =
  authApi;
