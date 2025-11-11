import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "react-native-paper";

export default function RestaurantPageLayout() {
  const { colors } = useTheme();

  return (
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
    </Tabs>
  );
}
