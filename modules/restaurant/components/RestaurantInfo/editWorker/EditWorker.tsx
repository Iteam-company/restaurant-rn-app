import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextInput,
  Button,
  Title,
  Surface,
  Avatar,
  Text,
  ActivityIndicator,
} from "react-native-paper";
import FormWrapper from "@/modules/common/components/FormWrapper";
import { useGetUserByIdQuery } from "@/modules/common/redux/slices/user-api";
import { RTKMutationPayloadType } from "@/modules/common/redux/types";

interface WorkerFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
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
  role: "",
};

const EditWorker = () => {
  const router = useRouter();
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const { data, isLoading: isLoadingUser } = useGetUserByIdQuery(workerId);
  //   const [updateUser, { isLoading: isUpdating, error }] =
  //     useUpdateUserMutation<RTKMutationPayloadType>();

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
        // await updateUser({ id: workerId, ...formData }).unwrap();
        router.back();
      } catch (e) {
        console.error("Failed to update worker:", e);
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
        role: data.role || "",
      });
    }
  }, [data, setValues]);

  if (isLoadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <FormWrapper>
      <Surface style={styles.surface}>
        <View style={styles.header}>
          <Title>Edit Worker Profile</Title>
          {data?.icon ? (
            <Avatar.Image size={80} source={{ uri: data.icon }} />
          ) : (
            <Avatar.Text
              size={80}
              label={`${values.firstName.charAt(0)}${values.lastName.charAt(
                0
              )}`}
            />
          )}
        </View>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="First Name"
            value={values.firstName}
            onChangeText={(text) => setFieldValue("firstName", text)}
            onBlur={handleBlur("firstName")}
            error={touched.firstName && !!errors.firstName}
            left={<TextInput.Icon icon="account" />}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}

          <TextInput
            mode="outlined"
            label="Last Name"
            value={values.lastName}
            onChangeText={(text) => setFieldValue("lastName", text)}
            onBlur={handleBlur("lastName")}
            error={touched.lastName && !!errors.lastName}
            left={<TextInput.Icon icon="account" />}
          />
          {touched.lastName && errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}

          <TextInput
            mode="outlined"
            label="Username"
            value={values.username}
            onChangeText={(text) => setFieldValue("username", text)}
            onBlur={handleBlur("username")}
            error={touched.username && !!errors.username}
            left={<TextInput.Icon icon="account-circle" />}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

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
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

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
          {touched.phoneNumber && errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}

          <TextInput
            mode="outlined"
            label="Role"
            value={values.role}
            onChangeText={(text) => setFieldValue("role", text)}
            onBlur={handleBlur("role")}
            error={touched.role && !!errors.role}
            left={<TextInput.Icon icon="badge-account" />}
          />
          {touched.role && errors.role && (
            <Text style={styles.errorText}>{errors.role}</Text>
          )}

          {/* {error && (
            <Text style={styles.errorText}>
              Failed to update worker profile. Please try again.
            </Text>
          )} */}

          <Button
            mode="contained"
            onPress={() => handleSubmit()}
            style={styles.submitButton}
            // disabled={isUpdating}
          >
            {/* {isUpdating ? (
              <ActivityIndicator animating={true} color={"#ffffff"} />
            ) : ( */}
            "Save Changes"
            {/* )} */}
          </Button>
        </View>
      </Surface>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    height:"95%",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  form: {
    gap: 12
  },
  submitButton: {
    marginTop: 16,
  },
  errorText: {
    color: "#f06060",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 4,
  },
});

export default EditWorker;
