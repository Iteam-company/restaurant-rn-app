import React, { useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import { USER_ROLE } from "@/modules/common/constants/api";
import { UserROLES, UserType } from "@/lib/redux/types";

const UserContext = createContext<{ user?: UserType }>({});

export const UserValidationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { token } = useAuthToken();

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useValidateTokenQuery({ token: token! }, { skip: !token });

  useEffect(() => {
    if (!isLoading && user) {
      SecureStore.setItem(USER_ROLE, user.role);

      switch (user.role) {
        case UserROLES.WAITER:
          router.replace({
            pathname: "/user-dashboard/[id]/(quiz)",
            params: { id: user.restaurantId },
          });
          break;
        case UserROLES.ADMIN:
        case UserROLES.OWNER:
          router.replace("/admin-dashboard");
          break;
      }
    } else if (!isLoading && !isSuccess && !user) {
      router.replace("/auth/signin");
    }
  }, [isLoading, isSuccess, user, token, router]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// optional hook to access the user
export const useUser = () => useContext(UserContext);
