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
import { useGetAllMenuQuery } from "@/modules/menu/redux/slices/menu-api";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AddQuiz = () => {
  const { id: restaurantId, menuId } = useGlobalSearchParams<{
    id: string;
    menuId: string;
  }>();
  const insets = useSafeAreaInsets();

  const { data: menu } = useGetAllMenuQuery(restaurantId);

  const [createQuiz, { isLoading: isCreatingQuiz }] = useCreateQuizMutation();

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
    <ScrollView style={[getScrollViewUiSettings(insets), { width: "100%" }]}>
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
          disabled={parseInt(menuId) !== -1}
          mode="outlined"
          value={`${parseInt(menuId) !== -1 ? menuId : values.menuId}`}
          options={menuItems(menu || [])}
          onSelect={(value) =>
            setFieldValue("menuId", value ? parseInt(value) : 0)
          }
          error={touched.menuId && !!errors.menuId}
          CustomMenuHeader={(props) => <></>}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isCreatingQuiz ? (
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

export default AddQuiz;
