import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type RTKMutationPayloadType = {
  error: FetchBaseQueryError;
  isLoading: boolean;
};

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}
export type ErrorResponseType = FetchBaseQueryError & { data?: ErrorResponse };
