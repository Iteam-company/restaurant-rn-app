import React from "react";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { Tabs, useSegments } from "expo-router";
import { Platform } from "react-native";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const { colors } = useTheme();

  const segments = useSegments() as string[];
  const isRestaurantDetail = segments.includes("[id]");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveBackgroundColor: colors.background,
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: TabBackground,
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: colors.background,
            position: "absolute",
            display: isRestaurantDetail ? "none" : "flex",
          },
          default: {
            display: isRestaurantDetail ? "none" : "flex",
          },
        }),
      }}
      safeAreaInsets={{ bottom: 0, top: 0 }}
    >
      <Tabs.Screen
        name="restaurants/index"
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="restaurants/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: "User",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
