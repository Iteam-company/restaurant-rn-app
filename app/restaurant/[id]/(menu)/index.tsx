import Wrapper from "@/modules/common/components/Wrapper";
import { MenuList } from "@/modules/menu/components/MenuList";
import { router} from "expo-router";
import { FAB } from "react-native-paper";

export default function MenuPage() {
  return (
    <Wrapper>
      <MenuList />
      <FAB
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => router.push("./addMenu")}
      />
    </Wrapper>
  );
}
