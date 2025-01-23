import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import { Item } from "@/modules/menu/components/Item/components/Item";

export default function MenuItemDetails() {
  const { itemId } = useLocalSearchParams();

  return (
    <Wrapper paddingOff>
      <Item />
    </Wrapper>
  );
}
