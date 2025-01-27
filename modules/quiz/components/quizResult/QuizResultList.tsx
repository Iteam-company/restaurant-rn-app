import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useGetQuizResultListQuery } from "../../redux/slices/quiz-api";
import { ActivityIndicator } from "react-native-paper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuizResultItem from "./QuizResultItem/QuizResultItem";
import { useGlobalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";

const QuizResultList = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const { data: quizResults, isLoading } = useGetQuizResultListQuery(
    Number(restaurantId)
  );
  const insets = useSafeAreaInsets();

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView
      style={getScrollViewUiSettings(insets, {
        botttomOffset: SecureStore.getItem(USER_ROLE) === "waiter" ? 130 : 10,
        default: { marginBottom: 85 },
      })}
    >
      <View style={styles.container}>
        {quizResults
          ?.slice()
          .reverse()
          .map((elem) => (
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
