import { createApi } from "@reduxjs/toolkit/query/react";
import { UserType } from "@/modules/common/types/user.types";
import { AuthCredentials } from "../types";
import { UpdateUserInfoI } from "@/modules/common/types/restaurant.types";
import { baseQueryWithReauth } from "@/modules/common/redux/store/reauth-store";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signin: builder.mutation<
      { access_token: string; refresh_token?: string },
      AuthCredentials
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    signup: builder.mutation<
      { access_token: string; refresh_token?: string; id: number },
      Partial<UserType>
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    validateToken: builder.query<UserType, void | { token: string }>({
      query: (props) => ({
        url: "/auth/me",
        headers: props?.token
          ? {
              Authorization: `Bearer ${props.token}`,
            }
          : undefined,
      }),
      providesTags: ["Auth"],
    }),
    updateCurrentUserInfo: builder.mutation<void, UpdateUserInfoI>({
      query: (request) => ({
        url: `/user/`,
        method: "PATCH",
        body: request.body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useValidateTokenQuery } =
  authApi;
