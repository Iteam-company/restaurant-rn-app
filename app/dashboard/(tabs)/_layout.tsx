import React from "react";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { Colors } from "@/modules/common/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const { colors } = useTheme();
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
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="restaurants"
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
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
