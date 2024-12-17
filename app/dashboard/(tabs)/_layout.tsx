import React, { useEffect } from "react";
import { HapticTab } from "@/modules/common/components/HapticTab";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol.ios";
import { Colors } from "@/modules/common/constants/Colors";
import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { useDispatch } from "react-redux";

export default function TabLayout() {
  const disptach = useDispatch();

  useEffect(() => {
    console.log("dfjivvfdjn");
  }, [disptach]);

  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        tabBarBackground: TabBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
