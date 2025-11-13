import { useSignupMutation } from "@/lib/redux/slices/auth-api";
import { toastErrorHandler } from "@/modules/common/components/Toast/toastErrorHandler";
import { useAddWorkerMutation } from "@/lib/redux/slices/restaurant-api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserROLES } from "@/lib/redux/types";
import ErrorText from "@/components/error-text";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react-native";
import UserRoleSelect from "@/components/user-role-select";
import { Text } from "@/components/ui/text";
import { createUserInitialValues, createUserValidationSchema } from "../utils";

export default function CreateUser() {
  const router = useRouter();
  const { restaurantId: id } = useLocalSearchParams<{ restaurantId: string }>();

  const [signUp, { isLoading, error }] = useSignupMutation();
  const [addWorkerToRestaurant] = useAddWorkerMutation();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: createUserInitialValues,
      validationSchema: createUserValidationSchema,
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
    <Card className="w-full">
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
          <ErrorText error={errors.firstName} touched={touched.firstName} />
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
          <Label>Phone Number</Label>
          <Input
            placeholder="Phone Number"
            value={values.phoneNumber}
            onChangeText={(text) => setFieldValue("phoneNumber", text)}
            onBlur={handleBlur("phoneNumber")}
            keyboardType="number-pad"
            autoComplete="tel-device"
          />
          <ErrorText error={errors.phoneNumber} touched={touched.phoneNumber} />
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
        <View className="relative">
          <Label>Password</Label>
          <View>
            <Input
              placeholder="Password"
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
        <View>
          <Label>Role</Label>
          <UserRoleSelect
            value={values.role!}
            onSelect={(value) => setFieldValue("role", value as UserROLES)}
          />
          <ErrorText error={errors.role} touched={touched.role} />
        </View>
        <ErrorText error={error} />
        <Button
          onPress={() => {
            handleSubmit();
          }}
          disabled={isLoading}
        >
          <Text>Create User</Text>
        </Button>
      </CardContent>
    </Card>
  );
}
