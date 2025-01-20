import Wrapper from "@/modules/common/components/Wrapper";
import EditQuiz from "@/modules/quiz/components/EditQuiz/EditQuiz";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const EditQuizPage = () => {
  return (
    <Wrapper centered paddingOff>
      <EditQuiz />
    </Wrapper>
  );
};

export default EditQuizPage;
