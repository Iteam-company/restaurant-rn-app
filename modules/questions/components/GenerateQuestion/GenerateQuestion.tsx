import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useGetQuizQuery } from "@/modules/quiz/redux/slices/quiz-api";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import {
  useCreateManyQuestionsMutation,
  useGenerateQuestionsMutation,
} from "../../redux/slices/question-api";
import { ICreateQuestionDTO } from "../../types";
import QuestionElement from "./QuestionElement";

const GenerateQuestion = () => {
  const { quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();
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
  const handleOnDelete = (elem: ICreateQuestionDTO) => {
    setData((prev) =>
      prev ? prev.filter((item) => item.text !== elem.text) : prev
    );
  };

  if (isLoadingQuiz || !quiz)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView style={[{ width: "100%", paddingHorizontal: 10 }]}>
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
                onDelete={() => handleOnDelete(elem)}
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
      <TabBarOffset />
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
