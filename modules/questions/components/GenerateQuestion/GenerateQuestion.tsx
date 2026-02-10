import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useFileSelect } from "@/modules/common/hooks/useFileSelect";
import { useGetQuizQuery } from "@/lib/redux/slices/quiz-api";
import * as DocumentPicker from "expo-document-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
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
import Loader from "@/components/loader";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const GenerateQuestion = () => {
  const { quizId } = useLocalSearchParams<{
    restaurantId: string;
    quizId: string;
  }>();
  const [formData, setFormData] =
    useState<GenerateQuestionFormData>(initialFormData);
  const [data, setData] = useState<ICreateQuestionDTO[] | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [generateQuestion, { isLoading }] = useGenerateQuestionsMutation();

  const [createManyQuestion, { isLoading: isCreating }] =
    useCreateManyQuestionsMutation();

  const { data: quiz, isLoading: isLoadingQuiz } = useGetQuizQuery(quizId);

  const handleFileSelection = useCallback(
    (files: DocumentPicker.DocumentPickerAsset[]) => {
      setFormData((prev) => ({ ...prev, files }));
      setErrors((prev) => ({ ...prev, files: "" }));
    },
    [],
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
    [],
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
          (f) => !(f.name === file.name && f.size === file.size),
        ),
      }));
    },
    [],
  );

  const handleFormChange = useCallback(
    (field: keyof GenerateQuestionFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors],
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
        data.map((elem) => ({ ...elem, quizId: parseInt(quizId) })),
      );
      router.back();
    } catch (error) {
      console.error("Error creating questions:", error);
      toastErrorHandler(error as FetchBaseQueryError, {
        text2: "Failed to create questions. Please try again.",
      });
    }
  }, [data, createManyQuestion, quizId]);

  if (isLoadingQuiz || !quiz) return <Loader isLoading={true} />;

  return (
    <ScrollView
      className="w-full bg-background px-2"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card>
        {/* container: {
    width: "100%",
    marginVertical: 16,
    borderRadius: 24,
    gap: 8,
  }, */}
        <View className="p-4 w-full my-4 rounded-3xl gap-2">
          <View className="mb-4 space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Question count
            </Label>
            <Input
              placeholder="Enter question count"
              keyboardType="numeric"
              value={`${formData.count}`}
              onChangeText={(value: string) => {
                const numValue = parseInt(value);
                if (!isNaN(numValue) && numValue > 0) {
                  handleFormChange("count", numValue);
                } else if (value === "") {
                  handleFormChange("count", 0);
                }
              }}
              className={!!errors.count ? "border-red-500" : ""}
            />
            {!!errors.count && (
              <Text className="text-xs text-red-500">{errors.count}</Text>
            )}
          </View>
          <View className="mb-4 space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Prompt (optional)
            </Label>
            <Input
              placeholder="Enter prompt (optional)"
              value={formData.prompt || ""}
              onChangeText={(value) => handleFormChange("prompt", value)}
              className={!!errors.prompt ? "border-red-500" : ""}
            />
            {!!errors.prompt && (
              <Text className="text-xs text-red-500">{errors.prompt}</Text>
            )}
          </View>
          <FileUploader
            data={formData.files}
            onChange={handleFileSelect}
            onChipClick={handleRemoveFile}
            errors={errors.files}
          />
          <Button onPress={handleGenerateQuestions} disabled={isLoading}>
            {isCreating ? (
              <Loader />
            ) : (
              <Text className="text-primary-foreground font-semibold">
                Generate Questions
              </Text>
            )}
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onPress={() => router.back()}
          >
            <Text>Back</Text>
          </Button>
        </View>
        {data && !isLoading && (
          <View className="w-full my-4 rounded-3xl gap-2">
            {data?.map((elem, index) => (
              <QuestionElement
                key={`question-${index}-${elem.text?.slice(0, 20)}`}
                question={elem}
                onChange={(value) => handleOnChange(value, index)}
                onDelete={() => handleOnDelete(index)}
              />
            ))}
            <Button onPress={handleCreateQuestions} disabled={isCreating}>
              {isCreating ? (
                <Loader />
              ) : (
                <Text className="text-primary-foreground font-semibold">
                  Submit
                </Text>
              )}
            </Button>
            <Button
              disabled={isLoading}
              variant="outline"
              onPress={() => router.back()}
            >
              <Text>Back</Text>
            </Button>
          </View>
        )}
        <TabBarOffset />
      </Card>
    </ScrollView>
  );
};

export default GenerateQuestion;
