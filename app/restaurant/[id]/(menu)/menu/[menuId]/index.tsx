import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FAB } from "react-native-paper";
import { MenuDetails } from "@/modules/menu/components/MenuDetails";
import { router, useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import UpwardDropDown from "@/modules/common/components/UpwardDropDown";

const MenuItemPage = () => {
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper paddingOff>
      <MenuDetails />
      <UpwardDropDown restaurantId={id} menuId={menuId} />
    </Wrapper>
  );
};

export default MenuItemPage;
