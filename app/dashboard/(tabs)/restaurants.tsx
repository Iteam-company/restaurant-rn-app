import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import Wrapper from "@/modules/common/components/Wrapper";
import RestaurantsComponent from "@/modules/restaurant/components/Restaurants/Restaurants";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";

export default function Restaurants() {
  const { data: user, isLoading } = useValidateTokenQuery();

  useEffect(() => {
    if (user?.role === "waiter") {
      router.replace({
        pathname: "/user-dashboard/[id]/(menu)",
        params: { id: user.restaurantId },
      });
    }

    if (user) SecureStore.setItem(USER_ROLE, user.role);
  }, [user]);

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <Wrapper centered paddingOff>
      <RestaurantsComponent />
    </Wrapper>
  );
}
