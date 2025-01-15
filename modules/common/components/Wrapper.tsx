import { View, StyleSheet, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { useTheme } from "react-native-paper";

type WrapperProps = PropsWithChildren & {
  centered?: boolean;
  paddingOff?: boolean;
};

export default function Wrapper({
  children,
  centered = false,
  paddingOff = false,
}: WrapperProps) {
  const { colors } = useTheme();

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(centered && styles.centered),
    ...(paddingOff ? { paddingHorizontal: 10 } : { padding: 10 }),
    backgroundColor: colors.background,
  };

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
});
