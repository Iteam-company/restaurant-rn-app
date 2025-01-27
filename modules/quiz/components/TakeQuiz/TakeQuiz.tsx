import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useCreateQuizResultMutation,
  useGetQuizQuery,
} from "../../redux/slices/quiz-api";
import { useGetQuestionsQuery } from "@/modules/questions/redux/slices/question-api";
import { router, useGlobalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  RadioButton,
  Title,
  useTheme,
} from "react-native-paper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setIn } from "formik";

const TakeQuiz = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<
    {
      questionId: number;
      answers: number[];
    }[]
  >([]);
  const [value, setValue] = useState<number[]>([]);

  const { data: questions, isLoading: isLoadingQuestions } =
    useGetQuestionsQuery(quizId);

  const [createQuizResult, { isLoading }] = useCreateQuizResultMutation();

  useEffect(() => {
    if (questions && index === questions.length) {
      createQuizResult({
        quizId: Number(quizId),
        answers: result,
      })
        .unwrap()
        .then((quizResult) => {
          router.push({
            pathname:
              "/user-dashboard/[id]/(quiz)/(quizResult)/[quizResultId]/(quizResult)/quizResultDetails/quizResultDetails",
            params: { id: restaurantId, quizResultId: quizResult.id },
          });
        })
        .catch(console.log);
    }
  }, [result]);

  if (isLoadingQuestions || isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  const currentQuestion = questions?.find((_, i) => i === index);

  return (
    <ScrollView style={getScrollViewUiSettings(insets)}>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <Title>{currentQuestion?.text}</Title>

        {currentQuestion?.multipleCorrect ? (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {currentQuestion?.variants.map((elem, i) => (
              <Checkbox.Item
                key={i}
                label={elem}
                status={value.includes(i) ? "checked" : "unchecked"}
                onPress={() =>
                  setValue((prev) =>
                    prev.includes(i)
                      ? prev.filter((v) => v !== i)
                      : [...prev, i]
                  )
                }
                style={{ width: "100%" }}
              />
            ))}
          </View>
        ) : (
          <RadioButton.Group
            value={String(value)}
            onValueChange={(newValue) => setValue([Number(newValue)])}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              {currentQuestion?.variants.map((elem, i) => (
                <RadioButton.Item
                  label={elem}
                  value={`${i}`}
                  style={{ width: "100%" }}
                />
              ))}
            </View>
          </RadioButton.Group>
        )}

        <Button
          mode="contained-tonal"
          onPress={() => {
            setIndex(index + 1);
            setResult((prev) => [
              ...prev,
              {
                questionId: currentQuestion ? currentQuestion.id : 0,
                answers: value,
              },
            ]);
            setValue([]);
          }}
        >
          {questions && index === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 24,
    gap: 10,
  },
});

export default TakeQuiz;
