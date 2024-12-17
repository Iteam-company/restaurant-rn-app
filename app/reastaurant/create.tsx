import Wrapper from "@/modules/common/components/Wrapper";
import { restaurantApi } from "@/modules/common/redux/slices/create-restaurant-api";
import CreateRestaurant from "@/modules/CreateRestaurant/CreateRestaurant";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { StyleSheet, Image, Platform } from "react-native";
import { Text } from "react-native-paper";

export default function Create() {
  return (
    <Wrapper centered>
      <CreateRestaurant />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
