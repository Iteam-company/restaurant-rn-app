import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { useFileSelect } from "@/modules/common/hooks/useFileSelect";
import { ErrorResponseType } from "@/modules/common/types";
import QuestionElement from "@/modules/questions/components/GenerateQuestion/QuestionElement";
import { useCreateManyQuestionsMutation } from "@/modules/questions/redux/slices/question-api";
import { ICreateQuestionDTO } from "@/modules/questions/types";
import {
  useCreateQuizMutation,
  useGenerateQuizzesMutation,
} from "@/modules/quiz/redux/slices/quiz-api";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  HelperText,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import * as yup from "yup";
import { DifficultyLevelEnum, StatusEnum } from "../../types";
import {
  difficultyLevelItem,
  statusItem,
  step1ValidationSchema,
} from "./utils";

interface FormData {
  title: string;
  difficultyLevel: DifficultyLevelEnum;
  timeLimit: number;
  status: StatusEnum;
  files: DocumentPicker.DocumentPickerAsset[];
  prompt?: string;
}

const GenerateQuiz = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    difficultyLevel: DifficultyLevelEnum.EASY,
    timeLimit: 30,
    status: StatusEnum.NOT_STARTED,
    files: [],
    prompt: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generatedQuestions, setGeneratedQuestions] = useState<
    ICreateQuestionDTO[]
  >([]);
  const { colors } = useTheme();

  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();

  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();
  const [generateQuizzes, { isLoading: isGeneratingQuizzes }] =
    useGenerateQuizzesMutation();
  const [createManyQuestion, { isLoading: isCreatingQuestions }] =
    useCreateManyQuestionsMutation();

  const handleFileSelection = useCallback(
    (files: DocumentPicker.DocumentPickerAsset[]) => {
      setFormData((prev) => ({ ...prev, files }));
      setFormErrors((prev) => ({ ...prev, files: "" }));
    },
    []
  );

  const { handleFileSelect } = useFileSelect(handleFileSelection);

  const handleFormChange = useCallback(
    (field: keyof FormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [formErrors]
  );

  const validateForm = useCallback(async () => {
    try {
      await step1ValidationSchema.validate(formData, {
        abortEarly: false,
      });
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setFormErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleGenerate = useCallback(async () => {
    if (formData.files.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        files: "Please upload at least one file to generate quiz",
      }));
      return;
    }

    try {
      const generatedQuiz = await generateQuizzes({
        prompt: formData.prompt || "Create a restaurant management quiz",
        files: formData.files,
      }).unwrap();

      setFormData((prev) => ({
        ...prev,
        title: generatedQuiz.title || prev.title,
        difficultyLevel:
          (generatedQuiz.difficultyLevel as DifficultyLevelEnum) ||
          prev.difficultyLevel,
        timeLimit: generatedQuiz.timeLimit || prev.timeLimit,
        status: (generatedQuiz.status as StatusEnum) || prev.status,
      }));

      setFormErrors({});

      const questions = (generatedQuiz.questions || []).map((q: any) => ({
        quizId: 0, // Temp id
        text: q.text,
        variants: q.variants,
        correct: q.correct,
        multipleCorrect:
          q.multipleCorrect ||
          (Array.isArray(q.correct) && q.correct.length > 1),
      }));

      setGeneratedQuestions(questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
      toastErrorHandler(error as ErrorResponseType, {
        text2: "Failed to generate quiz. Please try again.",
      });
    }
  }, [formData, generateQuizzes]);

  const handleCreateQuiz = useCallback(async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    if (generatedQuestions.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        general: "Please generate questions before creating quiz",
      }));
      return;
    }

    try {
      const createdQuiz = await createQuiz({
        ...formData,
        restaurantId: restaurantId ? parseInt(restaurantId) : undefined,
      } as any).unwrap();

      await createManyQuestion(
        generatedQuestions.map((q) => ({
          ...q,
          quizId: createdQuiz.id,
        }))
      );

      router.back();
    } catch (error) {
      console.error("Error creating quiz:", error);
      toastErrorHandler(error as ErrorResponseType, {
        text2: "Failed to create quiz. Please try again.",
      });
    }
  }, [
    validateForm,
    formData,
    restaurantId,
    createQuiz,
    generatedQuestions,
    createManyQuestion,
  ]);

  const handleRemoveFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  }, []);

  const handleQuestionChange = useCallback(
    (question: ICreateQuestionDTO, index: number) => {
      setGeneratedQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[index] = question;
        return newQuestions;
      });
    },
    []
  );

  const handleQuestionDelete = useCallback((index: number) => {
    setGeneratedQuestions((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
        <Title>Create Quiz</Title>

        <Card style={styles.fileCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.fileTitle}>
              Upload Files (Required)
            </Text>
            <Text variant="bodySmall" style={styles.fileSubtitle}>
              Upload PDF, DOC, DOCX, or image files
            </Text>

            <Button
              mode="outlined"
              onPress={handleFileSelect}
              style={styles.uploadButton}
              icon="upload"
            >
              Select Files
            </Button>

            {formData.files.length > 0 && (
              <View style={styles.fileList}>
                {formData.files.map((file, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onClose={() => handleRemoveFile(index)}
                    style={styles.fileChip}
                  >
                    {file.name}
                  </Chip>
                ))}
              </View>
            )}

            <HelperText type="error" visible={!!formErrors.files}>
              {formErrors.files}
            </HelperText>
          </Card.Content>
        </Card>

        <TextInput
          mode="outlined"
          label="Prompt (optional)"
          value={formData.prompt || ""}
          onChangeText={(value) => handleFormChange("prompt", value)}
          error={!!formErrors.prompt}
          multiline
          numberOfLines={3}
        />
        <HelperText type="error" visible={!!formErrors.prompt}>
          {formErrors.prompt}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Title"
          value={formData.title}
          onChangeText={(value) => handleFormChange("title", value)}
          error={!!formErrors.title}
          left={<TextInput.Icon icon="pencil" />}
        />
        <HelperText type="error" visible={!!formErrors.title}>
          {formErrors.title}
        </HelperText>

        <Dropdown
          label="Difficulty Level"
          mode="outlined"
          value={formData.difficultyLevel}
          options={difficultyLevelItem}
          onSelect={(value) => handleFormChange("difficultyLevel", value)}
        />

        <Dropdown
          label="Status"
          mode="outlined"
          value={formData.status}
          options={statusItem}
          onSelect={(value) => handleFormChange("status", value)}
        />

        <TextInput
          mode="outlined"
          label="Time limit (minutes)"
          keyboardType="numeric"
          value={`${formData.timeLimit}`}
          onChangeText={(text) =>
            handleFormChange("timeLimit", parseInt(text) || 0)
          }
          error={!!formErrors.timeLimit}
          left={<TextInput.Icon icon="timer" />}
        />
        <HelperText type="error" visible={!!formErrors.timeLimit}>
          {formErrors.timeLimit}
        </HelperText>

        {formErrors.general && (
          <HelperText type="error" visible={!!formErrors.general}>
            {formErrors.general}
          </HelperText>
        )}

        <Button
          disabled={isGeneratingQuizzes}
          mode="outlined"
          onPress={handleGenerate}
          loading={isGeneratingQuizzes}
          icon="auto-fix"
          style={{ marginBottom: 8 }}
        >
          Generate with AI
        </Button>

        <Divider />

        {generatedQuestions.length > 0 && (
          <View style={styles.container}>
            <Title style={{ marginBottom: 8 }}>Generated Questions</Title>
            <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
              Review and edit the generated questions below. You can modify the
              text, variants, or correct answers. Delete any questions you
              don&apos;t want to include.
            </Text>
            {generatedQuestions.map((question, index) => (
              <View key={`question-wrap-${index}`}>
                <QuestionElement
                  key={`question-${index}-${question.text?.slice(0, 20)}`}
                  question={question}
                  onChange={(value) => handleQuestionChange(value, index)}
                  onDelete={() => handleQuestionDelete(index)}
                />
                {index !== generatedQuestions.length - 1 && (
                  <Divider style={{ marginVertical: 8 }} />
                )}
              </View>
            ))}
          </View>
        )}

        <Button
          disabled={
            isCreatingQuiz ||
            isCreatingQuestions ||
            generatedQuestions.length === 0
          }
          mode="contained-tonal"
          onPress={handleCreateQuiz}
          loading={isCreatingQuiz || isCreatingQuestions}
        >
          Create Quiz
        </Button>
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 16,
    borderRadius: 24,
    gap: 8,
  },
  fileCard: {
    marginVertical: 8,
  },
  fileTitle: {
    marginBottom: 4,
  },
  fileSubtitle: {
    marginBottom: 16,
    opacity: 0.7,
  },
  uploadButton: {
    marginBottom: 16,
  },
  fileList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  fileChip: {
    marginBottom: 8,
  },
  questionCard: {
    width: "100%",
    borderRadius: 24,
    padding: 16,
    gap: 16,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerTitle: {
    width: "85%",
  },
});

export default GenerateQuiz;
