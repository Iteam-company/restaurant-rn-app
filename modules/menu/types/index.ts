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

export interface IMenuItem {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  timeForCook: string;
  price: number;
  weight: number;
}
