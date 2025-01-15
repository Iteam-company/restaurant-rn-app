import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetQuizesQuery } from "../redux/slices/quiz-api";
import QuizItem from "./QuizItem/QuizItem";

const QuizList = () => {
  const { data } = useGetQuizesQuery();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[getScrollViewUiSettings(insets), { width: "100%" }]}>
      <View style={styles.container}>
        {data?.map((elem) => (
          <QuizItem key={elem.id} quiz={elem} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 16,
    gap: 16,
  },
});

export default QuizList;
