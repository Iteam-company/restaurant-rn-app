export type UserType = {
  id: number;
  username: "";
  firstName: "";
  lastName: "";
  email: "";
  phoneNumber: "";
  password: "";
  role: UserROLES;
  icon: "";
  restaurantId: number;
};

export enum UserROLES {
  OWNER = "owner",
  WAITER = "waiter",
  ADMIN = "admin",
}

export const UserRolesArray: string[] = Object.values(UserROLES).filter(
  (value) => typeof value === "string"
) as string[];

export interface UserInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserROLES;
  icon: string;
}
export type SearchUser = Record<
  "limit" | "page" | "search" | "restaurantId",
  string
>;
