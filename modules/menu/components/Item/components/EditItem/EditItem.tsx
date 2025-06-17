import FormWrapper from "@/modules/common/components/FormWrapper";
import {
  useGetMenuItemQuery,
  useUpdateMenuItemMutation,
  useUpdateMenuMutation,
  useUploadImageMutation,
} from "@/modules/menu/redux/slices/menu-api";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  validationSchema,
  initialValues as startInitialValues,
} from "../../../MenuDetails/components/AddMenuItem/utils";
import { handleFile } from "@/modules/common/utils/handleFile";
import { Image } from "react-native";

const EditItem = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { colors } = useTheme();
  const [formData, setFormData] = useState<FormData | null>(null);

  const { data, isLoading } = useGetMenuItemQuery(itemId);
  const [uploadImage] = useUploadImageMutation();

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
        {
          width: "100%",
        },
      ]}
    >
      <FormWrapper>
        <View style={styles.header}>
          <Headline>Edit Menu Item</Headline>
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
              await uploadImage({ body: formData, itemId });
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

export default EditItem;
