import React from "react";
import { View } from "react-native";
import Wrapper from "@/modules/common/components/Wrapper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, Title } from "react-native-paper";
import { MenuDetails } from "@/modules/menu/components/MenuDetails";
import { router, useLocalSearchParams } from "expo-router";

export default function MenuPage() {
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();
  return (
    <Wrapper>
      <MenuDetails />
      <FAB
        icon={() => (
          <MaterialCommunityIcons
            name="hamburger-plus"
            size={24}
            color={"white"}
          />
        )}
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
        onPress={() => {
          console.log("vfdjinffvjvn");
          router.push({
            pathname: "/restaurant/[id]/(menu)/menu/addMenuItem/[menuId]",
            params: { id, menuId },
          });
        }}
      />
    </Wrapper>
  );
}
