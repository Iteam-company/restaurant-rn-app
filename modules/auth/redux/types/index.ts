import { AuthMethod } from "../../components/SignInForm/utils";

export type AuthCredentials = {
  [K in AuthMethod]?: string;
} & {
  password: string;
};
