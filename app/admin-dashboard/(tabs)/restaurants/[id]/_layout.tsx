import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { useGetRestaurantQuery } from "@/lib/redux/slices/restaurant-api";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack, Tabs, useGlobalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function RestaurantPageLayout() {
  const { colors } = useTheme();
  const { id } = useGlobalSearchParams<{
    id: string;
    workerId: string;
  }>();

  const { data: restaurantData } = useGetRestaurantQuery(id, { skip: !id });

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
            router.push({
              pathname: "/admin-dashboard/(tabs)/restaurants",
            })
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
          name="(quizResult)"
          options={{
            title: "Quiz Results",
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={25}
                name="chart.bar.fill"
                weight="medium"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen name="edit" options={{ href: null }} />
      </Tabs>
    </>
  );
}
