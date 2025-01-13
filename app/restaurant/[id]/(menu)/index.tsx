import Wrapper from "@/modules/common/components/Wrapper";
import { MenuList } from "@/modules/menu/components/MenuList";
import { router } from "expo-router";
import { Platform } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuPage() {
  const insets = useSafeAreaInsets();

  return (
    <Wrapper>
      <MenuList />
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: Platform.select({ ios: insets.bottom * 2.5, default: 0 }),
        }}
        onPress={() => router.push("./addMenu")}
      />
    </Wrapper>
  );
}
