import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { TagTypes } from "@/modules/common/redux/utils/api-config";
import { ICreateQuestionDTO } from "@/modules/questions/types";
import {
  ICreateQuizDTO,
  IQuizInfo,
  IQuizResultDto,
  IQuizResultInfo,
} from "../../types";

export const quizApi = workerApi
  .enhanceEndpoints({ addTagTypes: [TagTypes.QUIZ, TagTypes.QUIZ_RESULT] })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getQuizes: builder.query<IQuizInfo[], void>({
        query: () => ({
          url: "/quiz",
          method: "GET",
        }),
        providesTags: (result: any) => [
          { type: TagTypes.QUIZ, id: "LIST" },
          ...(result?.map(({ id }: IQuizInfo) => ({
            type: TagTypes.QUIZ,
            id,
          })) ?? []),
        ],
      }),
      getQuizByRestaurant: builder.query<IQuizInfo[], string>({
        query: (restaurantId: string) => ({
          url: `/quiz/for-restaurant/${restaurantId}`,
          method: "GET",
        }),
        providesTags: (result: any, error: any, restaurantId: any) => [
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
          { type: TagTypes.QUIZ, id: id },
        ],
      }),
      createQuiz: builder.mutation<IQuizInfo, Partial<ICreateQuizDTO>>({
        query: (body) => ({
          url: "/quiz",
          method: "POST",
          body,
        }),
        invalidatesTags: (result: any) => [
          { type: TagTypes.QUIZ, id: result.id },
        ],
      }),
      updateQuiz: builder.mutation<IQuizInfo, Partial<IQuizInfo>>({
        query: (body) => ({
          url: `/quiz/${body.id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result: any, error: any, body: any) => [
          { type: TagTypes.QUIZ, id: body.id },
        ],
      }),
      deleteQuiz: builder.mutation<void, string>({
        query: (id: string) => ({
          url: `/quiz/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result: any, error: any, id: any) => [
          { type: TagTypes.QUIZ, id: "LIST" },
          { type: TagTypes.QUIZ, id: id },
        ],
      }),

      createQuizResult: builder.mutation<IQuizResultInfo, IQuizResultDto>({
        query: (body) => ({
          url: "/quiz-results",
          method: "POST",
          body,
        }),
        invalidatesTags: (result) => [
          { type: TagTypes.QUIZ_RESULT, id: "LIST" },
          { type: TagTypes.QUIZ_RESULT, id: result?.id },
        ],
      }),
      getQuizResult: builder.query<IQuizResultInfo, string>({
        query: (id) => ({
          url: `/quiz-results/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, id) => [
          { type: TagTypes.QUIZ_RESULT, id: "LIST" },
          { type: TagTypes.QUIZ_RESULT, id: id },
        ],
      }),
      getQuizResultList: builder.query<IQuizResultInfo[], number>({
        query: (restaurantId) => ({
          url: `/quiz-results/get-by-restaurant/${restaurantId}`,
          method: "GET",
        }),
        providesTags: (result, error) => {
          return [
            { type: TagTypes.QUIZ_RESULT, id: "LIST" },
            ...(result?.map(({ id }) => ({
              type: TagTypes.QUIZ_RESULT,
              id,
            })) ?? []),
          ];
        },
      }),
      searchQuizResult: builder.query<IQuizResultInfo[], string>({
        query: (query) => ({
          url: "/quiz-results/search/",
          params: { search: query, limit: 0 },
          method: "GET",
        }),
        providesTags: (result, error) => {
          return [
            { type: TagTypes.QUIZ_RESULT, id: "LIST" },
            ...(result?.map(({ id }) => ({
              type: TagTypes.QUIZ_RESULT,
              id,
            })) ?? []),
          ];
        },
      }),
      deleteQuizResult: builder.mutation<IQuizResultInfo, number>({
        query: (id) => ({
          url: `/quiz-results/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, id) => [
          { type: TagTypes.QUIZ_RESULT, id: "LIST" },
          { type: TagTypes.QUIZ_RESULT, id },
        ],
      }),
      generateQuizzes: builder.mutation<
        IQuizInfo & { questions?: ICreateQuestionDTO[] },
        {
          count?: number;
          prompt?: string;
          files?: any[];
        }
      >({
        query: ({ count, prompt, files }) => {
          const formData = new FormData();

          if (count) {
            formData.append("count", count.toString());
          }

          if (prompt) {
            formData.append("prompt", prompt);
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
            url: "/quiz/generate/quiz",
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        },
        invalidatesTags: [{ type: TagTypes.QUIZ, id: "LIST" }],
      }),
    }),
  });

export const {
  useGetQuizQuery,
  useGetQuizByRestaurantQuery,
  useGetQuizesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useCreateQuizResultMutation,
  useGetQuizResultQuery,
  useGetQuizResultListQuery,
  useSearchQuizResultQuery,
  useDeleteQuizResultMutation,
  useGenerateQuizzesMutation,
} = quizApi;
