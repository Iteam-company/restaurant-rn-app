import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../store/reauth-store";

export const workerApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
