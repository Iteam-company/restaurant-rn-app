import { statusIcons } from "@/modules/menu/components/MenuList/utils";
import {
  DifficultyLevelEnum,
  IQuizResultInfo,
  StatusEnum,
} from "@/modules/quiz/types";
import { router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Chip, Title } from "react-native-paper";

interface Props {
  quizResult: IQuizResultInfo;
}

export const QuizResultItem = ({ quizResult }: Props) => {
  const { id: restaurantId } = useGlobalSearchParams<{ id: string }>();

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

  return (
    <Card
      style={styles.container}
      onPress={() =>
        router.push({
          pathname:
            "/user-dashboard/[id]/(quiz)/(quizResult)/[quizResultId]/(quizResult)/quizResultDetails/quizResultDetails",
          params: { id: restaurantId, quizResultId: quizResult.id },
        })
      }
    >
      <Card.Content>
        <Title>{quizResult.quiz.title}</Title>
        <View style={styles.tagsContainer}>
          <Chip icon="trophy" mode="outlined">
            {quizResult?.score}
          </Chip>
          <Chip
            mode="outlined"
            style={[
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
          >
            {quizResult?.quiz.status || "Active"}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  tagsContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
});

export default QuizResultItem;
