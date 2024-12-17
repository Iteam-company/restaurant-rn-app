import React, { useEffect } from "react";
import { useFormik } from "formik";
import { StyleSheet } from "react-native";
import { initialValues, validationSchema } from "./utils";
import { Button, TextInput } from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { useSignupMutation } from "@/modules/common/redux/slices/auth-api";
import { Logo } from "@/modules/common/components/ui/Logo";

export default function SignUpForm() {
  const [signUp, { isLoading, isError, error, isSuccess, data }] =
    useSignupMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const res = await signUp({ ...values, role: "waiter" }).unwrap();
          console.log(res);
        } catch (e) {}
      },
    });
  return (
    <FormWrapper>
      <Logo size={150} style={{ margin: "auto" }} />
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
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
        right={<TextInput.Icon icon="eye" />}
      />

      <Button mode="contained" onPress={() => handleSubmit()}>
        Proceed
      </Button>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({});
