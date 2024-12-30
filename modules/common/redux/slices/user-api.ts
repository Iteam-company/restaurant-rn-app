import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/api";
import { prepareHeadersWithAuth } from "../utils/prepareHeadersWithAuth";
import { SearchUser, UserInfo } from "../../types/user.types";
import { UpdateUserInfoI } from "../../types/restaurant.types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: ["User"],
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
      providesTags: (res) =>
        res
          ? [
              ...res.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
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
    updateUserPhoto: builder.mutation<void, any>({
      query: ({ file, workerId }) => {
        const formData = new FormData();
        formData.append("file", file);

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
