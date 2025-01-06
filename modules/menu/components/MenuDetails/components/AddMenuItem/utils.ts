import * as Yup from "yup";

export interface MenuItemFormData {
  name: string;
  description: string;
  ingredients: string;
  timeForCook: string;
  price: string;
}

export const initialValues: MenuItemFormData = {
  name: "",
  description: "",
  ingredients: "",
  timeForCook: "",
  price: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name must be less than 100 characters")
    .trim(),

  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be less than 500 characters")
    .trim(),

  ingredients: Yup.string()
    .required("Ingredients are required")
    .max(1000, "Ingredients list must be less than 1000 characters")
    .trim(),

  timeForCook: Yup.string()
    .required("Cooking time is required")
    .matches(
      /^(\d+\s*(min|mins|hour|hours|h|m)(\s*and\s*\d+\s*(min|mins|hour|hours|h|m))?)?$/,
      "Invalid time format. Use formats like '30 mins', '2 hours', '1 hour and 30 mins'"
    )
    .trim(),

  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price must be greater than or equal to 0")
    .nullable()
    .required("Price is required"),
});
