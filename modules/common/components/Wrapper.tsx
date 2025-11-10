import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { ClassNameValue } from "tailwind-merge";

type WrapperProps = PropsWithChildren & {
  className?: ClassNameValue;
  headerTitle?: string | null;
  isScrollable?: boolean;
};

export default function Wrapper({
  children,
  className,
  headerTitle = null,
  isScrollable = false,
}: WrapperProps) {
  const { colors } = useTheme();

  return isScrollable ? (
    <ScrollView
      className={cn(`flex-1 bg-background px-4`, className)}
      contentContainerStyle={styles.centered}
    >
      {headerTitle && (
        <Appbar.Header
          statusBarHeight={0}
          style={{ backgroundColor: colors.background, ...styles.header }}
        >
          <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
          <Appbar.Content title={headerTitle} titleStyle={{ color: "white" }} />
        </Appbar.Header>
      )}
      {children}
    </ScrollView>
  ) : (
    <View
      className={cn(
        `flex-1 bg-background justify-center items-center px-4`,
        className
      )}
    >
      {headerTitle && (
        <Appbar.Header
          statusBarHeight={0}
          style={{ backgroundColor: colors.background, ...styles.header }}
        >
          <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
          <Appbar.Content title={headerTitle} titleStyle={{ color: "white" }} />
        </Appbar.Header>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
  },
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
