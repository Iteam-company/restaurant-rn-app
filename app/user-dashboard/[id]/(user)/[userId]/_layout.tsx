import { Slot, Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Slot />
    </>
  );
}
