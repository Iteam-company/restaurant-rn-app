import { workerApi } from "./worker-api";
import {
  CreateRestaurantRequest,
  CreateRestaurantResponse,
  DeleteWorker,
  RestaurantInfo,
  UserInfo,
  TagTypes,
} from "../types";

export const restaurantApi = workerApi
  .enhanceEndpoints({
    addTagTypes: [TagTypes.RESTAURANT, TagTypes.USER],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getRestaurant: builder.query<RestaurantInfo, string>({
        query: (id) => ({
          url: `/restaurant/${id}`,
          method: "GET",
        }),
        providesTags: (_, __, id) => [
          { type: TagTypes.RESTAURANT, id },
          { type: TagTypes.RESTAURANT, id: "LIST" },
        ],
      }),
      getOwners: builder.query<UserInfo[], void>({
        query: () => ({ url: "/user/owners/", method: "GET" }),
      }),

      getRestaurants: builder.query<RestaurantInfo[] | RestaurantInfo, void>({
        query: () => ({
          url: "/restaurant/parse-owner-admin-waiter",
          method: "GET",
        }),
        providesTags: (result) => [
          { type: TagTypes.RESTAURANT, id: "LIST" },
          ...(Array.isArray(result)
            ? (result?.map(({ id }) => ({
                type: TagTypes.RESTAURANT,
                id,
              })) ?? [])
            : [
                {
                  type: TagTypes.RESTAURANT,
                  id: result?.id,
                },
              ]),
        ],
      }),
      updateRestaurant: builder.mutation<
        RestaurantInfo,
        { values: Partial<RestaurantInfo>; id: string }
      >({
        query: (restaurantInfo) => ({
          url: `/restaurant/${restaurantInfo.id}`,
          method: "PATCH",
          body: restaurantInfo,
        }),
        invalidatesTags: (result, error, { id }) => [
          { type: TagTypes.RESTAURANT, id },
          { type: TagTypes.RESTAURANT, id: "LIST" },
        ],
      }),
      uploadRestaurantImage: builder.mutation({
        query: ({ formData, restaurantId }) => ({
          url: `/restaurant/${restaurantId}/image`,
          method: "PATCH",
          body: formData,
        }),
        invalidatesTags: (result, error, { restaurantId }) => [
          { type: TagTypes.RESTAURANT, id: restaurantId },
          { type: TagTypes.RESTAURANT, id: "LIST" },
        ],
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
        invalidatesTags: [{ type: TagTypes.RESTAURANT, id: "LIST" }],
      }),

      deleteRestaurant: builder.mutation<void, number>({
        query: (restaurantId) => ({
          url: `/restaurant/${restaurantId}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: TagTypes.RESTAURANT, id: "LIST" }],
      }),

      removeWorker: builder.mutation<RestaurantInfo, DeleteWorker>({
        query: ({ userId, restaurantId }) => ({
          url: `/restaurant/workers/${restaurantId}/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { restaurantId, userId }) => [
          { type: TagTypes.RESTAURANT, id: restaurantId },
          { type: TagTypes.RESTAURANT, id: "LIST" },
          { type: TagTypes.USER, id: "LIST" },
          { type: TagTypes.USER, id: userId },
          { type: TagTypes.USER, id: `restaurant-${restaurantId}` },
        ],
      }),
      removeCurrentWorker: builder.mutation<RestaurantInfo, DeleteWorker>({
        query: ({ userId, restaurantId }) => ({
          url: `/restaurant/workers/${restaurantId}/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, { restaurantId, userId }) => [
          { type: TagTypes.RESTAURANT, id: restaurantId },
          { type: TagTypes.RESTAURANT, id: "LIST" },
          { type: TagTypes.USER, id: "LIST" },
          { type: TagTypes.USER, id: userId },
          { type: TagTypes.USER, id: `restaurant-${restaurantId}` },
        ],
      }),

      addWorker: builder.mutation<
        void,
        { userId: number; restaurantId: number }
      >({
        query: (body) => ({
          url: `/restaurant/workers`,
          method: "POST",
          body,
        }),
        invalidatesTags: (result, error, { restaurantId, userId }) => [
          { type: TagTypes.RESTAURANT, id: restaurantId },
          { type: TagTypes.RESTAURANT, id: "LIST" },
          { type: TagTypes.USER, id: "LIST" },
          { type: TagTypes.USER, id: userId },
          { type: TagTypes.USER, id: `restaurant-${restaurantId}` },
        ],
      }),
    }),
  });

export const {
  useCreateRestaurantMutation,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useGetOwnersQuery,
  useUpdateRestaurantMutation,
  useUploadRestaurantImageMutation,
  useRemoveWorkerMutation,
  useDeleteRestaurantMutation,
  useAddWorkerMutation,
} = restaurantApi;
