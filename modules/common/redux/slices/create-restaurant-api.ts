import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/api";

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
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJKTVRoZUJlc3QiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTczNDAyMTk0MSwiZXhwIjoxNzM0MDMyNzQxfQ.GnB8C1KAEcoPwYBU7GeUNiK3YzIAEJVY4uH4192bZWYr";
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
        },
      }),
    }),
  }),
});

export const { useCreateRestaurantMutation } = restaurantApi;
