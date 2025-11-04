import { useState } from "react";
import { StyleSheet } from "react-native";
import { useFormik } from "formik";
import {
  SegmentedButtons,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import { Logo } from "@/modules/common/components/ui/Logo";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { AuthMethod, getValidationSchema, initialValues } from "./utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { RTKMutationPayloadType } from "@/modules/common/types";
import { useSigninMutation } from "../../redux/slices/auth-api";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import Toast from "react-native-toast-message";

export default function SignInForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [authValues, setAuthValues] = useState<Record<AuthMethod, string>>({
    email: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setRefreshToken } = useAuthToken();

  const [signIn, { isLoading, error }] =
    useSigninMutation<RTKMutationPayloadType>();

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
          setToken(userToken.access_token);
          if (userToken.refresh_token) {
            await setRefreshToken(userToken.refresh_token);
          }
        }
      } catch (e) {
        const error = e as FetchBaseQueryError;
        if (error.status === 401) {
          console.log("unauthorized");
          Toast.show({
            type: "error",
            text1: "Error",
            text2: `${
              authMethod === "email" ? "Email" : "Phone Number"
            } or Password is wrong!`,
          });
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
          const authValue: AuthMethod = value;

          setAuthMethod(authValue);
          setAuthValues((prev) => ({
            ...prev,
            [authValue === "email" ? "phoneNumber" : "email"]:
              values.identifier,
          }));

          setFieldValue("identifier", authValues[authValue]);
          setFieldTouched("identifier", false);
        }}
        buttons={[
          { value: "email", label: "Email" },
          { value: "phoneNumber", label: "Phone" },
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
            icon={!showPassword ? "eye-off" : "eye"}
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
