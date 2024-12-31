import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import { UserType } from "@/modules/common/types/user.types";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "getUserIdByToken") {
        return headers;
      }
      return prepareHeadersWithAuth(headers);
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<{ access_token: string }, any>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    validateToken: builder.query<UserType, void>({
      query: () => "/auth/me",
    }),
    getUserIdByToken: builder.mutation<UserType, string>({
      query: (token) => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useValidateTokenQuery,
  useGetUserIdByTokenMutation,
} = authApi;
