import FormWrapper from "@/modules/common/components/FormWrapper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import {
  useGetMenuItemQuery,
  useUpdateMenuItemMutation,
  useUpdateMenuMutation,
} from "@/modules/menu/redux/slices/menu-api";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  validationSchema,
  initialValues as startInitialValues,
} from "../../../MenuDetails/components/AddMenuItem/utils";

const EditItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const insets = useSafeAreaInsets();

  const { data, isLoading } = useGetMenuItemQuery(itemId);

  const formik = useFormik({
    initialValues: data
      ? {
          ...data,
          weight: data.weight?.toString() ?? "",
          price: data.price?.toString() ?? "",
        }
      : startInitialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      const body = {
        ...formData,
        price: parseFloat(formData.price),
        weight: parseFloat(formData.weight),
      };
      updateMenuItem({ body, itemId });
      router.back();
    },
  });

  const [updateMenuItem, { isLoading: isUpdating }] =
    useUpdateMenuItemMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    formik;

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...data,
        weight: data.weight?.toString() ?? "",
        price: data.price?.toString() ?? "",
      });
    }
  }, [data]);

  if (isLoading)
    return <ActivityIndicator animating={true} color={"#7c8ebf"} />;

  return (
    <ScrollView
      style={[
        getScrollViewUiSettings(insets),
        {
          width: "100%",
        },
      ]}
    >
      <FormWrapper>
        <Headline>Edit Menu Item</Headline>
        <TextInput
          mode="outlined"
          label="Menu item"
          value={values.name}
          onChangeText={(text) => setFieldValue("name", text)}
          onBlur={handleBlur("name")}
          error={touched.name && !!errors.name}
          left={<TextInput.Icon icon="food" />}
        />

        <TextInput
          mode="outlined"
          label="Description"
          value={values.description}
          onChangeText={(text) => setFieldValue("description", text)}
          onBlur={handleBlur("description")}
          error={touched.description && !!errors.description}
          left={<TextInput.Icon icon="text-box-outline" />}
        />

        <TextInput
          mode="outlined"
          label="Ingredients"
          value={values.ingredients}
          onChangeText={(text) => setFieldValue("ingredients", text)}
          onBlur={handleBlur("ingredients")}
          error={touched.ingredients && !!errors.ingredients}
          left={<TextInput.Icon icon="shopping" />}
        />

        <TextInput
          mode="outlined"
          label="Time For Cook"
          value={values.timeForCook}
          onChangeText={(text) => setFieldValue("timeForCook", text)}
          onBlur={handleBlur("timeForCook")}
          error={touched.timeForCook && !!errors.timeForCook}
          left={<TextInput.Icon icon="clock-outline" />}
        />

        <TextInput
          mode="outlined"
          label="Price"
          value={values.price?.toString() ?? ""}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, "");
            setFieldValue("price", numericValue);
          }}
          onBlur={handleBlur("price")}
          error={touched.price && !!errors.price}
          keyboardType="numeric"
          left={<TextInput.Icon icon="currency-usd" />}
        />

        <TextInput
          mode="outlined"
          label="Weight (gram)"
          value={values.weight?.toString() ?? ""}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9]/g, "");
            setFieldValue("weight", numericValue);
          }}
          onBlur={handleBlur("weight")}
          error={touched.weight && !!errors.weight}
          keyboardType="numeric"
          left={<TextInput.Icon icon="scale" />}
        />

        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          {isUpdating ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Save Changes"
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
  container: {},
});

export default EditItem;
