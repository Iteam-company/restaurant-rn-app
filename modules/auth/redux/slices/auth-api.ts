import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../../common/constants/api';
import { prepareHeadersWithAuth } from '@/modules/common/redux/utils/prepareHeadersWithAuth';
import { UserType } from '@/modules/common/types/user.types';

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
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
    validateToken: builder.query<UserType, null>({
      query: () => '/auth/me',
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useValidateTokenQuery } =
  authApi;
