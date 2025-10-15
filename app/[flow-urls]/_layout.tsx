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
      <Stack.Screen name="user" />
      <Stack.Screen name="restaurant" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="question" />
    </Stack>
  );
}
