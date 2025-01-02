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
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: TabBackground,
        tabBarStyle: Platform.select({
          ios: {
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
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
