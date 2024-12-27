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
  image: null; //to-do: change type
  owner: UserInfo;
}

export interface DeleteWorker {
  userId: number;
  restaurantId: number;
}
