import { useState } from "react";
import { LayoutAnimation, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { navigateToCreateQuiz } from "../utils/flowNavigation";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { HelpCircle, Minus, Plus } from "lucide-react-native";

type Props = {
  restaurantId: string;
};

const UpwardDropDown = ({ restaurantId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const toggleMenu = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <Pressable
          className="absolute inset-0 bg-black/20 z-40"
          onPress={toggleMenu}
        />
      )}

      <View
        className="absolute right-6 flex-col items-end gap-4 z-50"
        style={{ bottom: insets.bottom + 24 }}
      >
        {isOpen && (
          <View className="flex-row items-center gap-3">
            <View className="bg-card px-3 py-1.5 rounded-md shadow-sm border border-border">
              <Text className="font-medium text-sm">Add Quiz</Text>
            </View>

            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full shadow-md"
              onPress={() => {
                toggleMenu();
                navigateToCreateQuiz(restaurantId);
              }}
            >
              <HelpCircle size={24} className="text-foreground" />
            </Button>
          </View>
        )}

        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl"
          onPress={toggleMenu}
        >
          {isOpen ? (
            <Minus size={28} className="text-primary-foreground" />
          ) : (
            <Plus size={28} className="text-primary-foreground" />
          )}
        </Button>
      </View>
    </>
  );
};

export default UpwardDropDown;
