import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";
import { UserROLES } from "@/modules/common/types/user.types";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";

export default function AuthTabsLayout() {
  const { colors } = useTheme();
  const router = useRouter();
  const { token } = useAuthToken();

  const { data: user, refetch } = useValidateTokenQuery(
    { token: token! },
    { skip: !token }
  );

  useEffect(() => {
    if (token) {
      switch (user?.role) {
        case UserROLES.WAITER:
          router.push({
            pathname: "/user-dashboard/[id]/(menu)",
            params: { id: user.restaurantId },
          });
          break;
        case UserROLES.ADMIN:
        case UserROLES.OWNER:
          router.push({
            pathname: "/dashboard/restaurants",
          });
          break;
      }
    }

    if (user) SecureStore.setItem(USER_ROLE, user.role);
  }, [user, router, token, refetch]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveBackgroundColor: colors.background,
        tabBarBackground: TabBackground,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colors.background,
            position: "absolute",
          },
          default: {},
        }),
      }}
      safeAreaInsets={{ bottom: 0, top: 0 }}
    >
      <Tabs.Screen
        name="signup"
        options={{
          title: "Sign up",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
