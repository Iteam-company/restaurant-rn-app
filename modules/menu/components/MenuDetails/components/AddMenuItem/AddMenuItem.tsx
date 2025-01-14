import FormWrapper from "@/modules/common/components/FormWrapper";
import { useFormik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { initialValues, validationSchema } from "./utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  useConnectItemToMenuMutation,
  useCreateMenuItemMutation,
} from "@/modules/menu/redux/slices/menu-api";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { ScrollView } from "react-native";
import getScrollViewUiSettings from "@/modules/common/constants/getScrollViewUiSettings.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AddMenuItem = () => {
  const { menuId } = useLocalSearchParams<{ menuId: string }>();
  const insets = useSafeAreaInsets();

  const [createMenu, { isLoading: isCreating }] =
    useCreateMenuItemMutation<RTKMutationPayloadType>();
  const [connectItemToMenu, { isLoading: isConnecting }] =
    useConnectItemToMenuMutation<RTKMutationPayloadType>();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        try {
          const body = {
            ...formData,
            price: parseFloat(formData.price),
            weight: parseFloat(formData.weight),
          };
          const res = await createMenu(body).unwrap();
          if (res.id) {
            await connectItemToMenu({ menuId, itemId: res.id });
            router.back();
          }
        } catch {
          console.error("error");
        }
      },
    });

  return (
    <ScrollView style={[{ width: "100%" }, getScrollViewUiSettings(insets)]}>
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
    </ScrollView>
  );
};
