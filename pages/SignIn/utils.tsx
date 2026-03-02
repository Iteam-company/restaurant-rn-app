import * as Yup from "yup";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^[0-9]{10,14}$/;

// Single schema that validates identifier as email OR phone number
export const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required("Identifier is required")
    .test(
      "email-or-phone",
      "Must be a valid email or phone number",
      (value) => {
        if (!value) return false;

        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const initialValues =
  process.env.EXPO_PUBLIC_APP_ENV === "development"
    ? {
        identifier: "john.doe@example.com",
        password: "SecureP@ssw0rd",
      }
    : { identifier: "", password: "" };
