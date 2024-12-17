import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { userApi } from "../slices/user-api";
import { authApi } from "../slices/auth-api";
import { restaurantApi } from "../slices/create-restaurant-api";

const store = configureStore({
  reducer: {
    userApi: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      userApi.middleware,
      authApi.middleware,
      restaurantApi.middleware,
    ]),
});
const persistor = persistStore(store);

export { store, persistor };
