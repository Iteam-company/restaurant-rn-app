import * as Yup from 'yup';

export type AuthMethod = 'email' | 'phone';

export const getValidationSchema = (authMethod: 'email' | 'phone') => {
  return Yup.object().shape({
    identifier:
      authMethod === 'email'
        ? Yup.string()
            .email('Invalid email address')
            .required('Email is required')
        : Yup.string()
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits')
            .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
};

export const initialValues = {
  identifier: '',
  password: '',
};
