import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import { MenuList } from "@/modules/menu/components/MenuList";

const MenuScreen = () => {
  return (
    <Wrapper paddingOff>
      <MenuList />
    </Wrapper>
  );
};

export default MenuScreen;
