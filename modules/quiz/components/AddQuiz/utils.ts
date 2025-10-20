import * as yup from "yup";
import { DifficultyLevelEnum, StatusEnum } from "../../types";

export const initialValues = {
  title: "",
  difficultyLevel: DifficultyLevelEnum.EASY,
  timeLimit: 0,
  status: StatusEnum.NOT_STARTED,
};

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  difficultyLevel: yup
    .string()
    .required("Difficulty level is required")
    .oneOf(
      Object.values(DifficultyLevelEnum),
      "Invalid difficulty level selected"
    ),
  timeLimit: yup
    .number()
    .required("Time limit is required")
    .min(1, "Time limit must be at least 1 minute"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(Object.values(StatusEnum), "Invalid status selected"),
});

export const difficultyLevelItem = Object.entries(DifficultyLevelEnum).map(
  ([_, value]) => ({
    label: value.charAt(0).toUpperCase() + value.slice(1),
    value: value,
  })
);

export const statusItem = Object.entries(StatusEnum).map(([_, value]) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value: value,
}));
