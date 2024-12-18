import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { initialValues, validationSchema } from './utils';
import { Button, TextInput, Text } from 'react-native-paper';
import FormWrapper from '@/modules/common/components/FormWrapper';
import { useSignupMutation } from '@/modules/common/redux/slices/auth-api';
import { Logo } from '@/modules/common/components/ui/Logo';
import { AUTH_TOKEN_KEY } from '@/modules/common/constants/api';
import { useRouter } from 'expo-router';
import { UserROLES } from '@/modules/common/types/user.types';
import { RTKMutationPayloadType } from '@/modules/common/redux/types';

export default function SignUpForm() {
  const router = useRouter();

  const [signUp, { isLoading, error }] =
    useSignupMutation<RTKMutationPayloadType>();

  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const res = await signUp({
            ...values,
            role: UserROLES.OWNER,
          }).unwrap();
          if (res.access_token) {
            SecureStore.setItem(AUTH_TOKEN_KEY, res.access_token);
          }
          router.push('/dashboard/restaurants');
        } catch (e) {}
      },
    });
  return (
    <FormWrapper>
      <Logo size={150} style={{ margin: 'auto' }} />
      <TextInput
        mode="outlined"
        label="Username"
        value={values.username}
        onChangeText={(text) => setFieldValue('username', text)}
        onBlur={handleBlur('username')}
        error={touched.username && !!errors.username}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="First Name"
        value={values.firstName}
        onChangeText={(text) => setFieldValue('firstName', text)}
        onBlur={handleBlur('firstName')}
        error={touched.firstName && !!errors.firstName}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Last Name"
        value={values.lastName}
        onChangeText={(text) => setFieldValue('lastName', text)}
        onBlur={handleBlur('lastname')}
        error={touched.lastName && !!errors.lastName}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        mode="outlined"
        label="Phone Number"
        value={values.phoneNumber}
        onChangeText={(text) => setFieldValue('phoneNumber', text)}
        onBlur={handleBlur('phoneNumber')}
        error={touched.phoneNumber && !!errors.phoneNumber}
        keyboardType="phone-pad"
        left={<TextInput.Icon icon="phone" />}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={values.email}
        onChangeText={(text) => setFieldValue('email', text)}
        onBlur={handleBlur('email')}
        error={touched.email && !!errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        left={<TextInput.Icon icon="email" />}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={values.password}
        onChangeText={(text) => setFieldValue('password', text)}
        onBlur={handleBlur('password')}
        error={touched.password && !!errors.password}
        secureTextEntry={!showPassword}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={!showPassword ? 'eye-off' : 'eye'}
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
        style={styles.button}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={'#7c8ebf'} />
        ) : (
          'Sign Up'
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
    color: '#f06060',
  },
});
