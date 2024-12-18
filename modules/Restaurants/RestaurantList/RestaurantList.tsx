import React, { useEffect } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Text } from "react-native-paper";

const RestaurantList = () => {
  useEffect(() => {
    console.log("get restaurants");
  }, []);

  return (
    <View>
      <IconButton
        icon="plus"
        size={24}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

export default RestaurantList;
