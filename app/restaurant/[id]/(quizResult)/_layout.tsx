import { Stack } from "expo-router";

export default function QuizResultLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Quiz Results",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[quizResultId]/quizResultDetailsPage"
        options={{
          title: "Quiz Result Details",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
