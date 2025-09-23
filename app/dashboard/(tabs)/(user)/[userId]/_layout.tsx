import { Slot, Stack } from "expo-router";
import React from "react";

export default function QuizLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* <Appbar.Header
        statusBarHeight={0}
        style={{ backgroundColor: colors.background }}
      >
        <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
      </Appbar.Header> */}
      <Slot />
    </>
  );
}
