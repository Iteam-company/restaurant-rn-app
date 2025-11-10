import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useFileSelect } from "@/modules/common/hooks/useFileSelect";
import { useGetQuizQuery } from "@/lib/redux/slices/quiz-api";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import * as yup from "yup";
import {
  useCreateManyQuestionsMutation,
  useGenerateQuestionsMutation,
} from "../../../../lib/redux/slices/question-api";
import QuestionElement from "./QuestionElement";
import {
  GenerateQuestionFormData,
  generateQuestionValidationSchema,
  initialFormData,
} from "./utils";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import FileUploader from "@/modules/common/components/FileUploader";
import { ICreateQuestionDTO } from "@/lib/redux/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const GenerateQuestion = () => {
  const { quizId } = useLocalSearchParams<{
    restaurantId: string;
    quizId: string;
  }>();
  const [formData, setFormData] =
    useState<GenerateQuestionFormData>(initialFormData);
  const [data, setData] = useState<ICreateQuestionDTO[] | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { colors } = useTheme();

  const [generateQuestion, { isLoading }] = useGenerateQuestionsMutation();

  const [createManyQuestion, { isLoading: isCreating }] =
    useCreateManyQuestionsMutation();

  const { data: quiz, isLoading: isLoadingQuiz } = useGetQuizQuery(quizId);

  const handleFileSelection = useCallback(
    (files: DocumentPicker.DocumentPickerAsset[]) => {
      setFormData((prev) => ({ ...prev, files }));
      setErrors((prev) => ({ ...prev, files: "" }));
    },
    []
  );

  const { handleFileSelect } = useFileSelect(handleFileSelection);

  const handleOnChange = useCallback(
    (question: ICreateQuestionDTO, index: number) => {
      setData((prev) => {
        if (!prev) return prev;
        const newData = [...prev];
        newData[index] = question;
        return newData;
      });
    },
    []
  );

  const handleOnDelete = useCallback((index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleRemoveFile = useCallback(
    (file: DocumentPicker.DocumentPickerAsset) => {
      setFormData((prev) => ({
        ...prev,
        files: prev.files.filter(
          (f) => !(f.name === file.name && f.size === file.size)
        ),
      }));
    },
    []
  );

  const handleFormChange = useCallback(
    (field: keyof GenerateQuestionFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(async () => {
    try {
      await generateQuestionValidationSchema.validate(formData, {
        abortEarly: false,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleGenerateQuestions = useCallback(async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const result = await generateQuestion({
        count: formData.count,
        prompt: formData.prompt,
        previousQuestions: formData.previousQuestions,
        files: formData.files,
      }).unwrap();
      setData(result);
    } catch (error) {
      console.error("Error generating questions:", error);
      toastErrorHandler(error as FetchBaseQueryError, {
        text2: "Failed to generate questions. Please try again.",
      });
    }
  }, [validateForm, formData, generateQuestion]);

  const handleCreateQuestions = useCallback(async () => {
    if (!data) return;

    try {
      await createManyQuestion(
        data.map((elem) => ({ ...elem, quizId: parseInt(quizId) }))
      );
      router.back();
    } catch (error) {
      console.error("Error creating questions:", error);
      toastErrorHandler(error as FetchBaseQueryError, {
        text2: "Failed to create questions. Please try again.",
      });
    }
  }, [data, createManyQuestion, quizId]);

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
          value={`${formData.count}`}
          onChangeText={(value) => {
            const numValue = parseInt(value);
            if (!isNaN(numValue) && numValue > 0) {
              handleFormChange("count", numValue);
            } else if (value === "") {
              handleFormChange("count", 0);
            }
          }}
          error={!!errors.count}
          keyboardType="numeric"
        />
        <HelperText
          type="error"
          visible={!!errors.count}
          style={{ display: !!errors.count ? "flex" : "none" }}
        >
          {errors.count}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Prompt (optional)"
          value={formData.prompt || ""}
          onChangeText={(value) => handleFormChange("prompt", value)}
          error={!!errors.prompt}
          multiline
          numberOfLines={3}
        />
        <HelperText
          type="error"
          visible={!!errors.prompt}
          style={{ display: !!errors.prompt ? "flex" : "none" }}
        >
          {errors.prompt}
        </HelperText>

        <FileUploader
          data={formData.files}
          onChange={handleFileSelect}
          onChipClick={handleRemoveFile}
          errors={errors.files}
        />

        <Button
          disabled={isLoading}
          mode="contained-tonal"
          onPress={handleGenerateQuestions}
          loading={isLoading}
        >
          Generate Questions
        </Button>
      </View>
      {data && !isLoading && (
        <View style={styles.container}>
          {data?.map((elem, index) => (
            <QuestionElement
              key={`question-${index}-${elem.text?.slice(0, 20)}`}
              question={elem}
              onChange={(value) => handleOnChange(value, index)}
              onDelete={() => handleOnDelete(index)}
            />
          ))}
          <Button
            mode="contained-tonal"
            onPress={handleCreateQuestions}
            loading={isCreating}
          >
            Create
          </Button>
        </View>
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
});

export default GenerateQuestion;
