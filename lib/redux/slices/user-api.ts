import { SearchUser, TagTypes, UpdateUserInfoI, UserInfo } from "../types";
import { workerApi } from "./worker-api";

export const userApi = workerApi
  .enhanceEndpoints({
    addTagTypes: [TagTypes.USER],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: () => ({
          url: "/user",
          method: "GET",
        }),
        providesTags: [{ type: TagTypes.USER, id: "LIST" }],
      }),

      createUser: builder.mutation({
        query: (body) => ({
          url: "/user",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: TagTypes.USER, id: "LIST" }],
      }),

      getUserById: builder.query<UserInfo, string>({
        query: (id) => ({
          url: `/user/one/${id}`,
          method: "GET",
        }),
        providesTags: (result, error, id) => [
          { type: TagTypes.USER, id },
          { type: TagTypes.USER, id: "LIST" },
        ],
      }),
      getCurrentUser: builder.query<UserInfo, void>({
        query: () => ({
          url: "/user",
          method: "GET",
        }),
      }),

      searchUsers: builder.query<UserInfo[], Partial<SearchUser>>({
        query: (searchParams) => ({
          url: "/user/search",
          method: "GET",
          params: {
            limit: searchParams.limit ?? 10,
            page: searchParams.page ?? 1,
            search: searchParams.search ?? "",
            restaurantId: searchParams.restaurantId,
          },
        }),
        providesTags: (result, error, searchParams) => {
          const tags = [
            { type: TagTypes.USER, id: "LIST" },
            ...(result?.map(({ id }) => ({
              type: TagTypes.USER,
              id,
            })) ?? []),
          ];

          if (searchParams?.restaurantId) {
            tags.push({
              type: TagTypes.USER,
              id: `restaurant-${searchParams.restaurantId}`,
            });
          }

          return tags;
        },
      }),

      updateUserInfo: builder.mutation<void, UpdateUserInfoI>({
        query: (request) => ({
          url: `/user/${request.params.userId}/admin`,
          method: "PATCH",
          body: request.body,
        }),
        invalidatesTags: (result, error, { params }) => [
          { type: TagTypes.USER, id: params.userId },
          { type: TagTypes.USER, id: "LIST" },
        ],
      }),
      updateCurrentUserInfo: builder.mutation<void, UpdateUserInfoI>({
        query: (request) => ({
          url: `/user/`,
          method: "PATCH",
          body: request.body,
        }),
        invalidatesTags: (result, error, { params }) => [
          { type: TagTypes.USER, id: params.userId },
          { type: TagTypes.USER, id: "LIST" },
        ],
      }),

      updateUserPhoto: builder.mutation<
        void,
        { formData: FormData; workerId: string }
      >({
        query: ({ formData, workerId }) => ({
          url: `/user/icon/${workerId}/admin`,
          method: "PATCH",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        invalidatesTags: (result, error, { workerId }) => [
          { type: TagTypes.USER, id: workerId },
          { type: TagTypes.USER, id: "LIST" },
        ],
      }),
      uploadCurrentUserPhoto: builder.mutation<
        void,
        { formData: FormData; workerId: string }
      >({
        query: ({ formData }) => ({
          url: `/user/icon/`,
          method: "PATCH",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        invalidatesTags: (result, error, { workerId }) => [
          { type: TagTypes.USER, id: workerId },
          { type: TagTypes.USER, id: "LIST" },
        ],
      }),
      removeCurrentUser: builder.mutation<UserInfo, void>({
        query: () => ({
          url: "user/",
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useSearchUsersQuery,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useUpdateUserInfoMutation,
  useUpdateCurrentUserInfoMutation,
  useUpdateUserPhotoMutation,
  useUploadCurrentUserPhotoMutation,
  useRemoveCurrentUserMutation,
} = userApi;
