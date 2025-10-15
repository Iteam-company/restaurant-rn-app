import { useSignupMutation } from "@/modules/auth/redux/slices/auth-api";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { UserROLES, UserRolesArray } from "@/modules/common/types/user.types";
import { capitalizeFirstLetter } from "@/modules/common/utils";
import {
  initialValues,
  validationSchema,
} from "@/modules/common/utils/createUserSchema";
import { useAddWorkerMutation } from "@/modules/restaurant/redux/slices/restaurant-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";

export default function AddWorker() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const [signUp, { isLoading, error }] =
    useSignupMutation<RTKMutationPayloadType>();
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
            });
            router.push({
              pathname: "/restaurant/[id]/(workers)",
              params: {
                id,
              },
            });
          }
        } catch (e: any) {
          console.error("Failed to create user:", e);
          Alert.alert(
            "Failed to create user",
            `${e.data.message}\n\nPlease try again later`
          );
        }
      },
    });

  return (
    <>
      <Appbar.Header
        statusBarHeight={0}
        style={{ backgroundColor: colors.background }}
      >
        <Appbar.BackAction iconColor="white" onPress={() => router.back()} />
        <Appbar.Content
          title="Create and add new User"
          titleStyle={{ color: "white" }}
        />
      </Appbar.Header>
      <ScrollView>
        <FormWrapper>
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
            options={UserRolesArray.map((role) => ({
              label: capitalizeFirstLetter(role),
              value: role as UserROLES,
            }))}
            onSelect={(value) => setFieldValue("role", value as UserROLES)}
            error={touched.role && !!errors.role}
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
            loading={isLoading}
          >
            Create User
          </Button>
        </FormWrapper>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
  },
});
