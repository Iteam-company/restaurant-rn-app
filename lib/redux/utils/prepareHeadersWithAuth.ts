import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "../../../modules/common/constants/api";

export const prepareHeadersWithAuth = async (headers: Headers) => {
  const bearer = SecureStore.getItem(AUTH_TOKEN_KEY);

  if (bearer) {
    headers.set("Authorization", `Bearer ${bearer}`);
  }

  return headers;
};
