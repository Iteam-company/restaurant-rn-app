import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import RestaurantsComponent from "@/modules/restaurant/components/Restaurants/Restaurants";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Restaurants() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper centered>
      <RestaurantsComponent />
    </Wrapper>
  );
}
