import { useGlobalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { useGetQuestionsQuery } from "../../lib/redux/slices/question-api";
import QuestionItem from "./QuestionItem";

const QuestionList = () => {
  const { quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { data } = useGetQuestionsQuery(quizId);

  return (
    <FlatList
      data={data}
      className="w-full py-4"
      contentContainerClassName="gap-4"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <QuestionItem question={item} />}
    />
  );
};

export default QuestionList;
