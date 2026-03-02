import InformationDialog from "@/pages/Quiz/components/InformationDialog";
import { useGetQuestionsQuery } from "@/lib/redux/slices/question-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useTimer } from "react-timer-hook";
import { useCreateQuizResultMutation } from "../../../../lib/redux/slices/quiz-api";
import { toastErrorHandler } from "@/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

  const [isDialog, setIsDialog] = useState(false);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<
    {
      questionId: number;
      answers: number[];
    }[]
  >([]);
  const [value, setValue] = useState<number[]>([]);

  const addMinutes = (date: Date, minutes: number) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  };

  const { minutes, seconds } = useTimer({
    expiryTimestamp: addMinutes(new Date(), Number(timer)),
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
            pathname: "/user-dashboard/[id]/(quizResult)",
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
    return <Loader isLoading={true} />;

  const currentQuestion = questions?.find((_, i) => i === index);

  return (
    <ScrollView>
      <View style={[styles.timerContainer]}>
        <Text
          className={cn(
            "text-right text-2xl font-medium",
            minutes === 0 && seconds < 30
              ? "text-destructive"
              : "text-muted-foreground",
          )}
        >{`${minutes}:${seconds}`}</Text>
      </View>
      <View className="m-4 p-5 rounded-3xl gap-4 bg-card">
        <Text>{currentQuestion?.text}</Text>

        {currentQuestion?.multipleCorrect ? (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {currentQuestion?.variants.map((elem, i) => {
              const isChecked = value.includes(i);
              const handleToggle = () => {
                setValue((prev) =>
                  prev.includes(i) ? prev.filter((v) => v !== i) : [...prev, i],
                );
              };
              return (
                <View key={i}>
                  <Label className="flex-1 text-base">{elem}</Label>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleToggle}
                  />
                </View>
              );
            })}
          </View>
        ) : (
          <RadioGroup
            value={String(value)}
            onValueChange={(newValue) => setValue([Number(newValue)])}
          >
            {currentQuestion?.variants.map((elem, i) => (
              <View key={i}>
                <Label>{elem}</Label>
                <RadioGroupItem value={`${i}`} key={i}></RadioGroupItem>
              </View>
            ))}
          </RadioGroup>
        )}

        <Button
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
