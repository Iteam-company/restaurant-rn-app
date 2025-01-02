import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../constants/api";
import { prepareHeadersWithAuth } from "../utils/prepareHeadersWithAuth";

export const workerApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  endpoints: () => ({}),
});
