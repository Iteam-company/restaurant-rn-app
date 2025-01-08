import { useGetMenuItemQuery } from "@/modules/menu/redux/slices/menu-api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export const EditItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();

  const { data } = useGetMenuItemQuery(itemId);
  

  return <View>dfvbhj fvvfhjd</View>;
};
