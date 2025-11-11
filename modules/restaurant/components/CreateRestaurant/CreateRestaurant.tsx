import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  useCreateRestaurantMutation,
  useGetOwnersQuery,
  useUploadRestaurantImageMutation,
} from "../../../../lib/redux/slices/restaurant-api";
import { getOptions, initialValues, validationSchema } from "./utils";

import { handleFile } from "@/modules/common/utils/handleFile";
import { Dropdown } from "react-native-paper-dropdown";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function CreateRestaurant() {
  const { colors } = useTheme();
  const router = useRouter();
  const { data: currentUser } = useValidateTokenQuery();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<string>("");

  const { data: owners, isLoading: isLoadingOwners } = useGetOwnersQuery();

  const [createRestaurant, { isLoading, isError, error, isSuccess, data }] =
    useCreateRestaurantMutation();

  const [uploadImage, { isLoading: isLoadingImage }] =
    useUploadRestaurantImageMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Restaurant created successfully:", data);
    }
    if (isError) {
      console.error("Error creating restaurant:", error);
      toastErrorHandler(error as FetchBaseQueryError);
    }
  }, [isSuccess, isError, data, error]);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        if (currentUser) {
          const restaurant = await createRestaurant({
            ...values,
            ownerId:
              currentUser.role === "owner"
                ? currentUser?.id
                : parseInt(selectedOwner),
          });
          if (restaurant && formData)
            await uploadImage({
              formData: formData,
              restaurantId: restaurant.data?.id,
            });

          router.back();
        }
      },
    });

  if (isLoading || isLoadingImage) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={[styles.container]}>
      <FormWrapper>
        <View style={styles.header}>
          <Headline>Create Restaurant</Headline>
          {formData ? (
            <Avatar.Image
              size={120}
              source={formData.getAll("file")[0] as any}
            />
          ) : (
            <Avatar.Image
              size={120}
              source={require("@/assets/images/mock/restaurant-mock.jpg")}
            />
          )}
          <IconButton
            icon="camera"
            size={24}
            style={[styles.photoButton, { backgroundColor: colors.surface }]}
            onPress={async () => {
              const formData = await handleFile();
              if (!formData) return;
              setFormData(formData);
            }}
          />
        </View>
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
        {currentUser?.role === "admin" && !isLoadingOwners ? (
          <Dropdown
            value={selectedOwner}
            error={touched.address && selectedOwner.trim() === ""}
            onSelect={(value) => setSelectedOwner(value || "")}
            options={getOptions(owners || [])}
          />
        ) : (
          <></>
        )}
        <Button
          mode="contained-tonal"
          onPress={() => {
            if (selectedOwner.trim() === "" && currentUser?.role === "admin")
              return;
            handleSubmit();
          }}
        >
          Submit
        </Button>
        <Button mode="elevated" onPress={() => router.back()}>
          Back
        </Button>
      </FormWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    paddingBottom: 100,
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
