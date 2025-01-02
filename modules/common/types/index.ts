import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export type RTKMutationPayloadType = {
  error: FetchBaseQueryError;
  isLoading: boolean;
};
