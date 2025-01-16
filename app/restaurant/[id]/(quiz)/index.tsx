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

  return (
    <Wrapper centered paddingOff>
      <QuizList />
      <FAB
        icon="plus"
        style={[styles.fab, getFabUiSettings(insets)]}
        onPress={() => {
          router.push({
            pathname: "/restaurant/[id]/(quiz)/[menuId]/addQuiz/addQuiz",
            params: { id: restaurantId, menuId: -1 },
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

export default Quiz;
