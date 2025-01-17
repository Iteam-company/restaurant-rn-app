import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Provider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFabUiSettings from "../constants/getFabUiSettings.ios";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  menuId: string;
  restaurantId: string;
};

const UpwardDropDown = ({ menuId, restaurantId }: Props) => {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  return (
    <FAB.Group
      visible={true}
      open={open}
      style={[styles.container, getFabUiSettings(insets, { isFABGroup: true })]}
      icon={open ? "minus" : "plus"}
      actions={[
        {
          icon: "hamburger-plus",
          label: "Add Menu Item",
          onPress: () =>
            router.push({
              pathname: "/restaurant/[id]/(menu)/menu/[menuId]/addMenuItem",
              params: { id: restaurantId, menuId },
            }),
        },
        {
          icon: "help-circle-outline",
          label: "Add Quiz",
          onPress: () =>
            router.push({
              pathname: "/restaurant/[id]/(quiz)/[menuId]/addQuiz/addQuiz",
              params: { id: restaurantId, menuId },
            }),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // Do something if the speed dial is open
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
  },
});

export default UpwardDropDown;
