import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dropdown } from "react-native-paper-dropdown";
import {
  TextInput,
  Button,
  Title,
  Surface,
  Avatar,
  Text,
  ActivityIndicator,
  IconButton,
  useTheme,
} from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useRemoveCurrentUserMutation,
  useUpdateCurrentUserInfoMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
  useUploadCurrentUserPhotoMutation,
} from "@/modules/common/redux/slices/user-api";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { UserROLES } from "@/modules/common/types/user.types";
import { useFileSelect } from "@/modules/common/hooks/useFileSelect";
import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import { useRemoveWorkerMutation } from "@/modules/restaurant/redux/slices/restaurant-api";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  handleFile,
  pickImageFromGallery,
} from "@/modules/common/utils/handleFile";
import * as SecureStore from "expo-secure-store";
import { USER_ROLE } from "@/modules/common/constants/api";

interface WorkerFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role?: UserROLES;
}

interface IOptions {
  label: string;
  value: UserROLES;
}

const OPTIONS: IOptions[] = [
  {
    label: "Admin",
    value: UserROLES.ADMIN,
  },
  {
    label: "Owner",
    value: UserROLES.OWNER,
  },
  {
    label: "Waiter",
    value: UserROLES.WAITER,
  },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  role: Yup.string().required("Role is required"),
});

const initialValues: WorkerFormData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phoneNumber: "",
  role: undefined,
};

const EditWorker = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const {
    workerId: initialWorkerId,
    userId,
    id: restaurantId,
  } = useLocalSearchParams<{
    workerId: string;
    userId: string;
    id: string;
  }>();
  const workerId = initialWorkerId || userId;

  const { data, isLoading: isLoadingUser } =
    SecureStore.getItem(USER_ROLE) === "waiter"
      ? useGetCurrentUserQuery()
      : useGetUserByIdQuery(workerId);

  const insets = useSafeAreaInsets();

  const [removeWorker] = useRemoveWorkerMutation();
  const [removeCurrentUser] = useRemoveCurrentUserMutation();

  const [updatePhoto, { isLoading: isLoadingImage }] =
    SecureStore.getItem(USER_ROLE) === "waiter"
      ? useUploadCurrentUserPhotoMutation()
      : useUpdateUserPhotoMutation();
  const [updateUser, { isLoading: isUpdating, error }] =
    SecureStore.getItem(USER_ROLE) === "waiter"
      ? useUpdateCurrentUserInfoMutation()
      : useUpdateUserInfoMutation<RTKMutationPayloadType>();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: async (formData) => {
      try {
        await updateUser({
          params: { userId: workerId, restaurantId },
          body: { ...formData },
        }).unwrap();
        router.back();
      } catch (e) {
        console.error("Failed to update worker:", e);
      }
    },
  });

  useEffect(() => {
    if (data) {
      setValues({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        username: data.username || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        role: data.role,
      });
    }
  }, [data, setValues]);

  if (isLoadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={[{ width: "100%" }]}>
      <FormWrapper>
        <Surface style={styles.surface}>
          <View style={styles.header}>
            <Title>Edit Worker Profile</Title>
            {data?.icon ? (
              <Avatar.Image size={80} source={{ uri: data.icon }} />
            ) : (
              <Avatar.Text
                size={80}
                label={`${values.firstName.charAt(0)}${values.lastName.charAt(
                  0
                )}`}
              />
            )}
            <IconButton
              icon="camera"
              size={24}
              style={[styles.photoButton, { backgroundColor: colors.surface }]}
              onPress={async () => {
                const formData = await handleFile();
                if (!formData) return;
                updatePhoto({
                  formData: formData,
                  workerId,
                });
              }}
            />
          </View>

          <View style={styles.form}>
            <TextInput
              mode="outlined"
              label="First Name"
              value={values.firstName}
              onChangeText={(text) => setFieldValue("firstName", text)}
              onBlur={handleBlur("firstName")}
              error={touched.firstName && !!errors.firstName}
              left={<TextInput.Icon icon="account" />}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              mode="outlined"
              label="Last Name"
              value={values.lastName}
              onChangeText={(text) => setFieldValue("lastName", text)}
              onBlur={handleBlur("lastName")}
              error={touched.lastName && !!errors.lastName}
              left={<TextInput.Icon icon="account" />}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              mode="outlined"
              label="Username"
              value={values.username}
              onChangeText={(text) => setFieldValue("username", text)}
              onBlur={handleBlur("username")}
              error={touched.username && !!errors.username}
              left={<TextInput.Icon icon="account-circle" />}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              mode="outlined"
              label="Email"
              value={values.email}
              onChangeText={(text) => setFieldValue("email", text)}
              onBlur={handleBlur("email")}
              error={touched.email && !!errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              mode="outlined"
              label="Phone Number"
              value={values.phoneNumber}
              onChangeText={(text) => setFieldValue("phoneNumber", text)}
              onBlur={handleBlur("phoneNumber")}
              error={touched.phoneNumber && !!errors.phoneNumber}
              keyboardType="phone-pad"
              left={<TextInput.Icon icon="phone" />}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            {SecureStore.getItem(USER_ROLE) === "waiter" ? (
              <></>
            ) : (
              <Dropdown
                label="Role"
                mode="outlined"
                value={values.role}
                options={OPTIONS}
                onSelect={(value) => setFieldValue("role", value)}
                CustomMenuHeader={(props) => <></>}
              />
            )}

            {touched.role && errors.role && (
              <Text style={styles.errorText}>{errors.role}</Text>
            )}

            {error && (
              <Text style={styles.errorText}>
                Failed to update worker profile. Please try again.
              </Text>
            )}

            <View>
              <Button
                mode="contained-tonal"
                onPress={() => handleSubmit()}
                style={styles.submitButton}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator animating={true} color={"#ffffff"} />
                ) : (
                  <Text>Save Changes</Text>
                )}
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  setIsOpenDialog(true);
                }}
                style={[styles.submitButton, { backgroundColor: colors.error }]}
                disabled={isUpdating}
              >
                Delete User
              </Button>
            </View>
          </View>
        </Surface>
      </FormWrapper>
      <ConfirmationDialog
        action={() => {
          if (SecureStore.getItem(USER_ROLE) === "waiter") removeCurrentUser();
          else
            removeWorker({
              userId: data?.id ?? "",
              restaurantId: restaurantId,
            });
          router.push("/auth/(tabs)/signin");
        }}
        text={`Are you sure you want to delete ${data?.username} ? This action cannot be undone.`}
        close={() => {
          setIsOpenDialog(false);
        }}
        isOpen={isOpenDialog}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    height: "auto",
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
    elevation: 4,
  },
  header: {
    position: "relative",
    alignItems: "center",
    marginBottom: 24,
  },
  photoButton: {
    position: "absolute",
    bottom: -20,
    right: "31%",
    borderWidth: 2,
  },
  form: {
    gap: 12,
  },
  submitButton: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
  },
});

export default EditWorker;
