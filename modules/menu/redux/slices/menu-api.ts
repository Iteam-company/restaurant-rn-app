import { API_URL } from "@/modules/common/constants/api";
import { prepareHeadersWithAuth } from "@/modules/common/redux/utils/prepareHeadersWithAuth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MenuFormData } from "../../components/AddMenu/utils";
import { IMenu, IMenuItem, IMenuItemsSearchRequst } from "../../types";
import { MenuItemFormData } from "../../components/MenuDetails/components/AddMenuItem/utils";

export const menuApi = createApi({
  reducerPath: "menu-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: prepareHeadersWithAuth,
  }),
  tagTypes: ["MENU", "MENUITEM"],
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
    updateMenu: builder.mutation<IMenu, { body: MenuFormData; menuId: string }>(
      {
        query: ({ body, menuId }) => ({
          url: `/menu/${menuId}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (result, error, arg) => [
          { type: "MENU", id: "LIST" },
          { type: "MENU", id: arg.menuId },
        ],
      }
    ),
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
      invalidatesTags: (result) => [
        { type: "MENUITEM" as const, id: result?.id },
      ],
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
        { type: "MENU", id: arg.menuId },
      ],
    }),
    deleteMenuItem: builder.mutation<void, { menuId: string; itemId: number }>({
      query: (params) => ({
        url: `/menu/item/${params.itemId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: (result, error, args) => [
        { type: "MENUITEM", id: args.menuId },
      ],
    }),
    getMenuItem: builder.query<IMenuItem, string>({
      query: (itemId) => ({
        url: `/menu/item/${itemId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "MENUITEM", id: arg }],
    }),
    getMenuItemsBySearch: builder.query<IMenuItem[], IMenuItemsSearchRequst>({
      query: (params) => ({
        url: `/menu/item/search`,
        method: "GET",
        params,
      }),
      providesTags: (result, error, arg) => [
        { type: "MENUITEM", id: arg.menuId },
        { type: "MENU", id: "LIST" },
      ],
    }),
    updateMenuItem: builder.mutation<
      IMenuItem,
      { body: Partial<IMenuItem>; itemId: string }
    >({
      query: ({ body, itemId }) => ({
        url: `/menu/item/${itemId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { itemId }) => [
        { type: "MENUITEM", id: itemId },
        { type: "MENU", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllMenuQuery,
  useGetMenuQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useConnectMenuToRestaurantMutation,
  useDeleteMenuConnectionMutation,
  useDeleteMenuMutation,
  useCreateMenuItemMutation,
  useConnectItemToMenuMutation,
  useDeleteMenuItemMutation,
  useGetMenuItemQuery,
  useGetMenuItemsBySearchQuery,
  useUpdateMenuItemMutation,
} = menuApi;
