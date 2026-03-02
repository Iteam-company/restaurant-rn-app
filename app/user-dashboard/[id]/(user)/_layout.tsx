import { Slot, Stack } from "expo-router";
import React from "react";

const UserLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        title: "User",
        headerShown: true,
        headerStyle: { backgroundColor: "white" },
      }}
    >
      <Slot />
    </Stack>
  );
};

export default UserLayout;
