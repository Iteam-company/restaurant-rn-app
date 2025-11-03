import { theme } from "@/modules/common/theme/theme";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

type OfflineScreenProps = {
  onRetry?: () => void;
};

export default function OfflineScreen({ onRetry }: OfflineScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        You are offline
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Please check your internet connection and try again.
      </Text>
      <Button mode="contained" onPress={onRetry} style={styles.button}>
        Retry
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: theme.colors.onSurface,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    minWidth: 160,
  },
});
