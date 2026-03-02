import { Slot, Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack
        screenOptions={{
          title: "Quiz Result",
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <Slot />
      </Stack>
  );
}
