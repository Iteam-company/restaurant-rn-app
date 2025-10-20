import TabBarOffset from "@/modules/common/components/TabBarOffset";
import useDebounce from "@/modules/common/hooks/useDebounce";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import { useSearchQuizResultQuery } from "../../redux/slices/quiz-api";
import QuizResultItemComponent from "./QuizResultItem/QuizResultItem";

const QuizResultList = () => {
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
            .map((elem) => (
              <QuizResultItemComponent key={elem.id} quizResult={elem} />
            ))
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
