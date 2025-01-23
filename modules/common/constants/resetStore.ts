import { workerApi } from "@/modules/common/redux/slices/worker-api";
import { userApi } from "@/modules/common/redux/slices/user-api";
import { authApi } from "@/modules/auth/redux/slices/auth-api";
import { menuApi } from "@/modules/menu/redux/slices/menu-api";
import { store } from "@/modules/common/redux/store/store";

export const resetStore = () => {
  store.dispatch(workerApi.util.resetApiState());
  store.dispatch(userApi.util.resetApiState());
  store.dispatch(authApi.util.resetApiState());
  store.dispatch(menuApi.util.resetApiState());
};
