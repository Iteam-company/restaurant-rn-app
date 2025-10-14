import { Stack } from "expo-router";

export default function FlowUrlsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="[userId]" />
      <Stack.Screen name="[restaurantId]" />
      <Stack.Screen name="[quizId]" />
      <Stack.Screen name="[questionId]" />
    </Stack>
  );
}
