import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import {
  navigateToCreateQuestion,
  navigateToGenerateQuestions,
} from "@/modules/common/utils/flowNavigation";
import QuestionList from "@/modules/questions/components/QuestionList";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Question = () => {
  const [open, setOpen] = useState(false);
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const insets = useSafeAreaInsets();

  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  return (
    <Wrapper centered paddingOff>
      <QuestionList />
      <FAB.Group
        visible={true}
        open={open}
        style={[
          styles.container,
          getFabUiSettings(insets, { isFABGroup: true }),
        ]}
        icon={open ? "minus" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "Add Question",
            onPress: () => navigateToCreateQuestion(quizId, restaurantId),
          },
          {
            icon: "lightbulb-outline",
            label: "Generate Question",
            onPress: () => navigateToGenerateQuestions(quizId, restaurantId),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // Do something if the speed dial is open
          }
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 0,
  },
});

export default Question;
