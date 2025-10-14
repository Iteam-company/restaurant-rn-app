import { Stack } from "expo-router";

export default function QuizIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Quiz Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="edit.tsx" options={{ title: "Edit Quiz" }} />
      <Stack.Screen name="create.tsx" options={{ title: "Create Quiz" }} />
    </Stack>
  );
}
