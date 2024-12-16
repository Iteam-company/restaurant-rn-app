import { UserType } from '@/modules/common/types/user.types';
import * as Yup from 'yup';

export const initialValues: Partial<UserType> = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Name is required'),
  lastName: Yup.string().required('Surname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
