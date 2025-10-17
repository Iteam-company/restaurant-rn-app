import { Stack } from "expo-router";

export default function QuizIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "Quiz Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="[quizId]/edit" options={{ title: "Edit Quiz" }} />
      <Stack.Screen name="create" options={{ title: "Create Quiz" }} />
    </Stack>
  );
}
