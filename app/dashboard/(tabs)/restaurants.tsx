import Wrapper from "@/modules/common/components/Wrapper";
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
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: Platform.select({ ios: insets.bottom * 2.5, default: 0 }),
        }}
        onPress={() => router.push("/restaurant/create")}
      />
    </Wrapper>
  );
}
