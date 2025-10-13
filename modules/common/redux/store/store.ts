import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { authApi } from "@/modules/auth/redux/slices/auth-api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { workerApi } from "../slices/worker-api";

const store = configureStore({
  reducer: {
    [workerApi.reducerPath]: workerApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([authApi.middleware, workerApi.middleware]),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { persistor, store };
