import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Headline, TextInput } from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { useCreateRestaurantMutation } from "../common/redux/slices/create-restaurant-api";

const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Restaurant name is required"),
  address: Yup.string().required("Address is required"),
});

const initialValues = {
  restaurantName: "",
  address: "",
};

export default function CreateRestaurant() {
  const [createRestaurant, { isLoading, isError, error, isSuccess, data }] =
    useCreateRestaurantMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Restaurant created successfully:", data);
    }
    if (isError) {
      console.error("Error creating restaurant:", error);
    }
  }, [isSuccess, isError, data, error]);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        const response = fetch("https://jsonplaceholder.typicode.com/posts/1");
        console.log("Form submitted:", values);
        createRestaurant(values);
      },
    });

  return (
    <FormWrapper>
      <Headline>Logo</Headline>
      <TextInput
        mode="outlined"
        label="Restaurant Name"
        value={values.restaurantName}
        onChangeText={(text) => setFieldValue("restaurantName", text)}
        onBlur={handleBlur("restaurantName")}
        error={touched.restaurantName && !!errors.restaurantName}
        left={<TextInput.Icon icon="store" />}
      />
      <TextInput
        mode="outlined"
        label="Address"
        value={values.address}
        onChangeText={(text) => setFieldValue("address", text)}
        onBlur={handleBlur("address")}
        error={touched.address && !!errors.address}
        left={<TextInput.Icon icon="map-marker" />}
      />
      <Button mode="elevated" onPress={() => handleSubmit()}>
        Submit
      </Button>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({});
