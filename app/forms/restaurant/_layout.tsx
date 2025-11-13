import ButtonBack from "@/components/button-back";
import { Stack } from "expo-router";

export default function RestaurantIdLayout() {
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
          headerTitle: "Create Restaurant",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="[restaurantId]/edit"
        options={{
          headerTitle: "Edit Restaurant",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
