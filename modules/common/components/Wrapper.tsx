import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WrapperProps = PropsWithChildren & {
  centered?: boolean;
  paddingOff?: boolean;
  marginTop?: boolean;
  headerTitle?: string | null;
  isScrollable?: boolean;
};

export default function Wrapper({
  children,
  centered = false,
  paddingOff = false,
  marginTop = false,
  headerTitle = null,
  isScrollable = false,
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

  const Container = isScrollable ? ScrollView : View;

  return (
    <Container
      style={!isScrollable && containerStyle}
      contentContainerStyle={containerStyle}
    >
      {headerTitle && (
        <Appbar.Header
          statusBarHeight={0}
          style={{
            backgroundColor: colors.background,
            ...styles.header,
          }}
        >
          <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
          <Appbar.Content title={headerTitle} titleStyle={{ color: "white" }} />
        </Appbar.Header>
      )}
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
  },
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
