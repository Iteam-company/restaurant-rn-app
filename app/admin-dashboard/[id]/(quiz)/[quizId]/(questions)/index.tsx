import Wrapper from "@/components/Wrapper";
import {
  navigateToCreateQuestion,
  navigateToGenerateQuestions,
} from "@/utils/flowNavigation";
import QuestionList from "@/pages/Question/QuestionList";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { LayoutAnimation, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Sparkles } from "lucide-react-native";

const Question = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const insets = useSafeAreaInsets();

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <QuestionList />
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
                <Text className="font-medium">Generate Question</Text>
              </View>

              <Button
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-xl shadow-md"
                onPress={() => {
                  toggleMenu();
                  navigateToGenerateQuestions(quizId, restaurantId);
                }}
              >
                <Sparkles size={24} className="text-foreground" />
              </Button>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-card px-3 py-1.5 rounded-md shadow-sm">
                <Text className="font-medium">Add Question</Text>
              </View>

              <Button
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-xl shadow-md"
                onPress={() => {
                  toggleMenu();
                  navigateToCreateQuestion(quizId, restaurantId);
                }}
              >
                <Plus size={28} className="text-foreground" />
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

export default Question;
