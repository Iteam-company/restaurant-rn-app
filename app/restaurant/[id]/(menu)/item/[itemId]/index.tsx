import Wrapper from "@/modules/common/components/Wrapper";
import { Item } from "@/modules/menu/components/Item/components/Item";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FAB, Title } from "react-native-paper";

export default function ItemPage() {
  const { itemId, id } = useLocalSearchParams<{ itemId: string; id: string }>();

  return (
    <Wrapper>
        <Item />
      <FAB
        icon="pencil-outline"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
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
