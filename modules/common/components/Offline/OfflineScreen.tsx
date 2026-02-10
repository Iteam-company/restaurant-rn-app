import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react-native";

type OfflineScreenProps = {
  onRetry?: () => void;
};

export default function OfflineScreen({ onRetry }: OfflineScreenProps) {
  return (
    <View className="flex-1 bg-background items-center justify-center px-6">
      <View className="mb-6 bg-secondary/30 p-6 rounded-full items-center justify-center">
        <WifiOff size={48} className="text-muted-foreground" />
      </View>
      <Text className="text-2xl font-bold text-center mb-2 text-foreground">
        You are offline
      </Text>
      <Text className="text-base text-center mb-8 text-muted-foreground">
        Please check your internet connection and try again.
      </Text>
      <Button className="w-40" size="lg" onPress={onRetry}>
        <Text>Retry</Text>
      </Button>
    </View>
  );
}
