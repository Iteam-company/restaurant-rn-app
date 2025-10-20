import { statusIcons } from "@/modules/common/utils/menuUtils";
import { useGetQuizResultQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { DifficultyLevelEnum, StatusEnum } from "@/modules/quiz/types";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
  Title,
  useTheme,
} from "react-native-paper";

interface QuizResultDetailsProps {
  // Add your props here
}

export const QuizResultDetails: React.FC<QuizResultDetailsProps> = () => {
  const { quizResultId } = useGlobalSearchParams<{
    id: string;
    quizResultId: string;
  }>();
  const { colors } = useTheme();

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

  const { data: quizResult, isLoading } = useGetQuizResultQuery(quizResultId);

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Title>{quizResult?.quiz.title}</Title>
        <View style={styles.detailsContainer}>
          <Chip icon="trophy" mode="outlined">
            {quizResult?.score}
          </Chip>
          <Chip
            mode="outlined"
            style={[
              styles.chip,
              {
                borderColor: getColorForDifficulty(
                  quizResult?.quiz.difficultyLevel || DifficultyLevelEnum.EASY
                ),
              },
            ]}
          >
            {quizResult?.quiz.difficultyLevel}
          </Chip>
          <Chip
            icon={
              statusIcons[quizResult?.quiz.status || StatusEnum.NOT_STARTED]
            }
            mode="outlined"
            style={styles.chip}
          >
            {quizResult?.quiz.status || "Active"}
          </Chip>
        </View>
        <Button mode="outlined" onPress={() => router.back()}>
          Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 24,
    gap: 10,
  },
  detailsContainer: {
    gap: 7,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
  },
});

export default QuizResultDetails;
