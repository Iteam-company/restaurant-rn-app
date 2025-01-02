import React from "react";
import { View } from "react-native";
import Wrapper from "@/modules/common/components/Wrapper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB, useTheme } from "react-native-paper";
import { MenuDetails } from "@/modules/menu/components/MenuDetails";

export default function MenuPage() {
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
        }}
        // onPress={() => router.push("./addMenu")}
      />
    </Wrapper>
  );
}
