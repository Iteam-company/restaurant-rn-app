import { Button } from "@/components/ui/button";
import Wrapper from "@/components/Wrapper";
import {
  navigateToCreateQuiz,
  navigateToGenerateQuiz,
} from "@/utils/flowNavigation";
import QuizList from "@/pages/Quiz/QuizList";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Plus, Sparkles, Minus } from "lucide-react-native";
import { LayoutAnimation, Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";

const Quiz = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <QuizList />
      {isOpen && (
        <Pressable
          className="absolute inset-0 bg-black/20"
          onPress={toggleMenu}
        />
      )}
      <View
        className="absolute right-6 flex-col items-end gap-4"
        style={{ bottom: insets.bottom + 56 }}
      >
        {isOpen && (
          <>
            <View className="flex-row items-center gap-3">
              <View className="bg-card px-3 py-1.5 rounded-md shadow-sm">
                <Text className="font-medium">Generate Quiz</Text>
              </View>

              <Button
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-xl shadow-md"
                onPress={() => {
                  toggleMenu();
                  navigateToGenerateQuiz(restaurantId);
                }}
              >
                <Sparkles size={24} className="text-foreground" />
              </Button>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-card px-3 py-1.5 rounded-md shadow-sm">
                <Text className="font-medium">Add Quiz</Text>
              </View>

              <Button
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-xl shadow-md"
                onPress={() => {
                  toggleMenu();
                  navigateToCreateQuiz(restaurantId);
                }}
              >
                <Plus size={24} className="text-foreground" />
              </Button>
            </View>
          </>
        )}

        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-xl shadow-md"
          onPress={toggleMenu}
        >
          {isOpen ? (
            <Minus size={28} className="text-foreground" />
          ) : (
            <Plus size={28} className="text-foreground" />
          )}
        </Button>
      </View>
    </Wrapper>
  );
};

export default Quiz;
