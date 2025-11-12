import { Text } from "@/components/ui/text";
import useIos26 from "@/lib/hook/useIos26";
import { useGetRestaurantQuery } from "@/lib/redux/slices/restaurant-api";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { ArchiveIcon, CircleQuestionMark, Users } from "lucide-react-native";

export default function RestaurantPageLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetRestaurantQuery(id);
  const { isIOS26 } = useIos26();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => <Text variant="large">{data?.name}</Text>,
        }}
      />

      {isIOS26 ? (
        <NativeTabs
          minimizeBehavior="onScrollDown"
          disableTransparentOnScrollEdge
        >
          <NativeTabs.Trigger name="(workers)/index">
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
            name="(workers)/index"
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
            name="(quizResult)/index"
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
