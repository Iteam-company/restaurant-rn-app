import { Stack } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

const AddQuizLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <Appbar.Header>
            <Appbar.BackAction color="white" />
            <Appbar.Content title="Add Quiz" titleStyle={{ color: "white" }} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="addQuiz" />
    </Stack>
  );
};

export default AddQuizLayout;
