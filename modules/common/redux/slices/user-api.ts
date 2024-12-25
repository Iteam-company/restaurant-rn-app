import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/api';
import { prepareHeadersWithAuth } from '../utils/prepareHeadersWithAuth';

export const userApi = createApi({
  reducerPath: 'user-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}}/users`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/user/',
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/uses',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
