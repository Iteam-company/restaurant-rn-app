import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import QuestionList from "@/modules/questions/components/QuestionList";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Question = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper centered paddingOff>
      <QuestionList />
      <FAB
        icon="plus"
        style={[styles.fab, getFabUiSettings(insets)]}
        onPress={() => {
          router.push({
            pathname:
              "/restaurant/[id]/(quiz)/[quizId]/(questions)/addQuestion",
            params: { id: restaurantId, quizId: quizId },
          });
        }}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Question;
