import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { TagTypes } from "@/modules/common/redux/utils/api-config";
import * as DocumentPicker from "expo-document-picker";
import { ICreateQuestionDTO, IQuestionInfo } from "../../types";

const questionApi = workerApi
  .enhanceEndpoints({ addTagTypes: [TagTypes.QUESTION] })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getQuestions: builder.query<IQuestionInfo[], string>({
        query: (quizId) => ({
          url: `/question/by-quiz/${quizId}`,
          method: "GET",
        }),
        providesTags: (result) => [
          { type: TagTypes.QUESTION, id: "LIST" },
          ...(result?.map(({ id }) => ({ type: TagTypes.QUESTION, id })) ?? []),
        ],
      }),
      getOneQuestion: builder.query<IQuestionInfo, string>({
        query: (questionId) => ({
          url: `/question/${questionId}`,
        }),
        providesTags: (result, error, id) => [
          { type: TagTypes.QUESTION, id: id },
        ],
      }),
      createQuestion: builder.mutation<IQuestionInfo, ICreateQuestionDTO>({
        query: (body) => ({
          url: "/question",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: TagTypes.QUESTION, id: "LIST" }],
      }),
      createManyQuestions: builder.mutation<
        IQuestionInfo[],
        ICreateQuestionDTO[]
      >({
        query: (body) => ({
          url: "/question/create-many",
          method: "POST",
          body,
        }),
        invalidatesTags: (result) => [
          { type: TagTypes.QUESTION, id: "LIST" },
          ...(result?.map(({ id }) => ({ type: TagTypes.QUESTION, id })) ?? []),
        ],
        // invalidatesTags: [{ type: TagTypes.QUESTION, id: "LIST" }],
      }),
      generateQuestions: builder.mutation<
        ICreateQuestionDTO[],
        {
          count: number;
          prompt?: string;
          previousQuestions?: ICreateQuestionDTO[];
          files?: DocumentPicker.DocumentPickerAsset[];
        }
      >({
        query: ({ count, prompt, previousQuestions, files }) => {
          const formData = new FormData();

          formData.append("count", count.toString());

          if (prompt) {
            formData.append("prompt", prompt);
          }

          if (previousQuestions && previousQuestions.length > 0) {
            formData.append(
              "previousQuestions",
              JSON.stringify(previousQuestions)
            );
          }

          if (files && files.length > 0) {
            files.forEach((file, index) => {
              formData.append("files", {
                uri: file.uri,
                type: file.mimeType || "application/octet-stream",
                name: file.name,
              } as any);
            });
          }

          return {
            url: `/quiz/generate/questions`,
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        },
      }),
      updateQuestion: builder.mutation<
        IQuestionInfo,
        { body: Partial<ICreateQuestionDTO>; questionId: number }
      >({
        query: ({ body, questionId }) => ({
          url: `/question/${questionId}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: TagTypes.QUESTION, id: arg.questionId },
        ],
      }),
      deleteQuestion: builder.mutation<IQuestionInfo, number>({
        query: (questionId) => ({
          url: `/question/${questionId}`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: TagTypes.QUESTION, id: "LIST" }],
      }),
    }),
  });

export const {
  useGetQuestionsQuery,
  useGetOneQuestionQuery,
  useCreateQuestionMutation,
  useCreateManyQuestionsMutation,
  useGenerateQuestionsMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
