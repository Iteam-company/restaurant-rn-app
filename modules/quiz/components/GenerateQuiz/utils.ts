import * as yup from "yup";
import { DifficultyLevelEnum, StatusEnum } from "../../types";
import * as DocumentPicker from "expo-document-picker";
import { ICreateQuestionDTO } from "@/modules/questions/types";

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

export const QuizSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),

  difficultyLevel: yup
    .mixed<DifficultyLevelEnum>()
    .oneOf(Object.values(DifficultyLevelEnum), "Invalid difficulty level")
    .required("Difficulty level is required"),

  status: yup
    .mixed<StatusEnum>()
    .oneOf(Object.values(StatusEnum), "Invalid status")
    .required("Status is required"),

  timeLimit: yup
    .number()
    .required("Time limit is required")
    .min(1, "Time limit must be at least 1 minute"),

  questions: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Question text is required"),
        variants: yup
          .array()
          .of(yup.string())
          .min(2, "Each question must have at least two options"),
        correct: yup
          .array()
          .of(yup.number())
          .min(1, "Each question must have at least one correct option"),
      })
    )
    .min(1, "At least one question is required"),
});

export interface QuizInitialValuesType {
  title: string;
  difficultyLevel: DifficultyLevelEnum;
  timeLimit: number;
  status: StatusEnum;
  questions: ICreateQuestionDTO[];
  restaurantId?: number;
}

export const GenerateQuizSchema = yup.object().shape({
  files: yup
    .array()
    .of(
      yup.object().shape({
        uri: yup.string().required("File URI is required"),
        name: yup.string().required("File name is required"),
        mimeType: yup.string().nullable(),
        size: yup.number().nullable(),
      })
    )
    .min(1, "At least one file is required")
    .required("Files are required"),

  prompt: yup
    .string()
    .optional()
    .min(5, "Prompt must be at least 5 characters long"),
  count: yup.number().optional().moreThan(0, "Count must be at least 1!"),
});

export type GenerateQuizInitialValuesType = {
  files: DocumentPicker.DocumentPickerAsset[];
  prompt: string | undefined;
  count: number | undefined;
};

export const GenerateQuizInitialValues: GenerateQuizInitialValuesType = {
  files: [],
  prompt: undefined,
  count: undefined,
};
