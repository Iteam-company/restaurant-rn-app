import QuestionElement from "@/modules/questions/components/GenerateQuestion/QuestionElement";
import { useFormik } from "formik";
import { FC, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  HelperText,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import {
  difficultyLevelItem,
  GenerateQuizInitialValuesType,
  QuizInitialValuesType,
  QuizSchema,
  statusItem,
} from "./utils";
import { useGenerateQuestionsMutation } from "@/modules/questions/redux/slices/question-api";
import { ICreateQuestionDTO } from "@/modules/questions/types";
import Toast from "react-native-toast-message";
import { DifficultyLevelEnum, StatusEnum } from "../../types";
import { router, useLocalSearchParams } from "expo-router";
import { useCreateQuizMutation } from "../../redux/slices/quiz-api";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { ErrorResponseType } from "@/modules/common/types";

type Props = {
  valuesForGeneratingQuestion: GenerateQuizInitialValuesType;
  initialValues: QuizInitialValuesType;
};

const QuizQuestionEdit: FC<Props> = ({
  valuesForGeneratingQuestion,
  initialValues,
}) => {
  const { colors } = useTheme();
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

  const [generateMoreQuestion, { isLoading: isGeneratingQuestion }] =
    useGenerateQuestionsMutation();

  const [questions, setQuestions] = useState<ICreateQuestionDTO[]>(
    initialValues.questions
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
            pathname: "/restaurant/[id]/(quiz)/[quizId]/(questions)",
            params: { id: restaurantId, quizId: data?.id || 0 },
          });
        } else {
          router.replace({
            pathname: "/restaurant/[id]/(quiz)",
            params: { id: restaurantId },
          });
        }
      } catch (e) {
        toastErrorHandler(e as ErrorResponseType);
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
    [setQuestions]
  );

  const handleQuestionDelete = useCallback(
    (index: number) => {
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    },
    [setQuestions]
  );

  return (
    <>
      <Title>Quiz Info</Title>
      <Text
        variant="bodyMedium"
        style={{ marginVertical: 8, color: colors.secondary }}
      >
        Review and edit the generated quiz details below. You can modify the
        title, difficulty, time limit, or status before creating it.
      </Text>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            padding: 16,
            gap: 8,
          },
        ]}
      >
        <TextInput
          mode="outlined"
          label="Title"
          value={values.title}
          onChangeText={(value) =>
            setValues((prev) => ({ ...prev, title: value }))
          }
          error={!!errors.title}
          left={<TextInput.Icon icon="pencil" />}
          multiline
        />
        <HelperText
          style={{ display: errors.title ? "contents" : "none" }}
          type="error"
          visible={!!errors.title}
        >
          {errors.title}
        </HelperText>

        <Dropdown
          label="Difficulty Level"
          mode="outlined"
          value={values.difficultyLevel}
          options={difficultyLevelItem}
          onSelect={(value) =>
            setValues((prev) => ({
              ...prev,
              difficultyLevel: value as DifficultyLevelEnum,
            }))
          }
        />

        <Dropdown
          label="Status"
          mode="outlined"
          value={values.status}
          options={statusItem}
          onSelect={(value) =>
            setValues((prev) => ({ ...prev, status: value as StatusEnum }))
          }
        />

        <TextInput
          mode="outlined"
          label="Time limit (minutes)"
          keyboardType="numeric"
          value={`${values.timeLimit}`}
          onChangeText={(text) =>
            setValues((prev) => ({
              ...prev,
              timeLimit: parseInt(text) || 0,
            }))
          }
          error={!!errors.timeLimit}
          left={<TextInput.Icon icon="timer" />}
        />
        <HelperText
          style={{ display: errors.title ? "contents" : "none" }}
          type="error"
          visible={!!errors.timeLimit}
        >
          {errors.timeLimit}
        </HelperText>
      </View>

      <View style={styles.container}>
        <Title style={{ marginBottom: 8 }}>Generated Questions</Title>
        <Text
          variant="bodyMedium"
          style={{ marginVertical: 8, color: colors.secondary }}
        >
          Review and edit the generated questions below. You can modify the
          text, variants, or correct answers. Delete any questions you
          don&apos;t want to include.
        </Text>
        {questions.map((question, index) => (
          <View key={`question-wrap-${index}`}>
            <QuestionElement
              key={`question-${index}-${question?.text?.slice(0, 20)}`}
              disabled={isCreatingQuiz || isGeneratingQuestion}
              question={question}
              onChange={(value) => handleQuestionChange(value, index)}
              onDelete={() => handleQuestionDelete(index)}
            />
            {index !== values.questions.length - 1 && (
              <Divider style={{ marginVertical: 8 }} />
            )}
          </View>
        ))}
      </View>

      <View style={styles.container}>
        <Button
          disabled={isCreatingQuiz || isGeneratingQuestion}
          mode="contained-tonal"
          onPress={() => handleGenerateMoreQuestions()}
          loading={isGeneratingQuestion}
        >
          Generate More Questions
        </Button>
        <Button
          disabled={isCreatingQuiz || isGeneratingQuestion}
          mode="contained-tonal"
          onPress={() => submitQuiz()}
          loading={isCreatingQuiz}
        >
          Create Quiz
        </Button>
      </View>
    </>
  );
};

export default QuizQuestionEdit;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    borderRadius: 24,
    gap: 8,
  },
});
