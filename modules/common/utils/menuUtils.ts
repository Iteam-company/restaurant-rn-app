import { StatusEnum } from "@/modules/quiz/types";

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

export const seasonIcons: Record<SeasonsEnum, string> = {
  [SeasonsEnum.WINTER]: "snowflake",
  [SeasonsEnum.SPRING]: "flower",
  [SeasonsEnum.SUMMER]: "white-balance-sunny",
  [SeasonsEnum.FALL]: "leaf",
};

export const categoryIcons: Record<CategoriesEnum, string> = {
  [CategoriesEnum.APPETIZERS]: "silverware-variant",
  [CategoriesEnum.MAIN_COURSES]: "food-variant",
  [CategoriesEnum.DESSERTS]: "cake-variant",
};

export const statusIcons: Record<StatusEnum, string> = {
  [StatusEnum.COMPLETED]: "check-circle",
  [StatusEnum.IN_PROGRESS]: "autorenew",
  [StatusEnum.NOT_STARTED]: "pause-circle",
};
