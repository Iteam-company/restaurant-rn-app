import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import QuizList from "@/modules/quiz/components/QuizList";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
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
            icon: "format-list-bulleted",
            label: "Quiz Results",
            onPress: () =>
              router.push({
                pathname: "/restaurant/[id]/(quiz)/(quizResult)/quizResult",
                params: { id: restaurantId },
              }),
          },
          {
            icon: "plus",
            label: "Add Quiz",
            onPress: () =>
              router.push({
                pathname: "/restaurant/[id]/(quiz)/[menuId]/addQuiz/addQuiz",
                params: { id: restaurantId, menuId: -1 },
              }),
          },
        ]}
        style={[getFabUiSettings(insets, { isFABGroup: true })]}
      />
    </Wrapper>
  );
};

export default Quiz;
