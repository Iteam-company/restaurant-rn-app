import { useState } from "react";
import { useFormik } from "formik";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSignupMutation } from "../../lib/redux/slices/auth-api";
import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/error-text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { UserROLES } from "@/lib/redux/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  createUserInitialValues,
  createUserValidationSchema,
} from "../Forms/utils";

export default function SignUp() {
  const [signUp, { isLoading, error }] = useSignupMutation();

  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setRefreshToken } = useAuthToken();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: createUserInitialValues,
      validationSchema: createUserValidationSchema,
      onSubmit: async (values) => {
        try {
          const res = await signUp({
            ...values,
            role: UserROLES.OWNER,
          }).unwrap();
          if (res.access_token) {
            setToken(res.access_token);
            if (res.refresh_token) {
              await setRefreshToken(res.refresh_token);
            }
          }
        } catch (e) {
          const error = e as FetchBaseQueryError;
          toastErrorHandler(error);
        }
      },
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle variant="h3">Sign up</CardTitle>
        <Text className="text-muted-foreground">
          Welcome! Please fill in the details to get started.
        </Text>
      </CardHeader>
      <CardContent className="gap-4">
        <View>
          <Label>Username</Label>
          <Input
            value={values.username}
            onChangeText={(text) => setFieldValue("username", text)}
            onBlur={handleBlur("username")}
            autoCapitalize="none"
            keyboardType="default"
          />
          <ErrorText error={errors.username} touched={touched.username} />
        </View>
        <View>
          <Label>First Name</Label>
          <Input
            value={values.firstName}
            onChangeText={(text) => setFieldValue("firstName", text)}
            onBlur={handleBlur("firstName")}
            autoComplete="name"
          />
          <ErrorText error={errors.firstName} touched={touched.firstName} />
        </View>
        <View>
          <Label>Last Name</Label>
          <Input
            value={values.lastName}
            onChangeText={(text) => setFieldValue("lastName", text)}
            onBlur={handleBlur("lastName")}
            autoComplete="family-name"
          />
          <ErrorText error={errors.lastName} touched={touched.lastName} />
        </View>
        <View>
          <Label>Phone Number</Label>
          <Input
            value={values.phoneNumber}
            onChangeText={(text) => setFieldValue("phoneNumber", text)}
            onBlur={handleBlur("phoneNumber")}
            autoComplete="tel-device"
          />
          <ErrorText error={errors.phoneNumber} touched={touched.phoneNumber} />
        </View>
        <View>
          <Label>Email</Label>
          <Input
            value={values.email}
            onChangeText={(text) => setFieldValue("email", text)}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <ErrorText error={errors.email} touched={touched.email} />
        </View>
        <View className="relative">
          <Label>Password</Label>
          <View>
            <Input
              value={values.password}
              onChangeText={(text) => setFieldValue("password", text)}
              onBlur={handleBlur("password")}
              secureTextEntry={!showPassword}
              autoComplete="password-new"
              keyboardType="visible-password"
              autoCapitalize="none"
            />
            <Button
              variant="link"
              className="absolute right-1"
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          </View>
          <ErrorText error={errors.password} touched={touched.password} />
        </View>

        <ErrorText error={error} />

        <Button
          onPress={() => {
            handleSubmit();
          }}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            <Text>Continue</Text>
          )}
        </Button>

        <Text className="text-center text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="p-0"
            onPress={() => router.push("/auth/signin")}
          >
            <Text className="top-2.5 text-sm underline underline-offset-4">
              Sign in
            </Text>
          </Button>
        </Text>
      </CardContent>
    </Card>
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
