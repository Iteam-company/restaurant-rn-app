import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getFabUiSettings from "../constants/getFabUiSettings.ios";
import { navigateToCreateQuiz } from "../utils/flowNavigation";

type Props = {
  restaurantId: string;
};

const UpwardDropDown = ({ restaurantId }: Props) => {
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
          icon: "help-circle-outline",
          label: "Add Quiz",
          onPress: () => navigateToCreateQuiz(restaurantId),
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
