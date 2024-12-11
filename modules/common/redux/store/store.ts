import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { userApi } from '../slices/user-api';
import { authApi } from '../slices/auth-api';

const store = configureStore({
  reducer: {
    userApi: userApi.reducer,
    authApi: authApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([userApi.middleware, authApi.middleware]),
});
const persistor = persistStore(store);

export { store, persistor };
