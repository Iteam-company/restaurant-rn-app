import React, { useState } from "react";
import { useFormik } from "formik";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Button, TextInput, Text, Title } from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { Logo } from "@/modules/common/components/ui/Logo";
import { AUTH_TOKEN_KEY } from "@/modules/common/constants/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { UserROLES } from "@/modules/common/types/user.types";
import { RTKMutationPayloadType } from "@/modules/common/redux/types";
import {
  initialValues,
  validationSchema,
} from "@/modules/common/utils/createUserSchema";
import {
  useGetUserIdByTokenMutation,
  useSignupMutation,
} from "@/modules/auth/redux/slices/auth-api";
import { useAddWorkerMutation } from "@/modules/restaurant/redux/slices/restaurant-api";

export default function AddWorker() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [signUp, { isLoading, error }] =
    useSignupMutation<RTKMutationPayloadType>();

  const [getUserInfo] = useGetUserIdByTokenMutation();
  const [addWorkerToRestaurant] = useAddWorkerMutation();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const res = await signUp({
            ...values,
            role: UserROLES.WAITER,
          }).unwrap();
          if (res.access_token) {
            const userInfo = await getUserInfo(res.access_token).unwrap();
            console.log(userInfo);
            await addWorkerToRestaurant({
              userId: userInfo.id,
              restaurantId: parseInt(id),
            });
            router.push({
              pathname: "/restaurant/[id]/(workers)",
              params: {
                id,
              },
            });
          }
        } catch {}
      },
    });
  return (
    <FormWrapper>
      <Title>Create and add new User</Title>
      <TextInput
        mode="outlined"
        label="Username"
        value={values.username}
        onChangeText={(text) => setFieldValue("username", text)}
        onBlur={handleBlur("username")}
        error={touched.username && !!errors.username}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="First Name"
        value={values.firstName}
        onChangeText={(text) => setFieldValue("firstName", text)}
        onBlur={handleBlur("firstName")}
        error={touched.firstName && !!errors.firstName}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Last Name"
        value={values.lastName}
        onChangeText={(text) => setFieldValue("lastName", text)}
        onBlur={handleBlur("lastname")}
        error={touched.lastName && !!errors.lastName}
        left={<TextInput.Icon icon="account" />}
      />
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
      <TextInput
        mode="outlined"
        label="Password"
        value={values.password}
        onChangeText={(text) => setFieldValue("password", text)}
        onBlur={handleBlur("password")}
        error={touched.password && !!errors.password}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={!showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Text style={styles.errorText}>
        {error?.status === 401 && `Failed to sign up, please try later`}
      </Text>

      <Button
        mode="elevated"
        onPress={() => {
          handleSubmit();
        }}
        style={styles.button}
      >
        {isLoading ? (
          <ActivityIndicator animating={true} color={"#7c8ebf"} />
        ) : (
          "Create User"
        )}
      </Button>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
  },
});
