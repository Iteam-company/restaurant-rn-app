import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import { MenuDetails } from "@/modules/menu/components/MenuDetails";
import { useLocalSearchParams } from "expo-router";
import UpwardDropDown from "@/modules/common/components/UpwardDropDown";

const MenuItemPage = () => {
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();

  return (
    <Wrapper paddingOff>
      <MenuDetails />
      <UpwardDropDown restaurantId={id} menuId={menuId} />
    </Wrapper>
  );
};

export default MenuItemPage;
