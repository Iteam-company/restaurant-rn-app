import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { secureStorage } from "@/modules/common/utils/secureStorage";
import { API_URL } from "@/modules/common/constants/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = secureStorage.getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    result.meta?.response?.url !== `${API_URL}/auth/refresh`
  ) {
    const refreshToken = secureStorage.getRefreshToken();

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const newToken = (refreshResult.data as any).access_token;
        await secureStorage.setAccessToken(newToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        await secureStorage.clearTokens();
      }
    } else {
      await secureStorage.clearTokens();
    }
  }

  return result;
};
