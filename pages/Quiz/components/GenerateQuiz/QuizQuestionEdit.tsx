import QuestionElement from "@/pages/Question/components/GenerateQuestion/QuestionElement";
import { useFormik } from "formik";
import { FC, useCallback, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import {
  difficultyLevelItem,
  GenerateQuizInitialValuesType,
  QuizInitialValuesType,
  QuizSchema,
  statusItem,
} from "./utils";
import { useGenerateQuestionsMutation } from "@/lib/redux/slices/question-api";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateQuizMutation } from "../../../../lib/redux/slices/quiz-api";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import {
  DifficultyLevelEnum,
  ICreateQuestionDTO,
  StatusEnum,
} from "@/lib/redux/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@rn-primitives/dropdown-menu/dist/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Props = {
  valuesForGeneratingQuestion: GenerateQuizInitialValuesType;
  initialValues: QuizInitialValuesType;
};

const QuizQuestionEdit: FC<Props> = ({
  valuesForGeneratingQuestion,
  initialValues,
}) => {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const insets = useSafeAreaInsets();
  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

  const [generateMoreQuestion, { isLoading: isGeneratingQuestion }] =
    useGenerateQuestionsMutation();

  const [questions, setQuestions] = useState<ICreateQuestionDTO[]>(
    initialValues.questions,
  );

  const handleGenerateMoreQuestions = useCallback(async () => {
    try {
      const gQuestions = await generateMoreQuestion({
        ...valuesForGeneratingQuestion,
        previousQuestions: questions,
      }).unwrap();

      setQuestions((prev) => [...prev, ...gQuestions]);
    } catch {
      Toast.show({ text1: "Generation error, try again!", type: "error" });
    }
  }, [
    setQuestions,
    generateMoreQuestion,
    valuesForGeneratingQuestion,
    questions,
  ]);

  const {
    values,
    setValues,
    errors,
    handleSubmit: submitQuiz,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      try {
        const { data } = await createQuiz({
          ...values,
          questions,
          restaurantId: parseInt(restaurantId),
        });

        if (data) {
          router.replace({
            pathname: "/admin-dashboard/[id]/(quiz)/[quizId]/(questions)",
            params: { id: restaurantId, quizId: data?.id || 0 },
          });
        } else {
          router.replace({
            pathname: "/admin-dashboard/[id]/(quiz)",
            params: { id: restaurantId },
          });
        }
      } catch (e) {
        toastErrorHandler(e as FetchBaseQueryError);
      }
    },
    validationSchema: QuizSchema,
  });

  const handleQuestionChange = useCallback(
    (question: ICreateQuestionDTO, index: number) => {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[index] = question;
        return newQuestions;
      });
    },
    [setQuestions],
  );

  const handleQuestionDelete = useCallback(
    (index: number) => {
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    },
    [setQuestions],
  );

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      <View className="p-4 gap-6">
        <View className="gap-2">
          <Text className="text-2xl font-bold text-foreground">Quiz Info</Text>
          <Text className="text-muted-foreground">
            Review and edit the generated quiz details below.
          </Text>

          <Card>
            <CardContent className="p-4 gap-4">
              <View className="gap-1.5">
                <Label nativeID="title-input">Title</Label>
                <Input
                  accessibilityLabel="Title"
                  placeholder="Enter quiz title"
                  value={values.title}
                  onChangeText={(value) =>
                    setValues((prev) => ({ ...prev, title: value }))
                  }
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <Text className="text-sm text-destructive">
                    {errors.title}
                  </Text>
                )}
              </View>

              <View className="gap-1.5">
                <Label>Difficulty Level</Label>
                <Select
                  value={{
                    value: values.difficultyLevel,
                    label: values.difficultyLevel,
                  }}
                  onValueChange={(option) =>
                    option &&
                    setValues((prev) => ({
                      ...prev,
                      difficultyLevel: option.value as DifficultyLevelEnum,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevelItem.map((item) => (
                      <SelectItem
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </View>

              <View className="gap-1.5">
                <Label>Status</Label>
                <Select
                  value={{ value: values.status, label: values.status }}
                  onValueChange={(option) =>
                    option &&
                    setValues((prev) => ({
                      ...prev,
                      status: option.value as StatusEnum,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusItem.map((item) => (
                      <SelectItem
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SelectContent>
                </Select>
              </View>

              <View className="gap-1.5">
                <Label>Time limit (minutes)</Label>
                <Input
                  keyboardType="numeric"
                  placeholder="e.g. 30"
                  value={values.timeLimit.toString()}
                  onChangeText={(text) =>
                    setValues((prev) => ({
                      ...prev,
                      timeLimit: parseInt(text) || 0,
                    }))
                  }
                  className={errors.timeLimit ? "border-destructive" : ""}
                />
                {errors.timeLimit && (
                  <Text className="text-sm text-destructive">
                    {errors.timeLimit}
                  </Text>
                )}
              </View>
            </CardContent>
          </Card>
        </View>

        <View className="gap-2">
          <Text className="text-2xl font-bold text-foreground">
            Generated Questions
          </Text>
          <Text className="text-muted-foreground">
            Review, edit or delete generated questions.
          </Text>

          <View className="gap-4 mt-2">
            {questions.map((question, index) => (
              <View key={`question-wrap-${index}`}>
                <QuestionElement
                  key={`question-${index}-${question?.text?.slice(0, 10)}`}
                  disabled={isCreatingQuiz || isGeneratingQuestion}
                  question={question}
                  onChange={(value) => handleQuestionChange(value, index)}
                  onDelete={() => handleQuestionDelete(index)}
                />
                {index !== questions.length - 1 && <View className="h-2" />}
              </View>
            ))}
          </View>
        </View>

        <View className="gap-3 mt-4">
          <Button
            variant="secondary"
            disabled={isCreatingQuiz || isGeneratingQuestion}
            onPress={() => handleGenerateMoreQuestions()}
            className="flex-row gap-2"
          >
            {isGeneratingQuestion && (
              <ActivityIndicator color="black" size="small" />
            )}
            <Text>Generate More Questions</Text>
          </Button>

          <Button
            disabled={isCreatingQuiz || isGeneratingQuestion}
            onPress={() => submitQuiz()}
            className="flex-row gap-2"
          >
            {isCreatingQuiz && <ActivityIndicator color="white" size="small" />}
            <Text>Create Quiz</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuizQuestionEdit;
