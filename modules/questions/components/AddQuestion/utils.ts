import { IQuizInfo } from "@/modules/quiz/types";
import * as yup from "yup";

export const initialValues = {
  text: "",
  variants: [""],
  correct: [],
  quizId: 0,
};

export const validationSchema = yup.object().shape({
  text: yup
    .string()
    .required("Question is required")
    .min(2, "Question must be at least 2 characters")
    .max(500, "Question must be less than 500 characters"),
  variants: yup
    .array()
    .of(yup.string().required("Variant is required"))
    .min(2, "At least 2 variants are required"),
  correct: yup
    .array()
    .of(yup.number())
    .min(1, "At least 1 correct answer is required"),
  quizId: yup.number().required("Quiz is required").min(1, "Quiz is required"),
});
