import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Button, Headline, TextInput } from 'react-native-paper';
import FormWrapper from '@/modules/common/components/FormWrapper';
import { useCreateRestaurantMutation } from '../../redux/slices/restaurant-api';
import { initialValues, validationSchema } from './utils';
import { useFileSelect } from '@/modules/common/hooks/useFileSelect';
import { useValidateTokenQuery } from '@/modules/auth/redux/slices/auth-api';
import Wrapper from '@/modules/common/components/Wrapper';

export default function CreateRestaurant() {
  const router = useRouter();
  const { data: currentUser } = useValidateTokenQuery(null);

  const [createRestaurant, { isLoading, isError, error, isSuccess, data }] =
    useCreateRestaurantMutation();

  console.log(currentUser, 'currentUser');

  const { handleFileSelect } = useFileSelect(() => {}, {});

  useEffect(() => {
    if (isSuccess) {
      console.log('Restaurant created successfully:', data);
    }
    if (isError) {
      console.error('Error creating restaurant:', error);
    }
  }, [isSuccess, isError, data, error]);

  const { values, errors, touched, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        if (currentUser) {
          createRestaurant({ ...values, ownerId: currentUser?.id });
        }
      },
    });

  return (
    <FormWrapper>
      <Headline>Logo</Headline>
      <TextInput
        mode="outlined"
        label="Restaurant Name"
        value={values.restaurantName}
        onChangeText={(text) => setFieldValue('restaurantName', text)}
        onBlur={handleBlur('restaurantName')}
        error={touched.restaurantName && !!errors.restaurantName}
        left={<TextInput.Icon icon="store" />}
      />
      <TextInput
        mode="outlined"
        label="Address"
        value={values.address}
        onChangeText={(text) => setFieldValue('address', text)}
        onBlur={handleBlur('address')}
        error={touched.address && !!errors.address}
        left={<TextInput.Icon icon="map-marker" />}
      />
      <Button mode="contained-tonal" onPress={() => handleSubmit()}>
        Submit
      </Button>
      <Button mode="elevated" onPress={() => router.back()}>
        Back
      </Button>
    </FormWrapper>
  );
}

const styles = StyleSheet.create({});
