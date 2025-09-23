import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import { UserType } from "@/modules/common/types/user.types";
import { AuthCredentials } from "../types";
import { UpdateUserInfoI } from "@/modules/common/types/restaurant.types";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signin: builder.mutation<{ access_token: string }, AuthCredentials>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<
      { access_token: string; id: number },
      Partial<UserType>
    >({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
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
