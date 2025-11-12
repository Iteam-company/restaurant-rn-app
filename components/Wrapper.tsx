import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ClassNameValue } from "tailwind-merge";

type WrapperProps = PropsWithChildren & {
  className?: ClassNameValue;
  isScrollable?: boolean;
};

export default function Wrapper({
  children,
  className,
  isScrollable = false,
}: WrapperProps) {
  return isScrollable ? (
    <ScrollView
      className={cn(`h-full flex bg-background px-4`, className)}
      contentContainerStyle={styles.centered}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="always"
    >
      {children}
    </ScrollView>
  ) : (
    <View
      className={cn(
        `h-full w-screen flex bg-background justify-center items-center px-4`,
        className
      )}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
