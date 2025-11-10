import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useGlobalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useGetQuestionsQuery } from "../../../lib/redux/slices/question-api";
import QuestionItem from "./QuestionItem.tsx/QuestionItem";

const QuestionList = () => {
  const { quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { data, isLoading } = useGetQuestionsQuery(quizId);

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          data?.map((elem) => <QuestionItem key={elem.id} question={elem} />)
        )}
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    gap: 16,
  },
});

export default QuestionList;
