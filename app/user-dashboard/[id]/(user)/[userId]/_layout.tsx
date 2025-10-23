import { Slot, Stack } from "expo-router";
import React from "react";

export default function QuizLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Slot />
    </>
  );
}
