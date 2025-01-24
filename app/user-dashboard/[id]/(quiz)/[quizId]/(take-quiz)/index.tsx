import Wrapper from "@/modules/common/components/Wrapper";
import QuestionList from "@/modules/questions/components/QuestionList";
import { useGetQuestionsQuery } from "@/modules/questions/redux/slices/question-api";
import QuizDetails from "@/modules/quiz/components/QuizDetails/QuizDetails";
import { useGlobalSearchParams } from "expo-router";
import { Title } from "react-native-paper";

export default function TakeQuizPage() {
  return (
    <Wrapper paddingOff>
      <QuizDetails />
    </Wrapper>
  );
}
