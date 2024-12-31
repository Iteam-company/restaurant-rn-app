import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/api";
import { prepareHeadersWithAuth } from "../utils/prepareHeadersWithAuth";
import { SearchUser, UserInfo } from "../../types/user.types";
import { UpdateUserInfoI } from "../../types/restaurant.types";
import { createSharedTagTypes } from "../utils/api-config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: createSharedTagTypes(),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),
    getUserById: builder.query<UserInfo, string>({
      query: (id) => ({
        url: `/one/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
    searchUsers: builder.query<UserInfo[], Partial<SearchUser>>({
      query: (searchParams) => ({
        url: "/search",
        method: "GET",
        params: {
          limit: searchParams.limit ?? 10,
          page: searchParams.page ?? 1,
          search: searchParams.search ?? "",
          restaurantId: searchParams.restaurantId,
        },
      }),
      providesTags: (result, error, searchParams) =>
        [
          { type: "User" as const, id: "SEARCH_RESULTS" },
          { type: "User" as const, id: "LIST" },
          ...(result?.map(({ id }) => ({ type: "User" as const, id })) ?? []),
          searchParams?.restaurantId
            ? {
                type: "User" as const,
                id: `restaurant-${searchParams.restaurantId}`,
              }
            : null,
        ].filter(Boolean),
    }),
    updateUserInfo: builder.mutation<void, UpdateUserInfoI>({
      query: (request) => ({
        url: `/${request.params.userId}/admin`,
        method: "Patch",
        body: request.body,
      }),
      invalidatesTags: (result, error, { params }) => [
        { type: "User", id: params.userId },
        { type: "User", id: "LIST" },
      ],
    }),
    updateUserPhoto: builder.mutation<
      void,
      { formData: FormData; workerId: string }
    >({
      query: ({ formData, workerId }) => {
        console.log(formData);
        return {
          url: `/icon/${workerId}/admin`,
          method: "PATCH",
          body: formData,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: (result, error, { workerId }) => [
        { type: "User", id: workerId },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useSearchUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
} = userApi;
