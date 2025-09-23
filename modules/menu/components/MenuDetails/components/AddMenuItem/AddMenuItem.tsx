import FormWrapper from "@/modules/common/components/FormWrapper";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { initialValues, validationSchema } from "./utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  useConnectItemToMenuMutation,
  useCreateMenuItemMutation,
  useUploadImageMutation,
} from "@/modules/menu/redux/slices/menu-api";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { ScrollView, StyleSheet, View } from "react-native";
import { handleFile } from "@/modules/common/utils/handleFile";
import { Image } from "react-native";
import TabBarOffset from "@/modules/common/components/TabBarOffset";

export const AddMenuItem = () => {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const { colors } = useTheme();
  const [formData, setFormData] = useState<FormData | null>(null);

  const [createMenu, { isLoading: isCreating }] =
    useCreateMenuItemMutation<RTKMutationPayloadType>();
  const [connectItemToMenu, { isLoading: isConnecting }] =
    useConnectItemToMenuMutation<RTKMutationPayloadType>();
  const [uploadImage] = useUploadImageMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (values) => {
        try {
          const body = {
            ...values,
            price: parseFloat(values.price),
            weight: parseFloat(values.weight),
          };
          const res = await createMenu(body).unwrap();
          if (res.id) {
            await connectItemToMenu({ menuId, itemId: res.id });
            await uploadImage({ body: formData, itemId: res.id });
            await router.back();
          }
        } catch {
          console.error("error");
        }
      },
    });

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <FormWrapper>
        <View style={styles.header}>
          <Headline>Add New Menu Item</Headline>
          {formData ? (
            <Image
              style={styles.image}
              source={formData.getAll("file")[0] as any}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("@/assets/images/mock/dish-mock.jpg")}
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
            const numericValue = text.replace(/[^0-9].[^0-9]/g, "");
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
          {isConnecting || isCreating ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            "Add New Item"
          )}
        </Button>
        <Button mode="elevated" onPress={() => router.back()}>
          Back
        </Button>
      </FormWrapper>
      <TabBarOffset />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 24,
    gap: 10,
  },
  image: {
    width: 250,
    height: 220,
    borderRadius: 24,
  },
  photoButton: {
    position: "absolute",
    bottom: -20,
    right: 60,
    borderWidth: 2,
  },
});
