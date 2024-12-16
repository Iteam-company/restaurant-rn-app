import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AuthMethod, getValidationSchema } from './utils';
import FormWrapper from '@/modules/common/components/FormWrapper';
import { useFormik } from 'formik';
import { SegmentedButtons, TextInput, Button } from 'react-native-paper';
import { initialValues } from '../SignInForm/utils';
import { Logo } from '@/modules/common/components/ui/Logo';

export default function SiginInForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [showPassword, setShowPassword] = useState(false);

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
    onSubmit: (values) => {
      console.log('Form submitted:', { ...values, authMethod });
    },
  });

  return (
    <FormWrapper>
      <Logo size={150} style={{ margin: 'auto' }} />

      <SegmentedButtons
        value={authMethod}
        onValueChange={(value) => {
          setAuthMethod(value as AuthMethod);
          setFieldValue('identifier', '');
          setFieldTouched('identifier', false);
        }}
        buttons={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
        ]}
        style={styles.segmentedButtons}
      />

      <TextInput
        mode="outlined"
        label={authMethod === 'email' ? 'Email' : 'Phone Number'}
        value={values.identifier}
        onChangeText={(text) => setFieldValue('identifier', text)}
        onBlur={handleBlur('identifier')}
        error={touched.identifier && !!errors.identifier}
        keyboardType={authMethod === 'email' ? 'email-address' : 'phone-pad'}
        autoCapitalize={authMethod === 'email' ? 'none' : 'sentences'}
        left={
          <TextInput.Icon icon={authMethod === 'email' ? 'email' : 'phone'} />
        }
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
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Button
        mode="elevated"
        onPress={() => handleSubmit()}
        style={styles.button}>
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
});
