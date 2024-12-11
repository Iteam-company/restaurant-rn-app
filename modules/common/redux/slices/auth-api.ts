import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/api';

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: () => ({
        url: '/signin',
        method: 'POST',
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
