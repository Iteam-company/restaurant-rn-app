import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../../redux/slices/quiz-api";
import {
  difficultyLevelItem,
  menuItems,
  initialValues as secondaryInitialValues,
  statusItem,
  validationSchema,
} from "../AddQuiz/utils";
import FormWrapper from "@/modules/common/components/FormWrapper";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useGetAllMenuQuery } from "@/modules/menu/redux/slices/menu-api";

const EditQuiz = () => {
  const insets = useSafeAreaInsets();
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: initialValues } = useGetQuizQuery(quizId);
  const { data: menu } = useGetAllMenuQuery(restaurantId);

  const [updateQuiz, { isLoading: isUpdatingQuiz }] = useUpdateQuizMutation();

  const formik = useFormik({
    initialValues: initialValues
      ? {
          difficultyLevel: initialValues.difficultyLevel,
          status: initialValues.status,
          timeLimit: initialValues.timeLimit,
          title: initialValues.title,
        }
      : { ...secondaryInitialValues, menuId: undefined },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      await updateQuiz({
        ...formData,
        id: parseInt(quizId),
        menuId: undefined,
      }).unwrap();
      router.back();
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    formik;

  useEffect(() => {
    if (initialValues) {
      formik.setValues({
        difficultyLevel: initialValues.difficultyLevel,
        status: initialValues.status,
        timeLimit: initialValues.timeLimit,
        title: initialValues.title,
      });
      formik.setFieldValue("menuId", initialValues?.menu.id);
    }
  }, [initialValues]);

  if (!initialValues) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={[styles.container]}>
      <FormWrapper>
        <Headline>Edit New Quiz</Headline>
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
        <Dropdown
          label={"Menu"}
          disabled={initialValues.menu.id !== -1}
          mode="outlined"
          value={`${initialValues.menu.id}`}
          options={menuItems(menu || [])}
          onSelect={(value) =>
            setFieldValue("menuId", value ? parseInt(value) : 0)
          }
          CustomMenuHeader={(props) => <></>}
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
