import { Stack } from "expo-router";

export default function RestaurantIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Restaurant Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="edit.tsx" options={{ title: "Edit Restaurant" }} />
      <Stack.Screen
        name="create.tsx"
        options={{ title: "Create Restaurant" }}
      />
    </Stack>
  );
}
