import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB } from "react-native-paper";
import { MenuDetails } from "@/modules/menu/components/MenuDetails";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";

const MenuItemPage = () => {
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper>
      <MenuDetails />
      <FAB
        icon={() => (
          <MaterialCommunityIcons
            name="hamburger-plus"
            size={24}
            color="white"
          />
        )}
        style={[
          {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            zIndex: 999,
          },
          getFabUiSettings(insets),
        ]}
        onPress={() => {
          router.push({
            pathname: "/restaurant/[id]/(menu)/menu/[menuId]/addMenuItem",
            params: { id, menuId },
          });
        }}
      />
    </Wrapper>
  );
};

export default MenuItemPage;
