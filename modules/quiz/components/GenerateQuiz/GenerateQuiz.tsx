import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useGenerateQuizzesMutation } from "@/lib/redux/slices/quiz-api";
import * as DocumentPicker from "expo-document-picker";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { GenerateQuizInitialValues, GenerateQuizSchema } from "./utils";
import FileUploader from "@/modules/common/components/FileUploader";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import QuizQuestionEdit from "./QuizQuestionEdit";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";

const GenerateQuiz = () => {
  const [generateQuizzes, { data, isLoading: isGeneratingQuizzes }] =
    useGenerateQuizzesMutation();

  const {
    values: generateQuizValues,
    setValues: setGenerateQuizValues,
    errors: generateQuizErrors,
    handleSubmit: generateQuiz,
  } = useFormik({
    initialValues: GenerateQuizInitialValues,
    onSubmit: async (values) => {
      try {
        await generateQuizzes(values).unwrap();
      } catch (e) {
        console.log(e);
        Toast.show({ text1: "Generation error, try again!", type: "error" });
      }
    },
    validationSchema: GenerateQuizSchema,
  });

  const handleFileSelection = useCallback(
    (files: DocumentPicker.DocumentPickerAsset[]) => {
      setGenerateQuizValues((prev) => ({ ...prev, files }));
    },
    [setGenerateQuizValues],
  );

  const handleRemoveFile = useCallback(
    (file: DocumentPicker.DocumentPickerAsset) => {
      setGenerateQuizValues((prev) => ({
        ...prev,
        files: prev.files.filter(
          (f) => !(f.name === file.name && f.size === file.size),
        ),
      }));
    },
    [setGenerateQuizValues],
  );

  return (
    <ScrollView
      className="w-full bg-background gap-4 px-3"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
      showsVerticalScrollIndicator={false}
    >
      <Card className="px-3">
        <View className=" gap-2 w-full my-4 rounded-3xl">
          <FileUploader
            data={generateQuizValues.files}
            onChange={handleFileSelection}
            onChipClick={handleRemoveFile}
            errors={generateQuizErrors.files?.toString()}
          />

          <View className="my-2">
            <View className="mb-4 space-y-2">
              <Label className=" text-sm font-medium text-foreground">
                Prompt (optional)
              </Label>
              <Input
                placeholder="Enter prompt (optional)"
                value={generateQuizValues.prompt || ""}
                onChangeText={(value) =>
                  setGenerateQuizValues((prev) => ({ ...prev, prompt: value }))
                }
                className={!!generateQuizValues.prompt ? "border-red-500" : ""}
              />
              {!!generateQuizValues.prompt && (
                <Text className="text-xs text-red-500">
                  {generateQuizValues.prompt}
                </Text>
              )}
            </View>
          </View>
          <View className="my-2">
            <View className="mb-4 space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Count (optional)
              </Label>
              <Input
                keyboardType="number-pad"
                placeholder="Enter count (optional)"
                value={generateQuizValues.count?.toString() || ""}
                onChangeText={(value) =>
                  setGenerateQuizValues((prev) => ({
                    ...prev,
                    count: parseInt(value) || 0,
                  }))
                }
                className={!!generateQuizValues.count ? "border-red-500" : ""}
              />
              {!!generateQuizValues.count && (
                <Text className="text-xs text-red-500">
                  {generateQuizValues.count}
                </Text>
              )}
            </View>
          </View>
          <Button
            onPress={() => generateQuiz()}
            disabled={isGeneratingQuizzes || !!data}
          >
            {isGeneratingQuizzes ? (
              <Loader />
            ) : (
              <Text className="text-primary-foreground font-semibold">
                Generate Questions
              </Text>
            )}
          </Button>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>Back</Text>
          </Button>
        </View>

        {data && (
          <QuizQuestionEdit
            valuesForGeneratingQuestion={generateQuizValues}
            initialValues={data}
          />
        )}

        <TabBarOffset />
      </Card>
    </ScrollView>
  );
};

export default GenerateQuiz;
