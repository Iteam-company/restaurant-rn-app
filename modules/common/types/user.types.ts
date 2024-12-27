export type UserType = {
  id: number;
  username: "";
  firstName: "";
  lastName: "";
  email: "";
  phoneNumber: "";
  password: "";
  role: UserROLES;
};

export enum UserROLES {
  OWNER = "owner",
  WAITER = "waiter",
  ADMIN = "admin",
}

export interface UserInfo {
  id: number;
  username: "";
  firstName: "";
  lastName: "";
  email: "";
  phoneNumber: "";
  role: UserROLES;
  icon: null; //to-do change type
}

// export interface SearchUser {
//   limit: number;
//   page: number;
//   search: string;
//   restaurantId: string;
// }

export type SearchUser = Record<"limit" | "page" | "search" | "restaurantId", string>