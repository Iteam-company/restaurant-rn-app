import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import { MenuList } from "@/modules/menu/components/MenuList";
import { router } from "expo-router";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuPage() {
  const insets = useSafeAreaInsets();

  return (
    <Wrapper paddingOff>
      <MenuList />
      <FAB
        icon="plus"
        style={[
          {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
          },
          getFabUiSettings(insets),
        ]}
        onPress={() => router.push("./addMenu")}
      />
    </Wrapper>
  );
}
