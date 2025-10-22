import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import { navigateToCreateQuiz } from "@/modules/common/utils/flowNavigation";
import QuizList from "@/modules/quiz/components/QuizList";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Quiz = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Wrapper centered paddingOff>
      <QuizList />
      <FAB.Group
        open={isOpen}
        visible
        onStateChange={({ open }) => setIsOpen(open)}
        icon={isOpen ? "minus" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Quiz",
            onPress: () => navigateToCreateQuiz(restaurantId),
          },
          {
            icon: "progress-question",
            label: "Generate Quiz",
            onPress: () => navigateToCreateQuiz(restaurantId),
          },
        ]}
        style={[getFabUiSettings(insets, { isFABGroup: true })]}
      />
    </Wrapper>
  );
};

export default Quiz;
