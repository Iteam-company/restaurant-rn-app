import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetQuizByRestaurantQuery } from "../redux/slices/quiz-api";
import QuizItem from "./QuizItem/QuizItem";
import { useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Chip, Title, useTheme } from "react-native-paper";
import { DifficultyLevelEnum, StatusEnum } from "../types";
import { statusIcons } from "@/modules/menu/components/MenuList/utils";
import { useMemo, useState } from "react";
import TabBarOffset from "@/modules/common/components/TabBarOffset";

const QuizList = () => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetQuizByRestaurantQuery(restaurantId);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [selectedStatus, setSelectedStatus] = useState<StatusEnum[]>([]);
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState<
    DifficultyLevelEnum[]
  >([]);

  const getColorForDifficulty = (level: DifficultyLevelEnum): string => {
    switch (level) {
      case DifficultyLevelEnum.EASY:
        return "green";
      case DifficultyLevelEnum.MEDIUM:
        return "orange";
      case DifficultyLevelEnum.HARD:
        return "red";
      default:
        return "gray";
    }
  };

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
    <ScrollView style={[{ width: "100%" }]}>
      <View style={styles.container}>
        <View style={styles.tagsContainer}>
          {Object.values(StatusEnum).map((status) => (
            <Chip
              key={status}
              icon={statusIcons[status]}
              selected={selectedStatus.includes(status)}
              mode={"outlined"}
              onPress={() => toggleStatus(status)}
              style={
                selectedStatus.includes(status)
                  ? undefined
                  : styles.selectedChip
              }
            >
              {status}
            </Chip>
          ))}

          {Object.values(DifficultyLevelEnum).map((level) => (
            <Chip
              key={level}
              mode={"outlined"}
              onPress={() => toggleDifficultyLevel(level)}
              style={
                selectedDifficultyLevel.includes(level)
                  ? { borderColor: getColorForDifficulty(level) }
                  : styles.selectedChip
              }
            >
              {level}
            </Chip>
          ))}
        </View>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : filteredData.length !== 0 ? (
          filteredData?.map((elem) => <QuizItem key={elem.id} quiz={elem} />)
        ) : (
          <Title>Here is no Quizes</Title>
        )}
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 16,
    gap: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 8,
  },
  selectedChip: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuizList;
