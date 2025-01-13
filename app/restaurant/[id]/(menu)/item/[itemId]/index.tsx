import Wrapper from "@/modules/common/components/Wrapper";
import { Item } from "@/modules/menu/components/Item/components/Item";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { FAB, Title } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ItemPage() {
  const { itemId, id } = useLocalSearchParams<{ itemId: string; id: string }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper>
      <Item />
      <FAB
        icon="pencil-outline"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: Platform.select({ ios: insets.bottom * 2.5, default: 0 }),
        }}
        onPress={() =>
          router.push({
            pathname: "/restaurant/[id]/(menu)/item/[itemId]/editItem",
            params: { id, itemId },
          })
        }
      />
    </Wrapper>
  );
}
