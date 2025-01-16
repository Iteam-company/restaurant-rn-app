import { router, useGlobalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  difficultyLevelItem,
  initialValues,
  menuItems,
  statusItem,
  validationSchema,
} from "./utils";
import {
  useConnectQuizToMenuMutation,
  useCreateQuizMutation,
} from "../../redux/slices/quiz-api";
import FormWrapper from "@/modules/common/components/FormWrapper";
import {
  Headline,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { DifficultyLevelEnum } from "../../types";
import { useGetAllMenuQuery } from "@/modules/menu/redux/slices/menu-api";

const AddQuiz = () => {
  const { id: restaurantId, quizId } = useGlobalSearchParams<{
    id: string;
    quizId: string;
  }>();

  const { data: menu } = useGetAllMenuQuery(restaurantId);

  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();
  const [connectQuizToMenu, { isLoading: isConnectingQuizToMenu }] =
    useConnectQuizToMenuMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        try {
          await createQuiz(formData).unwrap();
          router.back();
        } catch {}
      },
    });

  return (
    <ScrollView style={styles.container}>
      <FormWrapper>
        <Headline>Add New Quiz</Headline>
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
          mode="outlined"
          value={`${values.menuId}`}
          options={menuItems(menu || [])}
          onSelect={(value) =>
            setFieldValue("menuId", value ? parseInt(value) : 0)
          }
          CustomMenuHeader={(props) => <></>}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isConnectingQuizToMenu || isCreatingQuiz ? (
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
    paddingVertical: 10,
  },
});

export default AddQuiz;
