import FormWrapper from "@/modules/common/components/FormWrapper";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useGetMenuQuery,
  useUpdateMenuMutation,
} from "../../redux/slices/menu-api";
import { categoryItems, seasonItem, validationSchema } from "../AddMenu/utils";
import { categoryIcons } from "../MenuList/utils";
import { CategoriesEnum, SeasonsEnum } from "../../types";

export const EditMenu = () => {
  const { id: restaurantId, menuId } = useLocalSearchParams<{
    id: string;
    menuId: string;
  }>();

  const { data: initialValues, isLoading: isLoadingInitialValues } =
    useGetMenuQuery(menuId);

  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      season: SeasonsEnum.FALL,
      categories: CategoriesEnum.APPETIZERS,
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      await updateMenu({
        body: formData,
        menuId,
      });
      router.back();
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    formik;

  useEffect(() => {
    if (initialValues)
      formik.setValues({
        name: initialValues.name,
        season: initialValues.season,
        categories: initialValues.categories,
      });
  }, [initialValues]);

  if (isLoadingInitialValues)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView style={[styles.container]}>
      <FormWrapper>
        <Headline>Add New Menu</Headline>
        <TextInput
          mode="outlined"
          label="Menu Name"
          value={values.name}
          onChangeText={(text) => setFieldValue("name", text)}
          onBlur={handleBlur("name")}
          error={touched.name && !!errors.name}
          left={<TextInput.Icon icon="book-open-variant" />}
        />
        <Dropdown
          label="Season of menu"
          mode="outlined"
          value={values.season}
          options={seasonItem}
          onSelect={(value) => setFieldValue("season", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <Dropdown
          label="Category of menu"
          mode="outlined"
          value={values.categories}
          options={categoryItems}
          onSelect={(value) => setFieldValue("categories", value)}
          CustomMenuHeader={(props) => <></>}
        />
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isUpdating ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Submit"
          )}
        </Button>
        <Button mode="elevated" onPress={() => router.back()}>
          Back
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

export default EditMenu;
