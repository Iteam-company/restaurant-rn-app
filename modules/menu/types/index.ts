export enum SeasonsEnum {
  SPRING = "spring",
  SUMMER = "summer",
  FALL = "fall",
  WINTER = "winter",
}

export enum CategoriesEnum {
  APPETIZERS = "appetizers",
  MAIN_COURSES = "main courses",
  DESSERTS = "desserts",
}

export interface IMenu {
  id: number;
  name: string;
  season: SeasonsEnum;
  categories: CategoriesEnum;
  menuItems: IMenuItem[];
}

export interface IMenuItemsSearchRequst {
  limit?: string | number;
  page?: string | number;
  search?: string | number;
  menuId: string | number;
}

export interface IMenuItem {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  timeForCook: string;
  price: number;
  weight: number;
}
