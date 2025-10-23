import FormWrapper from "@/modules/common/components/FormWrapper";
import { handleFile } from "@/modules/common/utils/handleFile";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Headline,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
  useUplaodRestaurantImageMutation,
} from "../../redux/slices/restaurant-api";
import { validationSchema } from "./utils";

const EditRestaurant = () => {
  const { colors } = useTheme();
  const { id: restaurantId } = useLocalSearchParams<{ id: string }>();

  const { data: initialValues } = useGetRestaurantQuery(restaurantId);

  const [updateRestaurant] = useUpdateRestaurantMutation();

  const [uploadImage] = useUplaodRestaurantImageMutation();

  const formik = useFormik({
    initialValues: { name: "", address: "" },
    validationSchema,
    onSubmit: (values) => {
      updateRestaurant({ values, id: restaurantId });
      router.back();
    },
  });
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    setValues,
  } = formik;

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues, setValues]);

  if (!initialValues) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={[styles.container]}>
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
