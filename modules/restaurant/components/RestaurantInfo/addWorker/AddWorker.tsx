import { useSignupMutation } from "@/lib/redux/slices/auth-api";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { capitalizeFirstLetter } from "@/modules/common/utils";
import {
  initialValues,
  validationSchema,
} from "@/modules/common/utils/createUserSchema";
import { useAddWorkerMutation } from "@/lib/redux/slices/restaurant-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Surface, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserROLES, UserRolesArray } from "@/lib/redux/types";
import ErrorText from "@/components/error-text";

export default function AddWorker() {
  const router = useRouter();
  const { restaurantId: id } = useLocalSearchParams<{ restaurantId: string }>();

  const [signUp, { isLoading, error }] = useSignupMutation();
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
          }).unwrap();
          if (res.id) {
            await addWorkerToRestaurant({
              userId: res.id,
              restaurantId: parseInt(id),
            }).unwrap();
            router.push({
              pathname: "/admin-dashboard/[id]/(workers)",
              params: {
                id,
              },
            });
          }
        } catch (e: any) {
          console.error("Failed to create user:", e);
          toastErrorHandler(error as FetchBaseQueryError, {
            text1: "Failed to create user",
            text2: `${e.data.message}\n\nPlease try again later`,
          });
        }
      },
    });

  return (
    <ScrollView>
      <FormWrapper>
        <Surface style={styles.surface}>
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
          <Dropdown
            mode="outlined"
            label="Role"
            value={values.role}
            options={UserRolesArray.filter(
              (role) => role !== UserROLES.OWNER
            ).map((role) => ({
              label: capitalizeFirstLetter(role),
              value: role as UserROLES,
            }))}
            onSelect={(value) => setFieldValue("role", value as UserROLES)}
            CustomMenuHeader={() => <></>}
            error={touched.role && !!errors.role}
          />

          <ErrorText error={error} />
        </Surface>

        <Button
          mode="elevated"
          onPress={() => {
            handleSubmit();
          }}
          style={styles.button}
          loading={isLoading}
        >
          Create User
        </Button>
      </FormWrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  surface: {
    borderRadius: 16,
    padding: 24,
    gap: 8,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
  },
});
