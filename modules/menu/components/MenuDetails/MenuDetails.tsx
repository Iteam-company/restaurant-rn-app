import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useGetMenuQuery } from "../../redux/slices/menu-api";

export const MenuDetails = () => {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const { data } = useGetMenuQuery(menuId);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return <View></View>;
};
