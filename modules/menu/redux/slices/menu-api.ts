import { API_URL } from "@/modules/common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MenuFormData } from "../../components/AddMenu/utils";
import { IMenu, IMenuItem } from "../../types";
import { MenuItemFormData } from "../../components/MenuDetails/components/AddMenuItem/utils";

export const menuApi = createApi({
  reducerPath: "menu-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: ["MENU"],
  endpoints: (builder) => ({
    getAllMenu: builder.query<IMenu[], string>({
      query: (restaurandId) => ({
        url: `/restaurant/${restaurandId}/menus`,
        method: "GET",
      }),
      providesTags: (result) => [
        { type: "MENU" as const, id: "LIST" },
        ...(result?.map(({ id }) => ({
          type: "MENU" as const,
          id,
        })) ?? []),
      ],
    }),
    getMenu: builder.query<IMenu, string>({
      query: (menuId) => ({
        url: `/menu/${menuId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "MENU" as const, id: arg },
      ],
    }),
    createMenu: builder.mutation<IMenu, MenuFormData>({
      query: (body) => ({
        url: "/menu",
        method: "POST",
        body,
      }),
    }),
    connectMenuToRestaurant: builder.mutation<
      void,
      { restaurantId: number | string; menuId: number }
    >({
      query: (params) => ({
        url: `/restaurant/menu/${params.restaurantId}/${params.menuId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: [{ type: "MENU", id: "LIST" }],
    }),
    deleteMenuConnection: builder.mutation<
      void,
      { restaurantId: number | string; menuId: number }
    >({
      query: (params) => ({
        url: `/restaurant/menu/${params.restaurantId}/${params.menuId}`,
        method: "DELETE",
      }),
    }),
    deleteMenu: builder.mutation<void, string | number>({
      query: (menuId) => ({
        url: `/menu/${menuId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, args) => [
        { type: "MENU", id: "LIST" },
        { type: "MENU", id: args },
      ],
    }),
    createMenuItem: builder.mutation<{ id: number }, Partial<IMenuItem>>({
      query: (body) => ({
        url: "/menu/item",
        method: "POST",
        body,
      }),
    }),
    connectItemToMenu: builder.mutation<
      void,
      { menuId: string | number; itemId: number }
    >({
      query: (params) => ({
        url: `/menu/item/${params.menuId}/${params.itemId}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MENU" as const, id: arg.menuId },
      ],
    }),
    deleteMenuItem: builder.mutation<void, { menuId: string; itemId: number }>({
      query: (params) => ({
        url: `/menu/item/${params.itemId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: (result, error, args) => [
        { type: "MENU" as const, id: args.menuId },
      ],
    }),
  }),
});

export const {
  useGetAllMenuQuery,
  useGetMenuQuery,
  useCreateMenuMutation,
  useConnectMenuToRestaurantMutation,
  useDeleteMenuConnectionMutation,
  useDeleteMenuMutation,
  useCreateMenuItemMutation,
  useConnectItemToMenuMutation,
  useDeleteMenuItemMutation,
} = menuApi;
