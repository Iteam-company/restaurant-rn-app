import useIos26 from "@/lib/hook/useIos26";
import { IconSymbol } from "@/modules/common/components/ui/IconSymbol";
import { TabBackground } from "@/modules/common/components/ui/TabBarBackground";
import { AntDesign } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function RestaurantLayout() {
  const { colors } = useTheme();
  const { isIOS26 } = useIos26();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {isIOS26 ? (
        <NativeTabs
          minimizeBehavior="onScrollDown"
          disableTransparentOnScrollEdge
        >
          <NativeTabs.Trigger name="(quiz)">
            <Icon sf="questionmark.circle" />
            <Label>Quizzes</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(quizResult)">
            <Icon sf="archivebox" />
            <Label>Quiz Result</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(user)">
            <Icon sf="person" />
            <Label>User</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      ) : (
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
          safeAreaInsets={{ bottom: 0, top: 0 }}
        >
          <Tabs.Screen
            name="(quiz)"
            options={{
              title: "Quiz",
              tabBarIcon: ({ color }) => (
                <AntDesign name="question" size={34} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(quizResult)"
            options={{
              title: "Quiz Results",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="chart.bar.fill" color={color} />
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
      )}
    </>
  );
}
