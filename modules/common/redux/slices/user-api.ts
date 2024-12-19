import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/api';

export const userApi = createApi({
  reducerPath: 'user-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}}/users`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users/',
        method: 'GET',
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
