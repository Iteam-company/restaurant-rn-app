import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { ScrollView, StyleSheet } from "react-native";

import FormWrapper from "@/modules/common/components/FormWrapper";
import { useEffect } from "react";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import {
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../../redux/slices/quiz-api";
import {
  difficultyLevelItem,
  initialValues as secondaryInitialValues,
  statusItem,
  validationSchema,
} from "../AddQuiz/utils";

const EditQuiz = () => {
  const { quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: initialValues } = useGetQuizQuery(quizId);

  const [updateQuiz, { isLoading: isUpdatingQuiz }] = useUpdateQuizMutation();

  const formik = useFormik({
    initialValues: initialValues
      ? {
          difficultyLevel: initialValues.difficultyLevel,
          status: initialValues.status,
          timeLimit: initialValues.timeLimit,
          title: initialValues.title,
        }
      : { ...secondaryInitialValues },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      await updateQuiz({
        ...formData,
        id: parseInt(quizId),
      }).unwrap();
      router.back();
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    setValues,
  } = formik;

  useEffect(() => {
    if (initialValues) {
      setValues({
        difficultyLevel: initialValues.difficultyLevel,
        status: initialValues.status,
        timeLimit: initialValues.timeLimit,
        title: initialValues.title,
      });
    }
  }, [setValues, initialValues]);

  if (!initialValues) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={[styles.container]}>
      <FormWrapper>
        <TextInput
          mode="outlined"
          label="Title"
          value={values.title}
          onChangeText={(text) => setFieldValue("title", text)}
          onBlur={handleBlur("title")}
          error={touched.title && !!errors.title}
          left={<TextInput.Icon icon="pencil" />}
        />
        <Dropdown
          label={"Difficulty Level"}
          mode="outlined"
          value={values.difficultyLevel}
          options={difficultyLevelItem}
          onSelect={(value) => setFieldValue("difficultyLevel", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <Dropdown
          label={"Status"}
          mode="outlined"
          value={values.status}
          options={statusItem}
          onSelect={(value) => setFieldValue("status", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <TextInput
          mode="outlined"
          label={"Time limit"}
          keyboardType="numeric"
          value={`${values.timeLimit}`}
          onChangeText={(text) =>
            setFieldValue("timeLimit", parseInt(text) || 0)
          }
          onBlur={handleBlur("timeLimit")}
          error={touched.timeLimit && !!errors.timeLimit}
          left={<TextInput.Icon icon="timer" />}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isUpdatingQuiz ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Submit"
          )}
        </Button>
      </FormWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default EditQuiz;
