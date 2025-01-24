import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { IQuizInfo, IQuizResultDto, IQuizResultInfo } from "../../types";
import { TagTypes } from "@/modules/common/redux/utils/api-config";

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
      createQuiz: builder.mutation<IQuizInfo, Partial<IQuizInfo>>({
        query: (body) => ({
          url: "/quiz",
          method: "POST",
          body,
        }),
        invalidatesTags: (result: any, error: any, body) => [
          { type: TagTypes.QUIZ, id: body.id },
        ],
      }),
      connectQuizToMenu: builder.mutation<
        void,
        { quizId: string; menuId: string }
      >({
        query: ({ quizId, menuId }) => ({
          url: `/quiz/${menuId}/${quizId}`,
          method: "PATCH",
        }),
      }),
      updateQuiz: builder.mutation<
        IQuizInfo,
        Partial<IQuizInfo & { menuId: undefined }>
      >({
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
        invalidatesTags: () => [{ type: TagTypes.QUIZ, id: "LIST" }],
      }),
      getQuizResult: builder.query<IQuizResultInfo, string>({
        query: (id) => ({
          url: `/quiz-results/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, id) => [
          { type: TagTypes.QUIZ_RESULT, id: id },
        ],
      }),
    }),
  });

export const {
  useGetQuizQuery,
  useGetQuizByRestaurantQuery,
  useGetQuizesQuery,
  useCreateQuizMutation,
  useConnectQuizToMenuMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useCreateQuizResultMutation,
  useGetQuizResultQuery,
} = quizApi;
