import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@/modules/auth/redux/slices/auth-api";
import { workerApi } from "../slices/worker-api";
import { menuApi } from "@/modules/menu/redux/slices/menu-api";

const store = configureStore({
  reducer: {
    [workerApi.reducerPath]: workerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, workerApi.middleware, menuApi.middleware]),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };
