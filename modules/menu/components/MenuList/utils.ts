import { StatusEnum } from "@/modules/quiz/types";
import { CategoriesEnum, SeasonsEnum } from "../../types";

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
