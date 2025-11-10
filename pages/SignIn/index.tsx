import { useAuthToken } from "@/modules/common/hooks/useAuthToken";
import { useFormik } from "formik";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSigninMutation } from "../../lib/redux/slices/auth-api";
import { validationSchema, initialValues, phoneRegex } from "./utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorText from "@/components/error-text";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, setRefreshToken } = useAuthToken();

  const [signIn, { isLoading, error }] = useSigninMutation();

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      validateOnChange: true,
      onSubmit: async (values) => {
        const authMethod = phoneRegex.test(values.identifier)
          ? "phoneNumber"
          : "email";
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
        } catch {}
      },
    });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle variant="h3">Sign in</CardTitle>
        <Text className="text-muted-foreground">
          Welcome back! Please sign in to continue
        </Text>
      </CardHeader>
      <CardContent className="gap-4">
        <View>
          <Label>Email or Phone number</Label>
          <Input
            value={values.identifier}
            onChangeText={(text) => setFieldValue("identifier", text)}
            onBlur={handleBlur("identifier")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <ErrorText error={errors.identifier} touched={touched.identifier} />
        </View>

        <View className="relative">
          <Label>Password</Label>
          <View>
            <Input
              value={values.password}
              onChangeText={(text) => setFieldValue("password", text)}
              onBlur={handleBlur("password")}
              secureTextEntry={!showPassword}
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
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color={"#7c8ebf"} />
          ) : (
            <Text>Continue</Text>
          )}
        </Button>

        <Text className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            className="p-0"
            onPress={() => router.push("/auth/signup")}
          >
            <Text className="top-2.5 text-sm underline underline-offset-4">
              Sign up
            </Text>
          </Button>
        </Text>
      </CardContent>
    </Card>
  );
}
