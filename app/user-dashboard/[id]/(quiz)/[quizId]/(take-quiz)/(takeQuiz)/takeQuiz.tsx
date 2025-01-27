import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import TakeQuiz from "@/modules/quiz/components/TakeQuiz/TakeQuiz";

const TakeQuizPage = () => {
  return (
    <Wrapper centered paddingOff>
      <TakeQuiz />
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

export default TakeQuizPage;
