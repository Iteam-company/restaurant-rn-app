import { UserROLES, UserType } from "@/lib/redux/types";
import * as Yup from "yup";

export const createUserInitialValues: Partial<UserType> = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: UserROLES.WAITER,
};

export const createUserValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(Object.values(UserROLES), "Invalid role")
    .required("Role is required"),
});
