import Wrapper from "@/modules/common/components/Wrapper";
import EditWorker from "@/modules/restaurant/components/RestaurantInfo/editWorker/EditWorker";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditUserScreen = () => {
  const { userId, id: restaurantId } = useLocalSearchParams<{
    userId: string;
    id: string;
  }>();

  return (
    <Wrapper centered paddingOff>
      <EditWorker />
    </Wrapper>
  );
};

export default EditUserScreen;
