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
      createQuestion: builder.mutation<IQuestionInfo, ICreateQuestionDTO>({
        query: (body) => ({
          url: "/question",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: TagTypes.QUESTION, id: "LIST" }],
      }),
    }),
  });

export const { useGetQuestionsQuery, useCreateQuestionMutation } = questionApi;
