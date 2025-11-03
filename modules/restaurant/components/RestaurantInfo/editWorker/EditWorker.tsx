import { ConfirmationDialog } from "@/modules/common/components/ConfirmationDialog";
import FormWrapper from "@/modules/common/components/FormWrapper";
import TabBarOffset from "@/modules/common/components/TabBarOffset";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { USER_ROLE } from "@/modules/common/constants/api";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useRemoveCurrentUserMutation,
  useUpdateCurrentUserInfoMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
  useUploadCurrentUserPhotoMutation,
} from "@/modules/common/redux/slices/user-api";
import {
  ErrorResponseType,
  RTKMutationPayloadType,
} from "@/modules/common/types";
import { UserROLES, UserRolesArray } from "@/modules/common/types/user.types";
import { capitalizeFirstLetter } from "@/modules/common/utils";
import { handleFile } from "@/modules/common/utils/handleFile";
import { useRemoveWorkerMutation } from "@/modules/restaurant/redux/slices/restaurant-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Icon,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import * as Yup from "yup";

interface WorkerFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role?: UserROLES;
}

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
  const [userRole, setUserRole] = useState<UserROLES | null>(null);
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

  useEffect(() => {
    (async () => {
      const role = await SecureStore.getItem(USER_ROLE);
      if (!role) return;
      setUserRole(role as UserROLES);
    })();
  }, []);

  const isWaiter = userRole === UserROLES.WAITER;

  const { data: currentUserData, isLoading: isLoadingCurrentUser } =
    useGetCurrentUserQuery();
  const { data: userByIdData, isLoading: isLoadingUserById } =
    useGetUserByIdQuery(workerId, {
      skip: !workerId,
    });

  const [removeWorker] = useRemoveWorkerMutation();
  const [removeCurrentUser] = useRemoveCurrentUserMutation();

  const [updateCurrentUserPhoto] = useUploadCurrentUserPhotoMutation();
  const [updateUserPhoto] = useUpdateUserPhotoMutation();

  const [
    updateCurrentUserInfo,
    { isLoading: isUpdatingCurrentUser, error: currentUserError },
  ] = useUpdateCurrentUserInfoMutation();
  const [updateUserInfo, { isLoading: isUpdatingUser, error: userError }] =
    useUpdateUserInfoMutation<RTKMutationPayloadType>();

  const data = isWaiter ? currentUserData : userByIdData;
  const isLoadingUser = isWaiter ? isLoadingCurrentUser : isLoadingUserById;
  const updatePhoto = isWaiter ? updateCurrentUserPhoto : updateUserPhoto;
  const updateUser = isWaiter ? updateCurrentUserInfo : updateUserInfo;
  const isUpdating = isWaiter ? isUpdatingCurrentUser : isUpdatingUser;
  const error = isWaiter ? currentUserError : userError;
  const isOwnEdit = currentUserData?.id === parseInt(userId);

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
        const error = e as ErrorResponseType;
        toastErrorHandler(error, {
          text1: "Failed to update user",
          text2: `${error.data?.message}\n\nPlease try again later`,
        });
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

  if (isLoadingUser || isLoadingCurrentUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={[{ width: "100%", paddingHorizontal: 8 }]}>
        <FormWrapper>
          <Surface style={styles.surface}>
            <View style={styles.header}>
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
                style={[
                  styles.photoButton,
                  { backgroundColor: colors.surface },
                ]}
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

            {isOwnEdit && (
              <View
                style={[
                  styles.roleContainer,
                  { backgroundColor: colors.secondaryContainer },
                ]}
              >
                <Icon
                  source="badge-account-horizontal"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.role}>
                  {capitalizeFirstLetter(currentUserData?.role || "Unknown")}
                </Text>
              </View>
            )}

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
              {!isWaiter && !isOwnEdit && (
                <Dropdown
                  label="Role"
                  mode="outlined"
                  placeholder="Select Role"
                  value={values.role}
                  options={UserRolesArray.filter(
                    (role) => role !== UserROLES.OWNER
                  ).map((role) => ({
                    label: capitalizeFirstLetter(role),
                    value: role as UserROLES,
                  }))}
                  onSelect={(value) => setFieldValue("role", value)}
                  CustomMenuHeader={() => <></>}
                  error={touched.role && !!errors.role}
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
            </View>
          </Surface>
          <View>
            <Button
              mode="contained-tonal"
              onPress={() => handleSubmit()}
              style={styles.submitButton}
              disabled={isUpdating}
              loading={isUpdating}
            >
              <Text>Save Changes</Text>
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
          <TabBarOffset />
        </FormWrapper>
      </ScrollView>
      <ConfirmationDialog
        action={() => {
          if (isWaiter) removeCurrentUser();
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
    </>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    position: "absolute",
    left: 0,
    paddingVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    borderRadius: 16,
    padding: 24,
    gap: 8,
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
  roleContainer: {
    margin: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    gap: 8,
    maxWidth: "50%",
  },
  role: {
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },
});

export default EditWorker;
