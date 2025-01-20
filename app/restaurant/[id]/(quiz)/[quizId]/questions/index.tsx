import Wrapper from "@/modules/common/components/Wrapper";
import QuestionList from "@/modules/questions/components/QuestionList";
import React from "react";
import { Text } from "react-native-paper";

const Question = () => {
  return (
    <Wrapper centered paddingOff>
      <QuestionList />
    </Wrapper>
    // To Do FAB
  );
};
export default Question;
