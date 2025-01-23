import Wrapper from "@/modules/common/components/Wrapper";
import QuizList from "@/modules/quiz/components/QuizList";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RestaurantQuiz = () => {
  return (
    <Wrapper paddingOff>
      <QuizList />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantQuiz;
