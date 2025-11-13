import useDebounce from "@/modules/common/hooks/useDebounce";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useSearchQuizResultQuery } from "../../lib/redux/slices/quiz-api";
import { QuizResultCard } from "./QuizResultCard";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import QuizResultCardSkeleton from "../Skeleton/QuizResultCard";

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
        className="py-4 w-full"
        contentContainerClassName="gap-4"
        onRefresh={() => refetch()}
        refreshing={isLoading || isFetching}
        ListEmptyComponent={() => (
          <>
            <QuizResultCardSkeleton />
            <QuizResultCardSkeleton />
            <QuizResultCardSkeleton />
            <QuizResultCardSkeleton />
          </>
        )}
        renderItem={({ item }) => <QuizResultCard quizResult={item} />}
      />
    </>
  );
};

export default QuizResultList;
