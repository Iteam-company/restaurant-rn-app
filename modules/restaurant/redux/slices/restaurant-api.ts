import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import {
  UpdateUserInfoI,
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  DeleteWorker,
  RestaurantInfo,
} from "@/modules/common/types/restaurant.types";

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: ["Restaurant"],
  endpoints: (builder) => ({
    getRestaurant: builder.query<RestaurantInfo, string>({
      query: (id) => ({
        url: `/restaurant/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Restaurant", id },
        { type: "Restaurant", id: "LIST" },
      ],
    }),
    getRestaurants: builder.query<RestaurantInfo[], void>({
      query: () => ({
        url: "/restaurant/owner-by",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Restaurant" as const, id })),
              { type: "Restaurant", id: "LIST" },
            ]
          : [{ type: "Restaurant", id: "LIST" }],
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
      invalidatesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    deleteRestaurant: builder.mutation<void, number>({
      query: (restaurantId) => ({
        url: `/restaurant/${restaurantId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    removeWorker: builder.mutation<RestaurantInfo, DeleteWorker>({
      query: ({ userId, restaurantId }) => ({
        url: `/restaurant/workers/${restaurantId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { restaurantId }) => [
        { type: "Restaurant", id: restaurantId },
        { type: "Restaurant", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useRemoveWorkerMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
