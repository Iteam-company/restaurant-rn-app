import { Slot, Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QuizLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        className="bg-background flex-row items-center px-2 pb-2"
        style={{ paddingTop: insets.top }}
      >
        <Button variant="ghost" size="icon" onPress={() => router.back()}>
          <ArrowLeft size={24} className="text-foreground" />
        </Button>
      </View>
      <Slot />
    </>
  );
}
