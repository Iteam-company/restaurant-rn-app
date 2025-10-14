import { Stack } from "expo-router";

export default function UserIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "User Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="edit.tsx" options={{ title: "Edit User" }} />
      <Stack.Screen name="create.tsx" options={{ title: "Add User" }} />
    </Stack>
  );
}
