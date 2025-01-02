import { API_URL } from "@/modules/common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MenuFormData } from "../../components/AddMenu/utils";
import { IMenu } from "../../types";

const MENU = "MENU";

export const menuApi = createApi({
  reducerPath: "menu-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: [MENU],
  endpoints: (builder) => ({
    getMenu: builder.query<any, void>({
      query: () => ({
        url: "/menu",
        method: "GET",
      }),
      providesTags: [{ type: MENU, id: "LIST" }],
    }),
    createMenu: builder.mutation<IMenu, MenuFormData>({
      query: (body) => ({
        url: "/menu",
        method: "POST",
        body,
      }),
    }),
    connectMenuToRestaurant: builder.mutation<
      any,
      { restaurantId: number | string; menuId: number }
    >({
      query: (params) => ({
        url: `/restaurant/menu/${params.restaurantId}/${params.menuId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: [{ type: MENU, id: "LIST" }],
    }),
  }),
});

export const {
  useGetMenuQuery,
  useCreateMenuMutation,
  useConnectMenuToRestaurantMutation,
} = menuApi;
