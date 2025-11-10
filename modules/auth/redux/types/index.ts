import { AuthMethod } from "../../../../pages/SignIn/utils";

export type AuthCredentials = {
  [K in AuthMethod]?: string;
} & {
  password: string;
};
