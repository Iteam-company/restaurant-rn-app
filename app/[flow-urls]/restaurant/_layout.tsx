import { Stack } from "expo-router";

export default function RestaurantIdLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "Restaurant Management",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="[restaurantId]/edit" options={{ title: "Edit Restaurant" }} />
      <Stack.Screen name="create" options={{ title: "Create Restaurant" }} />
    </Stack>
  );
}
