import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { TagTypes } from "@/modules/common/redux/utils/api-config";
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
      updateQuestion: builder.mutation<
        IQuestionInfo,
        { body: Partial<ICreateQuestionDTO>; questionId: number }
      >({
        query: ({ body, questionId }) => ({
          url: `/question/${questionId}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: [{ type: TagTypes.QUESTION, id: "LIST" }],
      }),
    }),
  });

export const {
  useGetQuestionsQuery,
  useGetOneQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} = questionApi;
