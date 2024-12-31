import { UserInfo, UserType } from "./user.types";

export interface CreateRestaurantRequest {
  restaurantName: string;
  address: string;
  ownerId: number;
}

export interface CreateRestaurantResponse {
  id: string;
  name: string;
  address: string;
}

export interface RestaurantInfo {
  id: number;
  name: string;
  menu: null;
  workers: UserInfo[];
  address: string;
  ownerId: number;
  image: string;
  owner: UserInfo;
}

export interface UpdateUserInfoI {
  params: {
    userId: string;
    restaurantId: string;
  };
  body: Partial<UserInfo>;
}

export type DeleteWorker = Record<"userId" | "restaurantId", string | number>;
