import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetQuestionsQuery } from "../redux/slices/question-api";
import { useGlobalSearchParams } from "expo-router";
import QuestionItem from "./QuestionItem.tsx/QuestionItem";
import { ActivityIndicator } from "react-native-paper";

const QuestionList = () => {
  const insets = useSafeAreaInsets();
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { data, isLoading, error } = useGetQuestionsQuery(quizId);

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          data?.map((elem) => <QuestionItem key={elem.id} question={elem} />)
        )}
      </View>
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
