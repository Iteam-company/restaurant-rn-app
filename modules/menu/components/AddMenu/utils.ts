import * as yup from "yup";
import { CategoriesEnum, SeasonsEnum } from "../../types";

export interface MenuFormData {
  name: string;
  season: SeasonsEnum;
  categories: CategoriesEnum;
}

export const seasonItem = Object.entries(SeasonsEnum).map(([_, value]) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value: value,
}));

export const categoryItems = Object.values(CategoriesEnum).map((value) => ({
  label: value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "),
  value: value,
}));

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  season: yup
    .string()
    .required("Season is required")
    .oneOf(Object.values(SeasonsEnum), "Invalid season selected"),

  categories: yup
    .string()
    .required("Category is required")
    .oneOf(Object.values(CategoriesEnum), "Invalid category selected"),
});

export const initialValues: MenuFormData = {
  name: "",
  season: Object.values(SeasonsEnum)[0],
  categories: Object.values(CategoriesEnum)[0],
};
