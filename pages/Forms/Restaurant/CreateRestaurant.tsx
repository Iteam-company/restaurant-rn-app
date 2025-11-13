import { useValidateTokenQuery } from "@/lib/redux/slices/auth-api";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import {
  useCreateRestaurantMutation,
  useUploadRestaurantImageMutation,
} from "@/lib/redux/slices/restaurant-api";
import {
  createRestaurantInitialValues,
  createRestaurantValidationSchema,
} from "../utils";
import { handleFile } from "@/modules/common/utils/handleFile";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useTheme } from "@react-navigation/native";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CameraIcon } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/error-text";
import OwnersSelect from "@/components/owners-select";
import { Text } from "@/components/ui/text";

export default function CreateRestaurant() {
  const { colors } = useTheme();
  const router = useRouter();
  const { data: currentUser } = useValidateTokenQuery();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<string>("");

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
      initialValues: createRestaurantInitialValues,
      validationSchema: createRestaurantValidationSchema,
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
    <ScrollView className="w-full py-4">
      <Card>
        <CardHeader className="items-center">
          <Pressable
            onPress={async () => {
              const formData = await handleFile();
              if (!formData) return;
              setFormData(formData);
            }}
            className="relative"
          >
            <AspectRatio
              ratio={16 / 9}
              className="relative aspect-video w-full overflow-hidden rounded-md"
            >
              {formData ? (
                <Image
                  source={{ uri: formData.getAll("file")[0] as string }}
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
              value={values.restaurantName}
              onChangeText={(text) => setFieldValue("restaurantName", text)}
              onBlur={handleBlur("restaurantName")}
            />
            <ErrorText
              error={errors.restaurantName}
              touched={touched.restaurantName}
            />
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
          {currentUser?.role === "admin" && (
            <View>
              <Label>Owner:</Label>
              <OwnersSelect
                value={selectedOwner}
                onSelect={(value) => setSelectedOwner(value || "")}
              />
            </View>
          )}
        </CardContent>
        <CardContent className="gap-4">
          <Button
            onPress={() => {
              if (selectedOwner.trim() === "" && currentUser?.role === "admin")
                return;
              handleSubmit();
            }}
          >
            <Text>Submit</Text>
          </Button>
          <Button variant="outline" onPress={() => router.back()}>
            <Text>Back</Text>
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
