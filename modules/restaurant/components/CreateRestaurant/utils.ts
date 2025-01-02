import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required('Restaurant name is required'),
  address: Yup.string().required('Address is required'),
});

export const initialValues = {
  restaurantName: '',
  address: '',
};
