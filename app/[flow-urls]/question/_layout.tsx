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
      <Stack.Screen name="create" options={{ title: "Add Question" }} />
      <Stack.Screen name="generate" options={{ title: "Generate Questions" }} />
      <Stack.Screen
        name="[questionId]/edit"
        options={{ title: "Edit Question" }}
      />
    </Stack>
  );
}
