import { Stack } from "expo-router";

export default function QuestionIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "Question Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="edit" options={{ title: "Edit Question" }} />
      <Stack.Screen name="create" options={{ title: "Add Question" }} />
    </Stack>
  );
}
