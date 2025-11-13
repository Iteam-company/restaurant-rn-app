// import ButtonBack from "@/components/button-back";
import ButtonBack from "@/components/button-back";
import { Stack } from "expo-router";

export default function UserIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackVisible: true,
        headerLeft: () => <ButtonBack />,
      }}
    >
      <Stack.Screen
        name="create"
        options={{
          headerTitle: "Create User",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="[userId]/edit"
        options={{
          headerTitle: "Edit User",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
