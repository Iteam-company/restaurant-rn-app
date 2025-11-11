import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import { UserROLES } from "@/lib/redux/types";
import { USER_ROLE } from "@/modules/common/constants/api";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import { Slot, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function AuthTabsLayout() {
  const router = useRouter();
  const { token } = useAuthToken();

  const { data: user } = useValidateTokenQuery(
    { token: token! },
    { skip: !token }
  );

  useEffect(() => {
    if (token) {
      switch (user?.role) {
        case UserROLES.WAITER:
          router.push({
            pathname: "/user-dashboard/[id]/(quiz)",
            params: { id: user.restaurantId },
          });
          break;
        case UserROLES.ADMIN:
        case UserROLES.OWNER:
          router.push({
            pathname: "/admin-dashboard",
          });
          break;
      }
    }

    if (user) SecureStore.setItem(USER_ROLE, user.role);
  }, [user, user?.role, user?.restaurantId, router, token]);

  return <Slot />;
}
