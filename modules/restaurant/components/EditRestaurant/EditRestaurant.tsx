import FormWrapper from "@/modules/common/components/FormWrapper";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useFormik } from "formik";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { validationSchema } from "./utils";
import {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
  useUplaodRestaurantImageMutation,
} from "../../redux/slices/restaurant-api";
import { router, useLocalSearchParams } from "expo-router";
import { handleFile } from "@/modules/common/utils/handleFile";

const EditRestaurant = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { id: restaurantId } = useLocalSearchParams<{ id: string }>();

  const { data: initialValues } = useGetRestaurantQuery(restaurantId);

  const [updateRestaurant, { isLoading, isError, error, isSuccess, data }] =
    useUpdateRestaurantMutation();

  const [uploadImage] = useUplaodRestaurantImageMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: initialValues
        ? initialValues
        : { name: undefined, address: undefined },
      validationSchema,
      onSubmit: (values) => {
        updateRestaurant({ values, id: restaurantId });
        router.back();
      },
    });

  if (!initialValues) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={[styles.container, getScrollViewUiSettings(insets)]}>
      <FormWrapper>
        <View style={styles.header}>
          <Headline>Edit Restaurant</Headline>
          {initialValues.image ? (
            <Avatar.Image size={120} source={{ uri: initialValues.image }} />
          ) : (
            <Avatar.Image
              size={120}
              source={require("@/assets/images/mock/premium_photo-1661883237884-263e8de8869b.jpg")}
            />
          )}
          <IconButton
            icon="camera"
            size={24}
            style={[styles.photoButton, { backgroundColor: colors.surface }]}
            onPress={async () => {
              const formData = await handleFile();
              if (!formData) return;
              uploadImage({
                formData: formData,
                restaurantId,
              });
            }}
          />
        </View>

        <TextInput
          mode="outlined"
          label="Restaurant Name"
          value={values.name}
          onChangeText={(text) => setFieldValue("name", text)}
          onBlur={handleBlur("restaurantName")}
          error={touched.name && !!errors.name}
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
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
          Submit
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
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 24,
    gap: 10,
  },
  photoButton: {
    position: "absolute",
    bottom: -20,
    right: "31%",
    borderWidth: 2,
  },
});

export default EditRestaurant;
