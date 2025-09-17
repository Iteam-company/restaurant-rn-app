import Wrapper from "@/modules/common/components/Wrapper";
import getFabUiSettings from "@/modules/common/constants/getFabUiSettings.ios";
import QuizList from "@/modules/quiz/components/QuizList";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RestaurantQuiz = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  return (
    <Wrapper paddingOff>
      <QuizList />
      <FAB
        icon="format-list-checks"
        style={[
          styles.fab,
          getFabUiSettings(insets, {
            defaultStyle: { bottom: 24 },
          }),
        ]}
        onPress={() =>
          router.push({
            pathname: "/user-dashboard/[id]/(quiz)/(quizResult)",
            params: { id: restaurantId },
          })
        }
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default RestaurantQuiz;
