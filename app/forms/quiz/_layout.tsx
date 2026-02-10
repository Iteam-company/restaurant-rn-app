import ButtonBack from "@/components/button-back";
import { Stack } from "expo-router";

export default function QuizIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: true,
        headerLeft: () => <ButtonBack />,
      }}
    >
      <Stack.Screen name="[quizId]/edit" options={{ title: "Edit Quiz" }} />
      <Stack.Screen name="create" options={{ title: "Create Quiz" }} />
      <Stack.Screen name="generate" options={{ title: "Generate Quiz" }} />
    </Stack>
  );
}
