import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Restaurant name is required"),
  address: Yup.string().required("Restaurant address is required"),
});
