import React from "react";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router, Stack, Tabs } from "expo-router";
import { Platform } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";

export default function RestaurantLayout() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Appbar.Header
        style={{
          backgroundColor: colors.background,
          height: 0,
        }}
      >
        <></>
      </Appbar.Header>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveBackgroundColor: colors.background,
          tabBarActiveBackgroundColor: colors.background,
          headerShown: false,
          tabBarBackground: TabBackground,
          tabBarStyle: Platform.select({
            ios: {
              backgroundColor: colors.background,
              position: "absolute",
            },
            default: {},
          }),
          sceneStyle: { backgroundColor: colors.background },
        }}
      >
        <Tabs.Screen
          name="(menu)/index"
          options={{
            title: "Menu",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant-menu" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(quiz)/index"
          options={{
            title: "Quiz",
            tabBarIcon: ({ color }) => (
              <AntDesign name="question" size={34} color={color} />
            ),
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
    </>
  );
}
