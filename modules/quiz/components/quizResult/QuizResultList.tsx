import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useGetQuizResultListQuery } from "../../redux/slices/quiz-api";
import { ActivityIndicator } from "react-native-paper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuizResultItem from "./QuizResultItem/QuizResultItem";

const QuizResultList = () => {
  const { data: quizResults, isLoading } = useGetQuizResultListQuery();
  const insets = useSafeAreaInsets();

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView
      style={getScrollViewUiSettings(insets, {
        botttomOffset: 130,
        default: { marginBottom: 85 },
      })}
    >
      <View style={styles.container}>
        {quizResults?.map((elem) => (
          <QuizResultItem key={elem.id} quizResult={elem} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    gap: 16,
  },
});

export default QuizResultList;
