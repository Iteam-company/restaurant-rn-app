import { Slot, Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Quiz",
          headerShown: true,
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <Slot />
      </Stack>
    </>
  );
}
