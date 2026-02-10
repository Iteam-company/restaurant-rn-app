import { useGetQuestionsQuery } from "@/lib/redux/slices/question-api";
import { router, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useGetQuizQuery } from "../../../../lib/redux/slices/quiz-api";
import { DifficultyLevelEnum, StatusEnum } from "@/lib/redux/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Activity, Clock, HelpCircle } from "lucide-react-native";
import { Button } from "@/components/ui/button";

export const QuizDetails = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { data: quiz, isLoading: isLoadingQuiz } = useGetQuizQuery(quizId);
  const { data: questions, isLoading: isLoadingQuestions } =
    useGetQuestionsQuery(quizId);

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
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">{quiz?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row flex-wrap gap-2">
              <Badge
                variant="outline"
                className="flex-row items-center gap-1.5 py-1.5 px-3"
              >
                <HelpCircle size={16} className="text-foreground" />
                <Text className="text-sm font-medium">
                  {questions?.length} Questions
                </Text>
              </Badge>
              <Badge
                variant="outline"
                className="flex-row items-center gap-1.5 py-1.5 px-3"
              >
                <Clock size={16} className="text-foreground" />
                <Text className="text-sm font-medium">
                  Time: {quiz?.timeLimit}
                </Text>
              </Badge>
              <Badge
                variant="outline"
                className="flex-row items-center gap-1.5 py-1.5 px-3"
                style={{
                  borderColor: getColorForDifficulty(
                    quiz?.difficultyLevel || DifficultyLevelEnum.EASY,
                  ),
                }}
              >
                <Text
                  className="text-sm font-medium uppercase"
                  style={{
                    color: getColorForDifficulty(
                      quiz?.difficultyLevel || DifficultyLevelEnum.EASY,
                    ),
                  }}
                >
                  {quiz?.difficultyLevel}
                </Text>
              </Badge>
              <Badge
                variant="outline"
                className="flex-row items-center gap-1.5 py-1.5 px-3"
              >
                <Activity size={16} className="text-foreground" />
                <Text className="text-sm font-medium capitalize">
                  {quiz?.status || "Active"}
                </Text>
              </Badge>
            </View>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          size="lg"
          disabled={quiz?.status !== StatusEnum.IN_PROGRESS}
          onPress={() =>
            router.push({
              pathname:
                "/user-dashboard/[id]/(quiz)/[quizId]/(take-quiz)/(takeQuiz)/[timer]/takeQuiz",
              params: { id: restaurantId, quizId, timer: `${quiz?.timeLimit}` },
            })
          }
        >
          <Text>
            {quiz?.status === StatusEnum.IN_PROGRESS
              ? "Start"
              : "This quiz is not started or already completed"}
          </Text>
        </Button>
        <Button
          className="w-full"
          size="lg"
          variant="outline"
          onPress={() => router.back()}
        >
          <Text>Back</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default QuizDetails;
