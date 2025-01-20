import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { TagTypes } from "@/modules/common/redux/utils/api-config";
import { IQuestionInfo } from "../../types";

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
    }),
  });

export const { useGetQuestionsQuery } = questionApi;
