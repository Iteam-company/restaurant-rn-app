import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useCreateManyQuestionsMutation,
  useGenerateQuestionsMutation,
} from "../../redux/slices/question-api";
import { useGetQuizQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import QuestionItem from "../QuestionItem.tsx/QuestionItem";
import QuestionElement from "./QuestionElement";
import { ICreateQuestionDTO, IQuestionInfo } from "../../types";

const GenerateQuestion = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState<string>("");
  const [data, setData] = useState<ICreateQuestionDTO[] | undefined>(undefined);
  const { colors } = useTheme();

  const [generateQuestion, { isLoading }] = useGenerateQuestionsMutation();

  const [createManyQuestion, { isLoading: isCreating }] =
    useCreateManyQuestionsMutation();

  const { data: quiz, isLoading: isLoadingQuiz } = useGetQuizQuery(quizId);

  const handleOnChange = (question: ICreateQuestionDTO, index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const newData = [...prev];
      newData[index] = question;
      return newData;
    });
  };

  if (isLoadingQuiz || !quiz)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView
      style={[
        { width: "100%", paddingHorizontal: 10 },
        getScrollViewUiSettings(insets),
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            padding: 16,
          },
        ]}
      >
        <Title>Generate Questions</Title>
        <TextInput
          mode="outlined"
          label="Question count"
          value={`${count}`}
          onChangeText={(value) =>
            setCount((prev) => (parseInt(value) || value === "" ? value : prev))
          }
        />
        <Button
          disabled={isLoading}
          mode="contained-tonal"
          onPress={async () =>
            await setData(
              await generateQuestion({
                menuId: quiz.menu.id,
                count: parseInt(count) > 0 ? parseInt(count) : 10,
              }).unwrap()
            )
          }
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Generate Questions"
          )}
        </Button>
      </View>
      {data && !isLoading ? (
        <>
          <View style={styles.container}>
            {data?.map((elem, index) => (
              <QuestionElement
                key={index}
                question={elem}
                onChange={(value) => handleOnChange(value, index)}
              />
            ))}
            <Button
              mode="contained-tonal"
              onPress={async () => {
                const result = data;

                await createManyQuestion(
                  result.map((elem) => ({ ...elem, quizId: parseInt(quizId) }))
                );
                router.back();
              }}
            >
              {isCreating ? (
                <ActivityIndicator animating={true} color={"#7c8ebf"} />
              ) : (
                "Create"
              )}
            </Button>
          </View>
        </>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    borderRadius: 24,
    gap: 16,
  },
});

export default GenerateQuestion;
