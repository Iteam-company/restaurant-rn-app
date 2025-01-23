import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import RestaurantsComponent from "@/modules/restaurant/components/Restaurants/Restaurants";
import { router, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";

export default function Restaurants() {
  const insets = useSafeAreaInsets();

  const { data: user, isLoading } = useValidateTokenQuery();

  useEffect(() => {
    if (user?.role === "waiter") {
      router.replace({
        pathname: "/user-dashboard/[id]/(menu)",
        params: { id: user.restaurantId },
      });
      SecureStore.setItem(USER_ROLE, user.role);
    }
  }, [user]);

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <Wrapper centered paddingOff>
      <RestaurantsComponent />
    </Wrapper>
  );
}
