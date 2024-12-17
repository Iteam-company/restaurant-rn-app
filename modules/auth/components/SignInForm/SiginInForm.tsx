import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import {
  Headline,
  SegmentedButtons,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { Logo } from "@/modules/common/components/ui/Logo";
import { useSigninMutation } from "@/modules/common/redux/slices/auth-api";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { AuthMethod, getValidationSchema } from "./utils";
import { initialValues } from "../SignInForm/utils";
import { AUTH_TOKEN_KEY } from "@/modules/common/constants/api";

export default function SiginInForm() {
  const router = useRouter();

  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { isLoading, isError, error, isSuccess, data }] =
    useSigninMutation();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleBlur,
    setFieldTouched,
  } = useFormik({
    initialValues,
    validationSchema: getValidationSchema(authMethod),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const userToken = await signIn({
          [authMethod]: values.identifier,
          password: values.password,
        }).unwrap();
        if (userToken.access_token) {
          SecureStore.setItem(AUTH_TOKEN_KEY, userToken.access_token);
        }
        router.push("/dashboard");
      } catch (e) {
        if (e.status === 401) {
          console.log("unautorized");
        }
      }
    },
  });
  return (
    <FormWrapper>
      <Logo size={150} style={{ margin: "auto" }} />

      <SegmentedButtons
        value={authMethod}
        onValueChange={(value) => {
          setAuthMethod(value as AuthMethod);
          setFieldValue("identifier", "");
          setFieldTouched("identifier", false);
        }}
        buttons={[
          { value: "email", label: "Email" },
          { value: "phone", label: "Phone" },
        ]}
        style={styles.segmentedButtons}
      />

      <TextInput
        mode="outlined"
        label={authMethod === "email" ? "Email" : "Phone Number"}
        value={values.identifier}
        onChangeText={(text) => setFieldValue("identifier", text)}
        onBlur={handleBlur("identifier")}
        error={touched.identifier && !!errors.identifier}
        keyboardType={authMethod === "email" ? "email-address" : "phone-pad"}
        autoCapitalize={authMethod === "email" ? "none" : "sentences"}
        left={
          <TextInput.Icon icon={authMethod === "email" ? "email" : "phone"} />
        }
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
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Text style={styles.errorText}>
        {error?.status === 401 &&
          `Password or ${
            authMethod === "email" ? "email" : "phone number"
          } is incorrect`}
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
          "Sign In"
        )}
      </Button>
      <Button mode="elevated" onPress={() => {}}>
        Sign In
      </Button>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({
  segmentedButtons: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
  },
});
