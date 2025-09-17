import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import {
  router,
  Stack,
  Tabs,
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useGetRestaurantQuery } from "@/modules/restaurant/redux/slices/restaurant-api";

export default function RestaurantPageLayout() {
  const { colors } = useTheme();
  const { id } = useGlobalSearchParams<{
    id: string;
    workerId: string;
  }>();

  const { data: restaurantData, isLoading } = useGetRestaurantQuery(id);
  const pathname = usePathname();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Appbar.Header
        statusBarHeight={0}
        style={{ backgroundColor: colors.background }}
      >
        <Appbar.BackAction
          iconColor="white"
          onPress={() =>
            /^\/restaurant\/\d+$/.test(pathname)
              ? router.push({
                  pathname: "/dashboard/(tabs)/restaurants",
                })
              : router.back()
          }
        />
        <Appbar.Content
          title={restaurantData?.name ? restaurantData?.name : ""}
          titleStyle={{ color: "white" }}
        />
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
        }}
        safeAreaInsets={{ bottom: 0, top: 0 }}
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
          name="(quiz)"
          options={{
            title: "Quiz",
            tabBarIcon: ({ color }) => (
              <AntDesign name="question" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(menu)"
          options={{
            title: "Menu",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant-menu" size={25} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="edit" options={{ href: null }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({});
