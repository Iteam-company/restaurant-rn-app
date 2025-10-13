import { statusIcons } from "@/modules/common/utils/menuUtils";
import { useGetQuestionsQuery } from "@/modules/questions/redux/slices/question-api";
import { router, useGlobalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Title,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetQuizQuery } from "../../redux/slices/quiz-api";
import { DifficultyLevelEnum, StatusEnum } from "../../types";

export const QuizDetails = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { data: quiz, isLoading: isLoadingQuiz } = useGetQuizQuery(quizId);
  const { data: questions, isLoading: isLoadingQuestions } =
    useGetQuestionsQuery(quizId);

  const insets = useSafeAreaInsets();

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

  if (isLoadingQuiz || isLoadingQuestions)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <Card.Content>
            <Title>{quiz?.title}</Title>
            <View style={styles.detailsContainer}>
              <Chip
                icon="help-circle-outline"
                mode="outlined"
                style={styles.chip}
              >
                {questions?.length} Questions
              </Chip>
              <Chip icon="clock" mode="outlined" style={styles.chip}>
                Time: {quiz?.timeLimit}
              </Chip>
              <Chip
                mode="outlined"
                style={[
                  styles.chip,
                  {
                    borderColor: getColorForDifficulty(
                      quiz?.difficultyLevel || DifficultyLevelEnum.EASY
                    ),
                  },
                ]}
              >
                {quiz?.difficultyLevel}
              </Chip>
              <Chip
                icon={statusIcons[quiz?.status || StatusEnum.NOT_STARTED]}
                mode="outlined"
                style={styles.chip}
              >
                {quiz?.status || "Active"}
              </Chip>
            </View>
          </Card.Content>
        </Card>
        <Button
          mode="elevated"
          disabled={quiz?.status !== StatusEnum.IN_PROGRESS}
          onPress={() =>
            router.push({
              pathname:
                "/user-dashboard/[id]/(quiz)/[quizId]/(take-quiz)/(takeQuiz)/[timer]/takeQuiz",
              params: { id: restaurantId, quizId, timer: `${quiz?.timeLimit}` },
            })
          }
        >
          {quiz?.status === StatusEnum.IN_PROGRESS
            ? "Start"
            : "This quiz is not started or already completed"}
        </Button>
        <Button mode="outlined" onPress={() => router.back()}>
          Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    gap: 10,
  },
  contentContainer: {
    paddingVertical: 16,
    gap: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 8,
  },
  chip: {
    marginRight: 8,
  },
});

export default QuizDetails;
