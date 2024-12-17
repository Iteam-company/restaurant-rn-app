import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { authApi } from "@/modules/common/redux/slices/auth-api";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "react-native-paper";

export default function AuthTabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarBackground: TabBackground,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
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
