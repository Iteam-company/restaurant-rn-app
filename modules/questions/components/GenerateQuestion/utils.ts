import * as yup from "yup";
import { ICreateQuestionDTO } from "../../types";

export interface GenerateQuestionFormData {
  count: number;
  prompt?: string;
  files: any[];
  previousQuestions?: ICreateQuestionDTO[];
}

export const generateQuestionValidationSchema = yup.object().shape({
  count: yup
    .number()
    .required("Question count is required")
    .min(1, "Count must be at least 1")
    .max(50, "Count cannot exceed 50"),
  prompt: yup
    .string()
    .optional()
    .max(500, "Prompt cannot exceed 500 characters"),
  files: yup
    .array()
    .required("At least one file is required")
    .min(1, "At least one file must be selected")
    .test(
      "file-types",
      "Only PDF, DOC, DOCX, and image files are allowed",
      (files) => {
        if (!files || files.length === 0) return false;

        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
          "image/webp",
        ];

        return files.every(
          (file: any) =>
            allowedTypes.includes(file.mimeType) ||
            allowedTypes.some((type) =>
              file.mimeType?.startsWith(type.split("/")[0])
            )
        );
      }
    )
    .test("file-size", "File size cannot exceed 10MB", (files) => {
      if (!files || files.length === 0) return false;
      const maxSize = 10 * 1024 * 1024; // 10MB
      return files.every((file: any) => (file.size || 0) <= maxSize);
    }),
  previousQuestions: yup
    .array()
    .optional()
    .of(
      yup.object().shape({
        text: yup.string().required(),
        correctAnswer: yup.string().required(),
        wrongAnswers: yup.array().of(yup.string()).required(),
        quizId: yup.number().required(),
      })
    ),
});

export const initialFormData: GenerateQuestionFormData = {
  count: 5,
  prompt: "",
  files: [],
  previousQuestions: [],
};
