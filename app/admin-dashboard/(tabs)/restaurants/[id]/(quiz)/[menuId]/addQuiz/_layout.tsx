import { Stack } from "expo-router";
import React from "react";

const AddQuizLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="addQuiz" />
    </Stack>
  );
};

export default AddQuizLayout;
