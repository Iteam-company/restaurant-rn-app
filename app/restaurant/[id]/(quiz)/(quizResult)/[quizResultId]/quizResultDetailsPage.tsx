import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import QuizResultDetails from "@/modules/quiz/components/quizResult/QuizResultDetails/QuizResultDetails";

const QuizResultDetailsPage = () => {
  return (
    <Wrapper>
      <QuizResultDetails />
    </Wrapper>
  );
};
export default QuizResultDetailsPage;
