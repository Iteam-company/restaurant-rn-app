import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { useGenerateQuizzesMutation } from "@/lib/redux/slices/quiz-api";
import * as DocumentPicker from "expo-document-picker";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { GenerateQuizInitialValues, GenerateQuizSchema } from "./utils";
import FileUploader from "@/modules/common/components/FileUploader";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import QuizQuestionEdit from "./QuizQuestionEdit";

const GenerateQuiz = () => {
  const { colors } = useTheme();

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
    [setGenerateQuizValues]
  );

  const handleRemoveFile = useCallback(
    (file: DocumentPicker.DocumentPickerAsset) => {
      setGenerateQuizValues((prev) => ({
        ...prev,
        files: prev.files.filter(
          (f) => !(f.name === file.name && f.size === file.size)
        ),
      }));
    },
    [setGenerateQuizValues]
  );

  return (
    <ScrollView style={[{ width: "100%", paddingHorizontal: 10, gap: 16 }]}>
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
        <FileUploader
          data={generateQuizValues.files}
          onChange={handleFileSelection}
          onChipClick={handleRemoveFile}
          errors={generateQuizErrors.files?.toString()}
        />

        <View style={styles.fileCard}>
          <TextInput
            mode="outlined"
            label="Prompt (optional)"
            value={generateQuizValues.prompt || ""}
            onChangeText={(value) =>
              setGenerateQuizValues((prev) => ({ ...prev, prompt: value }))
            }
            error={!!generateQuizValues.prompt}
            multiline
            numberOfLines={3}
          />
          {generateQuizErrors.prompt && (
            <HelperText type="error" visible={!!generateQuizErrors.prompt}>
              {generateQuizErrors.prompt}
            </HelperText>
          )}
        </View>
        <View style={styles.fileCard}>
          <TextInput
            mode="outlined"
            keyboardType="number-pad"
            label="Count (optional)"
            value={generateQuizValues.count?.toString() || ""}
            onChangeText={(value) =>
              setGenerateQuizValues((prev) => ({
                ...prev,
                count: parseInt(value) || 0,
              }))
            }
            error={!!generateQuizValues.count}
            multiline
            numberOfLines={3}
          />
          {generateQuizErrors.count && (
            <HelperText type="error" visible={!!generateQuizErrors.count}>
              {generateQuizErrors.count}
            </HelperText>
          )}
        </View>

        <Button
          disabled={isGeneratingQuizzes || !!data}
          mode="outlined"
          onPress={() => generateQuiz()}
          loading={isGeneratingQuizzes}
          icon="auto-fix"
          style={{ marginTop: 8 }}
        >
          Generate with AI
        </Button>
      </View>

      {data && (
        <QuizQuestionEdit
          valuesForGeneratingQuestion={generateQuizValues}
          initialValues={data}
        />
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
