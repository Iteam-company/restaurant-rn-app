import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { USER_ROLE } from "@/modules/common/constants/api";

import { handleFile } from "@/modules/common/utils/handleFile";
import { useRemoveWorkerMutation } from "@/lib/redux/slices/restaurant-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as Yup from "yup";
import {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useRemoveCurrentUserMutation,
  useUpdateCurrentUserInfoMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPhotoMutation,
  useUploadCurrentUserPhotoMutation,
} from "@/lib/redux/slices/user-api";
import { UserROLES } from "@/lib/redux/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { useTheme } from "@react-navigation/native";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ErrorText from "@/components/error-text";
import UserRoleDropdown from "@/components/user-role-select";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/pages/User/UserAvatar";
import { CameraIcon } from "lucide-react-native";
import { Input } from "@/components/ui/input";

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

  const [isOpenDialog, setIsOpenDialog] = useState(false);

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
    useUpdateUserInfoMutation();

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
        const error = e as FetchBaseQueryError;
        toastErrorHandler(error, {
          text1: "Failed to update user",
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

  return (
    <>
      <ScrollView className="w-full py-4">
        <Card className="w-full">
          <Loader isLoading={isLoadingUser || isLoadingCurrentUser}>
            <CardHeader className="items-center">
              <View className="relative w-20">
                <UserAvatar
                  userId={workerId}
                  size={80}
                  source={data && { uri: data.icon }}
                />
                <View className="absolute right-0 bottom-0">
                  <CameraIcon
                    size={24}
                    color={colors.text}
                    fill={colors.background}
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
              </View>
            </CardHeader>
            <CardContent className="gap-4">
              <View>
                <Label>Username</Label>
                <Input
                  placeholder="Username"
                  value={values.username}
                  onChangeText={(text) => setFieldValue("username", text)}
                  onBlur={handleBlur("username")}
                  autoCapitalize="none"
                  keyboardType="default"
                  autoComplete="username-new"
                />
                <ErrorText error={errors.username} touched={touched.username} />
              </View>

              <View>
                <Label>First Name</Label>
                <Input
                  placeholder="First name"
                  value={values.firstName}
                  onChangeText={(text) => setFieldValue("firstName", text)}
                  onBlur={handleBlur("firstName")}
                  keyboardType="default"
                  autoComplete="name"
                />
                <ErrorText
                  error={errors.firstName}
                  touched={touched.firstName}
                />
              </View>

              <View>
                <Label>Last Name</Label>
                <Input
                  placeholder="Last name"
                  value={values.lastName}
                  onChangeText={(text) => setFieldValue("lastName", text)}
                  onBlur={handleBlur("lastName")}
                  keyboardType="default"
                  autoComplete="family-name"
                />
                <ErrorText error={errors.lastName} touched={touched.lastName} />
              </View>

              <View>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  value={values.email}
                  onChangeText={(text) => setFieldValue("email", text)}
                  onBlur={handleBlur("email")}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
                <ErrorText error={errors.email} touched={touched.email} />
              </View>

              <View>
                <Label>Phone Number</Label>
                <Input
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={(text) => setFieldValue("phoneNumber", text)}
                  onBlur={handleBlur("phoneNumber")}
                  keyboardType="number-pad"
                  autoComplete="tel-device"
                />
                <ErrorText
                  error={errors.phoneNumber}
                  touched={touched.phoneNumber}
                />
              </View>

              {!isWaiter && !isOwnEdit && (
                <View>
                  <Label>Role</Label>
                  <UserRoleDropdown
                    value={values.role || UserROLES.WAITER}
                    onSelect={() => setFieldValue("role", values.role)}
                  />
                  <ErrorText error={errors.role} touched={touched.role} />
                </View>
              )}

              <ErrorText error={error} />

              <Button onPress={() => handleSubmit()} disabled={isUpdating}>
                <Loader isLoading={isUpdating} />
                <Text>Save Changes</Text>
              </Button>

              <Button
                variant="destructive"
                disabled={isUpdating}
                onPress={() => setIsOpenDialog(true)}
              >
                <Text>Delete User</Text>
              </Button>
            </CardContent>
          </Loader>
        </Card>
      </ScrollView>
      <ConfirmationDialog
        action={() => {
          if (isWaiter) removeCurrentUser();
          else
            removeWorker({
              userId: data?.id ?? "",
              restaurantId: restaurantId,
            });
          router.push("/auth/signin");
        }}
        text={`Are you sure you want to delete ${data?.username} ? This action cannot be undone.`}
        open={isOpenDialog}
        onOpenChange={() => setIsOpenDialog(false)}
      />
    </>
  );
};

export default EditWorker;
