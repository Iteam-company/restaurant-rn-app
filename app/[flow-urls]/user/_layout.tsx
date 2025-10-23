import { Stack } from "expo-router";

export default function UserIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "User Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="[userId]/edit" options={{ title: "Edit User" }} />
      <Stack.Screen name="create" options={{ title: "Add User" }} />
    </Stack>
  );
}
