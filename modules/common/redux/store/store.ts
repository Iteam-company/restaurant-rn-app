import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { userApi } from '../slices/user-api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '@/modules/auth/redux/slices/auth-api';
import { restaurantApi } from '@/modules/restaurant/redux/slices/restaurant-api';

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

setupListeners(store.dispatch);
const persistor = persistStore(store);

export { store, persistor };
