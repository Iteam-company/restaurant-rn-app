import useDebounce from "@/modules/common/hooks/useDebounce";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSearchQuizResultQuery } from "../../lib/redux/slices/quiz-api";
import QuizResultItemComponent from "./QuizResultItem";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const QuizResultList = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const {
    data: quizResults,
    isLoading,
    refetch,
    isFetching,
  } = useSearchQuizResultQuery(debouncedSearchTerm);

  return (
    <>
      <View className="w-screen p-4 pb-2">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
        />
      </View>
      <Separator className="w-screen" />

      <FlatList
        data={quizResults}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={(item) => item.id.toString()}
        className="py-2"
        contentContainerClassName="gap-6"
        onRefresh={() => refetch()}
        refreshing={isLoading || isFetching}
        renderItem={({ item }) => <QuizResultItemComponent quizResult={item} />}
      />
    </>
  );
};

export default QuizResultList;
