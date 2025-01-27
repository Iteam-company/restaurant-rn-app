import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Wrapper from "@/modules/common/components/Wrapper";
import QuizResultList from "@/modules/quiz/components/quizResult/QuizResultList";

const QuizResult = () => {
  return (
    <Wrapper paddingOff centered>
      <QuizResultList />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default QuizResult;
