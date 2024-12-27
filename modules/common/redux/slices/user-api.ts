import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/api";
import { prepareHeadersWithAuth } from "../utils/prepareHeadersWithAuth";
import { SearchUser, UserInfo } from "../../types/user.types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
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
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useSearchUsersQuery,
  useGetUserByIdQuery,
} = userApi;
