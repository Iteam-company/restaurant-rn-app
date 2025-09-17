import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  useGetQuizResultListQuery,
  useSearchQuizResultQuery,
} from "../../redux/slices/quiz-api";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuizResultItem from "./QuizResultItem/QuizResultItem";
import { useGlobalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";
import useDebounce from "@/modules/common/hooks/useDebounce";
import TabBarOffset from "@/modules/common/components/TabBarOffset";

const QuizResultList = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data: quizResults, isLoading } =
    useSearchQuizResultQuery(debouncedSearchTerm);

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={(value) => setSearchQuery(value)}
          value={searchQuery}
          style={{
            marginTop: 10,
          }}
        />
        {isLoading ? (
          <ActivityIndicator animating={true} color={"#7c8ebf"} />
        ) : (
          quizResults
            ?.slice()
            .reverse()
            .map((elem) => <QuizResultItem key={elem.id} quizResult={elem} />)
        )}
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
    gap: 16,
  },
});

export default QuizResultList;
