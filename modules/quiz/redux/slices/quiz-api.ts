import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { IQuizInfo } from "../../types";
import { TagTypes } from "@/modules/common/redux/utils/api-config";

export const quizApi = workerApi
  .enhanceEndpoints({ addTagTypes: [TagTypes.QUIZ] })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getQuizes: builder.query<IQuizInfo[], void>({
        query: () => ({
          url: "/quiz",
          method: "GET",
        }),
        providesTags: (result: any, error: any, id: any) => [
          { type: TagTypes.QUIZ, id: "LIST" },
          ...(result?.map(({ id }: IQuizInfo) => ({
            type: TagTypes.QUIZ,
            id,
          })) ?? []),
        ],
      }),
      getQuiz: builder.query<IQuizInfo, string>({
        query: (id: string) => ({
          url: `/quiz/${id}`,
          method: "GET",
        }),
        providesTags: (result: any, error: any, id: any) => [
          { type: TagTypes.QUIZ, id: "LIST" },
        ],
      }),
    }),
  });

export const { useGetQuizQuery, useGetQuizesQuery } = quizApi;
