import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import QuizResultList from "@/modules/quiz/components/quizResult/QuizResultList";

const QuizResultScreen = () => {
  return (
    <Wrapper paddingOff>
      <QuizResultList />
    </Wrapper>
  );
};

export default QuizResultScreen;
