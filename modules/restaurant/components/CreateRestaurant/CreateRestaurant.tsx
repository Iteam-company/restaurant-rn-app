import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import {
  useCreateRestaurantMutation,
  useUplaodRestaurantImageMutation,
} from "../../redux/slices/restaurant-api";
import { initialValues, validationSchema } from "./utils";
import { useFileSelect } from "@/modules/common/hooks/useFileSelect";
import { useValidateTokenQuery } from "@/modules/auth/redux/slices/auth-api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { handleFile } from "@/modules/common/utils/handleFile";

export default function CreateRestaurant() {
  const { colors } = useTheme();
  const router = useRouter();
  const { data: currentUser } = useValidateTokenQuery();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<FormData | null>(null);

  const [createRestaurant, { isLoading, isError, error, isSuccess, data }] =
    useCreateRestaurantMutation();

  const [uploadImage, { isLoading: isLoadingImage }] =
    useUplaodRestaurantImageMutation();

  const { handleFileSelect } = useFileSelect(() => {}, {});

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
      onSubmit: async (values) => {
        if (currentUser) {
          const restaurant = await createRestaurant({
            ...values,
            ownerId: currentUser?.id,
          });
          console.log(restaurant);
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
    <ScrollView style={[styles.container, getScrollViewUiSettings(insets)]}>
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
        <Button mode="contained-tonal" onPress={() => handleSubmit()}>
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
