import React from "react";
import Wrapper from "@/modules/common/components/Wrapper";
import { QuizResultDetails } from "@/modules/quiz/components/quizResult/QuizResultDetails/QuizResultDetails";

const QuizResult = () => {
  return (
    <Wrapper paddingOff>
      <QuizResultDetails />
    </Wrapper>
  );
};

export default QuizResult;
