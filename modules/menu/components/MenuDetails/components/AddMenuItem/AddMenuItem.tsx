import FormWrapper from "@/modules/common/components/FormWrapper";
import { useFormik } from "formik";
import React from "react";
import { View } from "react-native";
import { Button, Headline, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { initialValues, validationSchema } from "./utils";
import { router } from "expo-router";

export const AddMenuItem = () => {
  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        console.log(formData);
      },
    });

  return (
    <FormWrapper>
      <Headline>Add New Menu Item</Headline>
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
        onChangeText={(text) =>
          setFieldValue("price", text ? Number(text) : null)
        }
        onBlur={handleBlur("price")}
        error={touched.price && !!errors.price}
        keyboardType="numeric"
        left={<TextInput.Icon icon="currency-usd" />}
      />

      <Button mode="contained-tonal" onPress={() => handleSubmit()}>
        {/* {isConnecting || isCreatingMenu ? (
      <ActivityIndicator animating={true} color={"#7c8ebf"} />
    ) : (
      "Submit"
    )} */}
        Add New Item
      </Button>
      <Button mode="elevated" onPress={() => router.back()}>
        Back
      </Button>
    </FormWrapper>
  );
};
