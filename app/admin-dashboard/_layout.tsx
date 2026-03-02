import UserProfilePopover from "@/pages/User/UserProfilePopover";
import { Stack, usePathname } from "expo-router";

const Layout = () => {
  const path = usePathname();

  return (
    <Stack
      screenOptions={{
        headerBackVisible: path.split("/").length > 2,
        headerRight: () => {
          return <UserProfilePopover />;
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: "Restaurants",
          headerLargeTitleShadowVisible: false,
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
};

export default Layout;
