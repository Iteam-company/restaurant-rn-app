import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { router, Stack, Tabs, useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useGetRestaurantQuery } from "@/modules/restaurant/redux/slices/restaurant-api";

export default function RestaurantPageLayout() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useGetRestaurantQuery(id);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Appbar.Header>
        <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
        <Appbar.Content
          title={`${data?.name}`}
          titleStyle={{ color: "white" }}
        />
      </Appbar.Header>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarBackground: TabBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
          sceneStyle: { backgroundColor: colors.background },
        }}
      >
        <Tabs.Screen
          name="(workers)"
          options={{
            title: "Workers",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={25}
                name="person.2.fill"
                weight="medium"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="quiz"
          options={{
            title: "Quiz",
            tabBarIcon: ({ color }) => (
              <AntDesign name="question" size={34} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant-menu" size={25} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({});
