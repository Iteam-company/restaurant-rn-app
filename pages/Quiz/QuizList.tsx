import { useGlobalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { useGetQuizByRestaurantQuery } from "../../lib/redux/slices/quiz-api";
import QuizItem from "./QuizItem";
import { DifficultyLevelEnum, StatusEnum } from "@/lib/redux/types";
import Chip from "@/components/chip";

const QuizList = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const { data } = useGetQuizByRestaurantQuery(restaurantId, {
    skip: !restaurantId,
  });

  const [selectedStatus, setSelectedStatus] = useState<StatusEnum[]>([]);
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<
    DifficultyLevelEnum[]
  >([]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const matchesStatus =
        selectedStatus.length === 0 || selectedStatus.includes(item.status);
      const matchesDifficultyLevel =
        selectedDifficultyLevel.length === 0 ||
        selectedDifficultyLevel.includes(item.difficultyLevel);
      return matchesStatus && matchesDifficultyLevel;
    });
  }, [data, selectedStatus, selectedDifficultyLevel]);

  const toggleStatus = (status: StatusEnum) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };
  const toggleDifficultyLevel = (level: DifficultyLevelEnum) => {
    setSelectedDifficultyLevel((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <FlatList
      data={filteredData}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="py-4 gap-4"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View className="flex flex-row flex-wrap gap-1">
          {Object.values(StatusEnum).map((status) => (
            <Chip
              key={status}
              selected={selectedStatus.includes(status)}
              onPress={() => toggleStatus(status)}
              value={status}
            />
          ))}

          {Object.values(DifficultyLevelEnum).map((level) => (
            <Chip
              key={level}
              selected={selectedDifficultyLevel.includes(level)}
              onPress={() => toggleDifficultyLevel(level)}
              value={level}
            />
          ))}
        </View>
      )}
      renderItem={({ item }) => <QuizItem quiz={item} />}
    />
  );
};

export default QuizList;
