import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export const TabBackground = () => {
  const { colors, dark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: dark ? colors.surface : colors.background,
          borderTopColor:
            (colors as any).outline || (dark ? "#333333" : "#e0e0e0"),
        },
        Platform.OS === "ios" ? styles.ios : styles.android,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0.5,
  },
  ios: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  android: {
    elevation: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
