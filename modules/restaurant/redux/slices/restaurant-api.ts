import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  RestaurantInfo,
} from "@/modules/common/types/restaurant.types";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  endpoints: (builder) => ({
    getRestaurant: builder.query<RestaurantInfo, string | string[]>({
      query: (id) => ({
        url: `/restaurant/${id}`,
        method: "GET",
      }),
    }),
    getRestaurants: builder.query<RestaurantInfo[], void>({
      query: () => ({
        url: "/restaurant/owner-by",
        method: "GET",
      }),
    }),
    createRestaurant: builder.mutation<
      CreateRestaurantResponse,
      CreateRestaurantRequest
    >({
      query: (restaurantInfo) => ({
        url: "/restaurant",
        method: "POST",
        body: {
          name: restaurantInfo.restaurantName,
          address: restaurantInfo.address,
          ownerId: restaurantInfo.ownerId,
        },
      }),
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
} = restaurantApi;
