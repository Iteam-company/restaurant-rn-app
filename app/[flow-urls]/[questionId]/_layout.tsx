import { Stack } from "expo-router";

export default function QuestionIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Question Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="edit.tsx" options={{ title: "Edit Question" }} />
      <Stack.Screen name="create.tsx" options={{ title: "Add Question" }} />
    </Stack>
  );
}
