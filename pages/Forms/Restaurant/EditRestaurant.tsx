import { handleFile } from "@/modules/common/utils/handleFile";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Pressable, View, Image } from "react-native";
import {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
  useUploadRestaurantImageMutation,
} from "@/lib/redux/slices/restaurant-api";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTheme } from "@react-navigation/native";
import { editRestaurantValidationSchema } from "../utils";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CameraIcon } from "lucide-react-native";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorText from "@/components/error-text";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const EditRestaurant = () => {
  const { colors } = useTheme();
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();

  const { data: initialValues } = useGetRestaurantQuery(restaurantId);

  const [updateRestaurant, { isLoading }] = useUpdateRestaurantMutation();

  const [uploadImage] = useUploadRestaurantImageMutation();

  const formik = useFormik({
    initialValues: { name: "", address: "" },
    validationSchema: editRestaurantValidationSchema,
    onSubmit: async (values) => {
      try {
        await updateRestaurant({ values, id: restaurantId }).unwrap();
        router.back();
      } catch (e) {
        const error = e as FetchBaseQueryError;
        toastErrorHandler(error);
      }
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
      setValues({ name: initialValues.name, address: initialValues.address });
    }
  }, [initialValues, setValues]);

  return (
    <Loader isLoading={!initialValues}>
      <Card>
        <CardHeader>
          <Pressable
            onPress={async () => {
              const formData = await handleFile();
              if (!formData) return;
              uploadImage({
                formData: formData,
                restaurantId,
              });
            }}
            className="relative"
          >
            <AspectRatio
              ratio={16 / 9}
              className="relative aspect-video w-full overflow-hidden rounded-md"
            >
              {initialValues?.image ? (
                <Image
                  source={{ uri: initialValues?.image }}
                  className="absolute bottom-0 left-0 right-0 top-0 object-cover w-full h-full"
                />
              ) : (
                <Image
                  source={require("@/assets/images/mock/restaurant-mock.jpg")}
                  className="absolute bottom-0 left-0 right-0 top-0 object-cover w-full h-full"
                />
              )}
            </AspectRatio>
            <View className="absolute right-1 bottom-1">
              <CameraIcon
                size={30}
                color={colors.text}
                fill={colors.background}
              />
            </View>
          </Pressable>
        </CardHeader>
        <CardContent className="gap-4">
          <View>
            <Label>Restaurant Name</Label>
            <Input
              placeholder="Name"
              value={values.name}
              onChangeText={(text) => setFieldValue("name", text)}
              onBlur={handleBlur("name")}
            />
            <ErrorText error={errors.name} touched={touched.name} />
          </View>
          <View>
            <Label>Address</Label>
            <Input
              placeholder="Address"
              value={values.address}
              onChangeText={(text) => setFieldValue("address", text)}
              onBlur={handleBlur("address")}
            />
            <ErrorText error={errors.address} touched={touched.address} />
          </View>
        </CardContent>
        <CardContent className="gap-2">
          <Button disabled={isLoading} onPress={() => handleSubmit()}>
            <Text>Submit</Text>
          </Button>
          <Button
            disabled={isLoading}
            variant="outline"
            onPress={() => router.back()}
          >
            <Text>Back</Text>
          </Button>
        </CardContent>
      </Card>
    </Loader>
  );
};

export default EditRestaurant;
