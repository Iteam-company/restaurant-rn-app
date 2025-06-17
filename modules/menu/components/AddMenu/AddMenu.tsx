import FormWrapper from "@/modules/common/components/FormWrapper";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Headline,
  TextInput,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import {
  categoryItems,
  initialValues,
  seasonItem,
  validationSchema,
} from "./utils";
import { useFormik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import {
  useConnectMenuToRestaurantMutation,
  useCreateMenuMutation,
} from "../../redux/slices/menu-api";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

export const AddMenu = () => {
  const { id: restaurantId } = useLocalSearchParams<{
    id: string;
  }>();
  const [createMenu, { isLoading: isCreatingMenu }] =
    useCreateMenuMutation<RTKMutationPayloadType>();

  const [connectMenuToRestaurant, { isLoading: isConnecting }] =
    useConnectMenuToRestaurantMutation<RTKMutationPayloadType>();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      validateOnChange: true,
      onSubmit: async (formData) => {
        try {
          const menuRes = await createMenu(formData).unwrap();
          if (menuRes.id) {
            await connectMenuToRestaurant({ menuId: menuRes.id, restaurantId });
            router.back();
          }
        } catch {}
      },
    });

  return (
    <ScrollView style={[{ width: "100%" }]}>
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
          {isConnecting || isCreatingMenu ? (
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
