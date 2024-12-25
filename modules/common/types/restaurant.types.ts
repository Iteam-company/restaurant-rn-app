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
  menu: null; //to-do: change type
  workers: any;
  address: string;
  ownerId: number;
  image: null; //to-do: change type
  owner: UserInfo;
}
