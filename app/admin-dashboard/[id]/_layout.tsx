import useIos26 from "@/lib/hook/useIos26";
import { useGetRestaurantQuery } from "@/lib/redux/slices/restaurant-api";
import { useTheme } from "@react-navigation/native";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { ArchiveIcon, CircleQuestionMark, Users } from "lucide-react-native";

export default function RestaurantPageLayout() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetRestaurantQuery(id);
  const { isIOS26 } = useIos26();

  return (
    <>
      <Stack.Screen options={{ headerTitle: data?.name }} />

      {isIOS26 ? (
        <NativeTabs
          minimizeBehavior="onScrollDown"
          backgroundColor={isIOS26 ? undefined : colors.card}
          disableTransparentOnScrollEdge
        >
          <NativeTabs.Trigger name="(workers)">
            <Icon sf="person.2" />
            <Label>Workers</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(quiz)">
            <Icon sf="questionmark.circle" />
            <Label>Quizzes</Label>
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(quizResult)">
            <Icon sf="archivebox" />
            <Label>Quiz Result</Label>
          </NativeTabs.Trigger>
        </NativeTabs>
      ) : (
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="(workers)"
            options={{
              tabBarLabel: "Workers",
              tabBarIcon: (props) => <Users {...props} />,
            }}
          />
          <Tabs.Screen
            name="(quiz)"
            options={{
              tabBarLabel: "Quiz",
              tabBarIcon: (props) => <CircleQuestionMark {...props} />,
            }}
          />
          <Tabs.Screen
            name="(quizResult)"
            options={{
              tabBarLabel: "Quiz Result",
              tabBarIcon: (props) => <ArchiveIcon {...props} />,
            }}
          />
        </Tabs>
      )}
    </>
  );
}
