import { View, StyleSheet, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WrapperProps = PropsWithChildren & {
  centered?: boolean;
  paddingOff?: boolean;
  marginTop?: boolean;
};

export default function Wrapper({
  children,
  centered = false,
  paddingOff = false,
  marginTop = false,
}: WrapperProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(centered && styles.centered),
    ...(paddingOff ? { paddingHorizontal: 10 } : { padding: 10 }),
    ...(marginTop ? { marginTop: insets.top } : {}),
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
