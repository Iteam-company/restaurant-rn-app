import InformationDialog from "@/modules/common/components/InformationDialog";
import { useGetQuestionsQuery } from "@/lib/redux/slices/question-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  RadioButton,
  Title,
  useTheme,
} from "react-native-paper";
import { useTimer } from "react-timer-hook";
import { useCreateQuizResultMutation } from "../../../../lib/redux/slices/quiz-api";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const TakeQuiz = () => {
  const {
    id: restaurantId,
    quizId,
    timer,
  } = useGlobalSearchParams<{
    id: string;
    quizId: string;
    timer: string;
  }>();
  const { colors } = useTheme();

  const [isDialog, setIsDialog] = useState(false);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<
    {
      questionId: number;
      answers: number[];
    }[]
  >([]);
  const [value, setValue] = useState<number[]>([]);

  const addMintes = (date: Date, minutes: number) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  };

  const { minutes, seconds } = useTimer({
    expiryTimestamp: addMintes(new Date(), Number(timer)),
    onExpire: () => setIsDialog(true),
  });

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
              "/user-dashboard/[id]/(quizResult)/[quizResultId]/(quizResult)/quizResultDetails/quizResultDetails",
            params: { id: restaurantId, quizResultId: quizResult.id },
          });
        })
        .catch((error) => {
          console.log(error);
          toastErrorHandler(error as FetchBaseQueryError, {
            text2: "Something went wrong, try to take quiz again!",
          });
        });
    }
  }, [createQuizResult, index, questions, quizId, restaurantId, result]);

  if (isLoadingQuestions || isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  const currentQuestion = questions?.find((_, i) => i === index);

  return (
    <ScrollView>
      <View style={[styles.timerContainer]}>
        <Text
          style={[
            styles.timerText,
            {
              color:
                minutes === 0 && seconds < 30 ? colors.error : colors.secondary,
            },
          ]}
        >{`${minutes}:${seconds}`}</Text>
      </View>
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
                  key={i}
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
      <InformationDialog
        title="Time is Out"
        message="You'll be redirected to the quiz page."
        onClose={() => {
          router.back();
        }}
        visible={isDialog}
      />
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

  timerContainer: {
    marginTop: 16,
    marginRight: 30,
  },
  timerText: {
    textAlign: "right",
    fontSize: 24,
  },
});

export default TakeQuiz;
