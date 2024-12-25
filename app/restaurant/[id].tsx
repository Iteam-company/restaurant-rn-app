import Wrapper from "@/modules/common/components/Wrapper";
import RestaurantInfo from "@/modules/restaurant/components/RestaurantInfo/RestaurantInfo";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const Restaurant = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false, // Це приховає header
        }}
      />
        <RestaurantInfo />
    </>
  );
};

export default Restaurant;
