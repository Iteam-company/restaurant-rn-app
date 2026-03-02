import { authApi } from "@/lib/redux/slices/auth-api";
import { userApi } from "@/lib/redux/slices/user-api";
import { workerApi } from "@/lib/redux/slices/worker-api";

import { store } from "@/lib/redux/store/store";

export const resetStore = () => {
  store.dispatch(workerApi.util.resetApiState());
  store.dispatch(userApi.util.resetApiState());
  store.dispatch(authApi.util.resetApiState());
};
