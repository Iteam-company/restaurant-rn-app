import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { API_URL, AUTH_TOKEN_KEY } from '../../../common/constants/api';

interface CreateRestaurantRequest {
  restaurantName: string;
  address: string;
}

interface CreateRestaurantResponse {
  id: string;
  name: string;
  address: string;
}

export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createRestaurant: builder.mutation<
      CreateRestaurantResponse,
      CreateRestaurantRequest
    >({
      query: (restaurantInfo) => ({
        url: '/restaurant',
        method: 'POST',
        body: {
          name: restaurantInfo.restaurantName,
          address: restaurantInfo.address,
        },
      }),
    }),
  }),
});

export const { useCreateRestaurantMutation } = restaurantApi;
